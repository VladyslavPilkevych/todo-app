import React, { memo, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { useLiveQuery } from 'dexie-react-hooks';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from '@mui/material/Autocomplete';
import db from '../../db/db';
import { chengeTodosCategorieRedux } from '../../store/actionCreators/todosAC';

function SelectTodoCategorie() {
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
  const createNewSelectCategorie = async (e) => {
    const newArr = allCategories?.map((elem) => elem.categorieName);
    if (e.key === 'Enter' && !newArr.includes(selectValueCategorie)) {
      await categories.add({
        categorieName: selectValueCategorie,
        counter: allCategories[allCategories.length - 1].counter + 1,
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
        width: 2 / 10,
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
        if (newValue && newValue.length > 0) {
          dispatch(chengeTodosCategorieRedux(newValue));
          //   setSelectValueCategorie(newValue);
        }
      }}
      onKeyDown={(e) => {
        if (e.target.value && e.target.value.length === 1 && e.key === 'Backspace') {
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

export default memo(SelectTodoCategorie);
