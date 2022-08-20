import React, { memo, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { useLiveQuery } from 'dexie-react-hooks';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from '@mui/material/Autocomplete';
import PropTypes from 'prop-types';
import db from '../../db/db';
import { chengeTodosCategorieRedux } from '../../store/actionCreators/todosAC';

function SelectTodoCategorie(props) {
  const { modeEdit } = props;
  const { todos, categories } = db;
  const dispatch = useDispatch();
  const allCategories = useLiveQuery(() => categories.toArray(), []);
  const [selectValueCategorie, setSelectValueCategorie] = useState('');
  const { todoValues } = useSelector((state) => state.todos);
  const updateTaskCategorie = async (id, todoCategorieValue) => {
    await todos.update(id, { categorie: todoCategorieValue });
  };
  useEffect(() => {
    if (todoValues.categorie && todoValues.categorie.length > 0) {
      setSelectValueCategorie(todoValues.categorie);
      if (modeEdit && modeEdit.itemId) {
        updateTaskCategorie(modeEdit.itemId, todoValues.categorie);
      }
    } else {
      setSelectValueCategorie('');
      if (modeEdit && modeEdit.itemId) {
        updateTaskCategorie(modeEdit.itemId, '');
      }
    }
  }, [todoValues]);
  useEffect(() => {
    if (modeEdit && modeEdit.itemCategorie) {
      setSelectValueCategorie(modeEdit.itemCategorie);
    }
  }, []);
  const createNewSelectCategorie = async (e) => {
    const newArr = allCategories?.map((elem) => elem.categorieName);
    if (e.key === 'Enter' && !newArr.includes(selectValueCategorie)) {
      await categories.add({
        categorieName: selectValueCategorie,
        // counter: allCategories[allCategories.length - 1].counter + 1,
      });
    }
  };
  if (!allCategories) {
    return null;
  }
  console.log(selectValueCategorie);
  return (
    <Autocomplete
      options={allCategories}
      noOptionsText="Enter to create a new option"
      getOptionLabel={(option) => option.categorieName}
      sx={{
        // width: 2 / 10,
        marginLeft: '20px',
      }}
      autoSelect
      inputValue={selectValueCategorie}
      // getOptionLabel={(option) => {
      //   console.log(option);
      //   console.log(option.title);
      //   console.log(option.name);
      // }}
      onInputChange={(e, newValue) => {
        if (
          newValue &&
          newValue !== todoValues.categorie &&
          newValue.length > 0
        ) {
          dispatch(chengeTodosCategorieRedux(newValue));
        }
      }}
      onKeyDown={(e) => {
        if (
          e.target.value &&
          e.target.value.length === 1 &&
          e.key === 'Backspace'
        ) {
          dispatch(chengeTodosCategorieRedux(''));
        }
      }}
      onChange={(elem, value, action) => {
        if (action === 'clear') {
          dispatch(chengeTodosCategorieRedux(''));
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select"
          variant="outlined"
          onKeyDown={(e) => createNewSelectCategorie(e)}
        />
      )}
    />
  );
}

SelectTodoCategorie.propTypes = {
  // modeEdit: PropTypes.object,
  modeEdit: PropTypes.shape({
    itemId: PropTypes.number.isRequired,
    content: PropTypes.string,
    itemCategorie: PropTypes.string,
  }),
};

SelectTodoCategorie.defaultProps = {
  modeEdit: null,
};

export default memo(SelectTodoCategorie);
