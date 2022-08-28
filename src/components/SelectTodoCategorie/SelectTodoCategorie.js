import React, { memo, useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { useDispatch, useSelector } from 'react-redux';
import { useLiveQuery } from 'dexie-react-hooks';
import { chengeTodosCategorieRedux } from '../../store/actionCreators/todosAC';
import db from '../../db/db';

function SelectTodoCategorie(props) {
  const { modeEdit } = props;
  const { categories } = db;
  const dispatch = useDispatch();
  const allCategories = useLiveQuery(() => categories.toArray(), []);
  const [selectValueCategorie, setSelectValueCategorie] = useState('');
  const { todoValues } = useSelector((state) => state.todos);
  useEffect(() => {
    if (todoValues.categorie && todoValues.categorie.length > 0) {
      setSelectValueCategorie(todoValues.categorie);
    } else {
      setSelectValueCategorie('');
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
      });
    }
  };
  if (!allCategories) {
    return null;
  }
  return (
    <Autocomplete
      options={allCategories}
      noOptionsText="Enter to create a new option"
      getOptionLabel={(option) => option.categorieName}
      sx={{
        marginLeft: '20px',
      }}
      autoSelect
      inputValue={selectValueCategorie}
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
