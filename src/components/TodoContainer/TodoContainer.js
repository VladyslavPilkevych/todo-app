import React, { memo, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import List from '@mui/material/List';
import { useLiveQuery } from 'dexie-react-hooks';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import ModalEditTask from '../ModalEditTask/ModalEditTask';
import db from '../../db/db';
// import TodoTask from '../TodoTask/TodoTask';
import VerticalTabs from '../TabsTodos/TabsTodos';
import SelectTodoCategorie from '../SelectTodoCategorie/SelectTodoCategorie';
import { clearTodosValuesRedux } from '../../store/actionCreators/todosAC';

import styles from './TodoContainer.module.scss';

function TodoContainer() {
  const { todos, categories } = db;
  const dispatch = useDispatch();

  // const allTodos = useLiveQuery(() => todos.toArray(), []);
  const allCategories = useLiveQuery(() => categories.toArray(), []);
  const { todoValues } = useSelector((state) => state.todos);
  const [inputValue, setInputValue] = useState('');
  const [selectValueCategorie, setSelectValueCategorie] = useState('');
  // const {
  //   isOpen,
  //   taskInfo,
  //   taskInfo: { itemId, itemTask: content },
  // } = useSelector((state) => state.modal);
  useEffect(() => {
    if (todoValues.categorie && todoValues.categorie.length > 0) {
      setSelectValueCategorie(todoValues.categorie);
    }
  }, [todoValues]);

  const updateCounter = () => {
    allCategories?.forEach(async (elem, index) => {
      await categories.update(elem.id, { counter: index + 1 });
    });
  };
  updateCounter();
  // const newCateg = async () => {
  //   await categories.add({
  //     categorieName: 'Morning',
  //   });
  // };
  // console.log(allCategories);
  const typingNewTask = (event) => {
    setInputValue(event.target.value);
  };
  const createNewTaskFn = async (event) => {
    event.preventDefault();
    console.log(selectValueCategorie);
    await todos.add({
      task: inputValue,
      complete: false,
      categorie: selectValueCategorie,
    });
    setInputValue('');
    setSelectValueCategorie('');
    dispatch(clearTodosValuesRedux());
    // newCateg();
  };
  // const createNewSelectCategorie = async (e) => {
  //   const newArr = allCategories?.map((elem) => elem.categorieName);
  //   if (e.key === 'Enter' && !newArr.includes(selectValueCategorie)) {
  //     await categories.add({
  //       categorieName: selectValueCategorie,
  //       counter: allCategories[allCategories.length - 1].counter + 1,
  //     });
  //   }
  // };
  const handleKeypress = (e) => {
    if (e.code === 'Enter' && inputValue.length !== 0) {
      createNewTaskFn(e);
    }
  };
  return (
    <div className={styles.background}>
      <ModalEditTask />
      <p className={styles.todoTitle}>Todo</p>
      <div className={styles.textFieldAndBtnCreate}>
        <TextField
          autoFocus
          id="filled-basic"
          sx={{
            width: 6 / 10,
          }}
          label="New Task"
          variant="filled"
          value={inputValue}
          onChange={typingNewTask}
          onKeyPress={handleKeypress}
        />
        <SelectTodoCategorie />
        {/* {allCategories && (
          <Autocomplete
            options={allCategories}
            noOptionsText="Enter to create a new option"
            getOptionLabel={(option) => option.categorieName}
            sx={{
              width: 2 / 10,
              marginLeft: '20px',
            }}
            autoSelect
            inputValue={selectValueCategorie}
            // getOptionLabel={(option) => {
            //   console.log(option);
            //   console.log(option.title);
            //   console.log(option.name);
            // }}
            onInputChange={(e, newValue) => {
              setSelectValueCategorie(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select"
                variant="outlined"
                onKeyDown={(e) => createNewSelectCategorie(e)}
              />
            )}
          />
        )} */}
        {/* <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-filled-label">
            Categorie
          </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={categorie}
            onChange={changeCategorie}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {allCategories &&
              allCategories.length > 0 &&
              allCategories?.map((elem) => (
                <MenuItem key={elem.categorieName} value={elem.categorieName}>
                  {elem.categorieName}
                </MenuItem>
              ))}

          </Select>
        </FormControl> */}
        <div className={styles.btnCreateNewTask}>
          {inputValue.length ? (
            <Button variant="contained" onClick={createNewTaskFn}>
              Create new task
            </Button>
          ) : (
            <Button variant="contained" disabled>
              Create new task
            </Button>
          )}
        </div>
      </div>
      {/* {allTodos && allTodos.length === 0 && (
        <p className={styles.noTasks}>Any Tasks Yet</p>
      )} */}
      {/* <div className={styles.TabsAndList}> */}
      <VerticalTabs />
      {/* <List sx={{ width: '70%' }}>
        {allTodos &&
          allTodos?.map((value) => {
            const labelId = `checkbox-list-label-${value.id}`;
            return <TodoTask key={value.id} value={value} labelId={labelId} />;
          })}
      </List> */}
      {/* </div> */}
    </div>
  );
}

export default memo(TodoContainer);
