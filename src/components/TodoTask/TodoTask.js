import React, { memo, useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
// import IconButton from '@mui/material/IconButton';
// import CommentIcon from '@mui/icons-material/Comment';
import PropTypes from 'prop-types';
import styles from './TodoTask.module.scss';

function TodoTask(props) {
  const { value, labelId } = props;
  const [checked, setChecked] = useState([0]);

  const handleToggle = (valueNew) => () => {
    const currentIndex = checked.indexOf(valueNew);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(valueNew);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  return (
    <div className={styles.todoTask}>
      <ListItem
        key={value}
        // secondaryAction={
        //   <IconButton edge="end" aria-label="comments">
        //     <CommentIcon />
        //   </IconButton>
        // }
        disablePadding
      >
        <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={checked.indexOf(value) !== -1}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': labelId }}
            />
          </ListItemIcon>
          <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
        </ListItemButton>
      </ListItem>
    </div>
  );
}

TodoTask.propTypes = {
  labelId: PropTypes.number.isRequired,
  value: PropTypes.number,
};

TodoTask.defaultProps = {
  value: 1,
};

export default memo(TodoTask);
