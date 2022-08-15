import React, { memo, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import List from '@mui/material/List';
import { useLiveQuery } from 'dexie-react-hooks';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import ModalEditTask from '../ModalEditTask/ModalEditTask';
import db from '../../db/db';
// import TodoTask from '../TodoTask/TodoTask';
import VerticalTabs from '../TabsTodos/TabsTodos';

import styles from './TodoContainer.module.scss';

function TodoContainer() {
  const { todos, categories } = db;
  // const allTodos = useLiveQuery(() => todos.toArray(), []);
  const allCategories = useLiveQuery(() => categories.toArray(), []);
  const [newOptionValue, setNewOptionValue] = React.useState('');
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
  const [inputValue, setInputValue] = useState('');
  const typingNewTask = (event) => {
    setInputValue(event.target.value);
  };
  const [categorie, setCategorie] = React.useState('');
  const changeCategorie = (event, newValue) => {
    // setCategorie(event.target.value);
    setCategorie(newValue);
    setNewOptionValue(newValue);
  };
  // const createNewCategorie = () => {

  // }
  const createNewTaskFn = async (event) => {
    event.preventDefault();
    await todos.add({
      task: inputValue,
      complete: false,
      categorie,
    });
    setInputValue('');
    const optionArr = allCategories?.map((item) => item.categorieName);
    if (!optionArr.includes(newOptionValue)) {
      await categories.add({
        categorieName: newOptionValue,
      });
    }
    // newCateg();
  };
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
            width: 7 / 10,
          }}
          label="New Task"
          variant="filled"
          value={inputValue}
          onChange={typingNewTask}
          onKeyPress={handleKeypress}
        />
        <Autocomplete
          options={allCategories}
          noOptionsText="Create New Option"
          getOptionLabel={(option) => option.title}
          onInputChange={(e, newValue) => {
            changeCategorie(e, newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Select" variant="outlined" />
          )}
        />
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
            <MenuItem value="morning">Morning</MenuItem>
            <MenuItem value="home">Home</MenuItem>
            <MenuItem value="garden">Garden</MenuItem>
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
