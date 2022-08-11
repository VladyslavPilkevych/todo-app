import React, { memo, useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
// import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import db from '../../db/db';
import styles from './TodoTask.module.scss';

function TodoTask(props) {
  const { value, labelId } = props;
  const { todos } = db;
  // const [checked, setChecked] = useState([0]);
  const [checked, setChecked] = useState(value.complete);
  // const handleToggle = (valueNew) => () => {
  //   const currentIndex = checked.indexOf(valueNew);
  //   const newChecked = [...checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(valueNew);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }
  //   console.log(newChecked);
  //   setChecked(newChecked);
  // };
  // if (value.complete) {
  //   handleToggle();
  // }
  const updateTaskComplete = async (id) => {
    // const currentIndex = checked.indexOf(id);
    // const newChecked = [...checked];

    // if (currentIndex === -1) {
    //   newChecked.push(id);
    // } else {
    //   newChecked.splice(currentIndex, 1);
    // }
    // console.log(newChecked);
    // setChecked(newChecked);
    // await todos.update(id, { complete: !!newChecked[1] });
    await todos.update(id, { complete: !checked });
    setChecked((e) => !e);
  };
  const deleteTask = async (id) => {
    todos.delete(id);
  };
  return (
    <div className={styles.todoTask}>
      <ListItem
        sx={{
          width: 1 / 1,
        }}
        secondaryAction={
          <>
            {/* <IconButton edge="end" aria-label="comments">
              <EditIcon />
            </IconButton> */}
            <IconButton
              sx={{
                marginLeft: 2,
              }}
              edge="end"
              aria-label="comments"
              onClick={() => deleteTask(value.id)}
            >
              <DeleteIcon />
            </IconButton>
          </>
        }
        disablePadding
      >
        {/* <ListItemButton role={undefined} onClick={handleToggle(value.id)} dense> */}
        <ListItemButton
          role={undefined}
          onClick={() => updateTaskComplete(value.id)}
          dense
        >
          <ListItemIcon>
            <Checkbox
              edge="start"
              // checked={checked.indexOf(value.id) !== -1}
              checked={value.complete}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': labelId }}
            />
          </ListItemIcon>
          <ListItemText
            id={labelId}
            className={`${styles.taskText} ${
              value.complete && styles.taskTextChecked
            }`}
            primary={value.task}
            // primary={`Line item ${value}`}
          />
        </ListItemButton>
      </ListItem>
    </div>
  );
}

TodoTask.propTypes = {
  labelId: PropTypes.string.isRequired,
  value: PropTypes.shape({
    id: PropTypes.number.isRequired,
    task: PropTypes.string,
    complete: PropTypes.bool,
  }),
};

TodoTask.defaultProps = {
  value: {},
};

export default memo(TodoTask);
