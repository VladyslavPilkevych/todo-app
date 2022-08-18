import {
  CHANGE_TODOS_VALUES,
  CHANGE_TODOS_CATEGORIE,
  CLEAR_TODOS_VALUES,
} from '../actions/todosActions';

export const chengeTodosValuesRedux = (data) => ({
  type: CHANGE_TODOS_VALUES,
  payload: data,
});
export const chengeTodosCategorieRedux = (data) => ({
  type: CHANGE_TODOS_CATEGORIE,
  payload: data,
});
export const clearTodosValuesRedux = (data) => ({
  type: CLEAR_TODOS_VALUES,
  payload: data,
});
