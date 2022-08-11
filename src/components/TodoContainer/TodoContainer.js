import React, { memo, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import { useLiveQuery } from 'dexie-react-hooks';
import db from '../../db/db';
import TodoTask from '../TodoTask/TodoTask';

import styles from './TodoContainer.module.scss';

function TodoContainer() {
  const { todos } = db;
  const allTodos = useLiveQuery(() => todos.toArray(), []);

  const [inputValue, setInputValue] = useState('');
  const typingNewTask = (event) => {
    setInputValue(event.target.value);
  };
  const createNewTaskFn = async (event) => {
    event.preventDefault();
    await todos.add({
      task: inputValue,
      complete: false,
    });
    setInputValue('');
  };
  const handleKeypress = (e) => {
    if (e.code === 'Enter' && inputValue.length !== 0) {
      createNewTaskFn(e);
    }
  };
  return (
    <div className={styles.background}>
      <p className={styles.todoTitle}>Todo</p>
      <div className={styles.textFieldAndBtnCreate}>
        <TextField
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
      {allTodos && allTodos.length === 0 && (
        <p className={styles.noTasks}>Any Tasks Yet</p>
      )}
      <List sx={{ width: '70%' }}>
        {allTodos &&
          allTodos?.map((value) => {
            const labelId = `checkbox-list-label-${value.id}`;
            return <TodoTask key={value.id} value={value} labelId={labelId} />;
          })}
      </List>
    </div>
  );
}

export default memo(TodoContainer);
