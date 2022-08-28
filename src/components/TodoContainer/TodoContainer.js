import React, { memo, useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useDispatch, useSelector } from 'react-redux';
import { useLiveQuery } from 'dexie-react-hooks';
import ModalEditTask from '../ModalEditTask/ModalEditTask';
import VerticalTabs from '../TabsTodos/TabsTodos';
import SelectTodoCategorie from '../SelectTodoCategorie/SelectTodoCategorie';
import { clearTodosValuesRedux } from '../../store/actionCreators/todosAC';
import db from '../../db/db';
import styles from './TodoContainer.module.scss';

function TodoContainer() {
  const { todos, categories } = db;
  const dispatch = useDispatch();
  const allCategories = useLiveQuery(() => categories.toArray(), []);
  const { todoValues } = useSelector((state) => state.todos);
  const [inputValue, setInputValue] = useState('');
  const [selectValueCategorie, setSelectValueCategorie] = useState('');
  useEffect(() => {
    if (todoValues.categorie && todoValues.categorie.length > 0) {
      setSelectValueCategorie(todoValues.categorie);
    }
  }, [todoValues]);
  const updateCounter = () => {
    allCategories?.forEach(async (elem, index) => {
      if (elem.id) {
        await categories.update(elem.id, { counter: index + 1 });
      }
    });
  };
  updateCounter();
  const typingNewTask = (event) => {
    setInputValue(event.target.value);
  };
  const createNewTaskFn = async (event) => {
    event.preventDefault();
    if (inputValue && selectValueCategorie) {
      await todos.add({
        task: inputValue,
        complete: false,
        categorie: selectValueCategorie,
      });
    }
    setInputValue('');
    setSelectValueCategorie('');
    dispatch(clearTodosValuesRedux());
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
            width: 6 / 10,
          }}
          label="New Task"
          variant="outlined"
          value={inputValue}
          onChange={typingNewTask}
          onKeyPress={handleKeypress}
        />
        <div style={{ width: '20%' }}>
          <SelectTodoCategorie />
        </div>
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
      <VerticalTabs />
    </div>
  );
}

export default memo(TodoContainer);
