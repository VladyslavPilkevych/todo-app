import React, { memo, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import { useSelector, useDispatch } from 'react-redux';
import SelectTodoCategorie from '../SelectTodoCategorie/SelectTodoCategorie';
import { toggleModalOpen } from '../../store/actionCreators/modalAC';
import db from '../../db/db';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  p: 6,
  display: 'flex',
  justifyItems: 'center',
  alignItems: 'center',
  justifyContent: 'space-between',
};

function ModalEditTask() {
  const { todos } = db;
  const {
    isOpen,
    taskInfo,
    taskInfo: { itemId, itemTask: content },
  } = useSelector((state) => state.modal);
  const {
    todoValues: { categorie },
  } = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const typingNewTask = (event) => {
    setInputValue(event.target.value);
  };
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    dispatch(toggleModalOpen(false));
  };
  const updateTaskText = async (id) => {
    await todos.update(id, { task: inputValue });
  };
  const updateTaskCategorie = async (id) => {
    if (categorie) {
      await todos.update(id, { categorie });
    }
  };
  const saveAndClose = () => {
    handleClose();
    if (itemId) {
      updateTaskText(itemId);
      updateTaskCategorie(itemId);
    }
  };
  const handleKeypress = (e) => {
    if (e.code === 'Enter' && inputValue.length !== 0) {
      saveAndClose();
    }
  };
  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);
  useEffect(() => {
    setInputValue(content);
  }, [taskInfo]);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            id="filled-basic"
            sx={{
              width: 6 / 10,
            }}
            inputProps={{ autoFocus: true }}
            label="Edit task"
            defaultValue={inputValue}
            onChange={typingNewTask}
            onKeyPress={handleKeypress}
          />
          <div style={{ width: '40%', marginRight: '20px' }}>
            <SelectTodoCategorie modeEdit={taskInfo} />
          </div>
          <Button variant="contained" onClick={saveAndClose}>
            Save changes
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default memo(ModalEditTask);
