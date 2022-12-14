import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { useDispatch } from 'react-redux';
import {
  toggleModalOpen,
  getTaskInfo,
} from '../../store/actionCreators/modalAC';
import db from '../../db/db';
import styles from './TodoTask.module.scss';

function TodoTask(props) {
  const { value, labelId } = props;
  const dispatch = useDispatch();
  const { todos } = db;
  const [checked, setChecked] = useState(value.complete);
  const updateTaskComplete = async (id) => {
    if (id) {
      await todos.update(id, { complete: !checked });
    }
    setChecked((e) => !e);
  };
  const editTask = async (itemId, itemTask, itemCategorie) => {
    dispatch(toggleModalOpen(true));
    dispatch(getTaskInfo({ itemId, itemTask, itemCategorie }));
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
            <IconButton
              edge="end"
              aria-label="comments"
              onClick={() => editTask(value.id, value.task, value.categorie)}
            >
              <EditIcon />
            </IconButton>
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
        <ListItemButton
          role={undefined}
          onClick={() => updateTaskComplete(value.id)}
          dense
        >
          <ListItemIcon>
            <Checkbox
              edge="start"
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
    categorie: PropTypes.string,
  }),
};

TodoTask.defaultProps = {
  value: {},
};

export default memo(TodoTask);
