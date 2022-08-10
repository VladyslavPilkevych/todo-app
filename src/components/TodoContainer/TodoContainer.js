import React, { memo, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import TodoTask from '../TodoTask/TodoTask';
import styles from './TodoContainer.module.scss';

function TodoContainer() {
  const [inputValue, setInputValue] = useState('');
  const typingNewTask = (event) => {
    setInputValue(event.target.value);
  };
  const createNewTaskFn = () => {
    console.log(inputValue);
    setInputValue('');
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
      <List sx={{ width: '100%', maxWidth: 360 }}>
        {[0, 1, 2, 3].map((value) => {
          const labelId = `checkbox-list-label-${value}`;

          return <TodoTask value={value} labelId={labelId} />;
        })}
      </List>
    </div>
  );
}

export default memo(TodoContainer);
