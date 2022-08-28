import React, { memo, useState } from 'react';

import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ClearIcon from '@mui/icons-material/Clear';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { useLiveQuery } from 'dexie-react-hooks';
import db from '../../db/db';

function DeleteTasksCategories() {
  const { categories } = db;
  const allCategories = useLiveQuery(() => categories.toArray(), []);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const deleteCategorie = async (id) => {
    if (id) {
      categories.delete(id);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton
        sx={{
          width: '25px',
          height: '25px',
          margin: '5px',
        }}
        edge="end"
        aria-label="comments"
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {(!allCategories || allCategories.length <= 0) && (
          <div
            style={{
              padding: '15px',
            }}
          >
            No categories yet
          </div>
        )}
        {allCategories &&
          allCategories?.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingRight: '15px',
              }}
            >
              <MenuItem onClick={handleClose}>{item.categorieName}</MenuItem>
              <IconButton
                edge="end"
                aria-label="comments"
                onClick={() => deleteCategorie(item.id)}
              >
                <ClearIcon />
              </IconButton>
            </div>
          ))}
      </Menu>
    </div>
  );
}

export default memo(DeleteTasksCategories);
