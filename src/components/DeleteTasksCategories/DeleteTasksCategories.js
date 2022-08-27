import React, { memo } from 'react';
// import Button from '@mui/material/Button';
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const deleteCategorie = async (id) => {
    console.log('categories.delete(id);');
    // console.log(id);
    if (id) {
      categories.delete(id);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {/* <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button> */}

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
                // sx={{
                //   width: '25px',
                //   height: '25px',
                // }}
                edge="end"
                aria-label="comments"
                onClick={() => deleteCategorie(item.id)}
              >
                <ClearIcon />
              </IconButton>
            </div>
          ))}
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem> */}
      </Menu>
    </div>
  );
}

export default memo(DeleteTasksCategories);
