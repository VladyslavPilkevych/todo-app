import { combineReducers } from 'redux';
import modalReducer from './modalReducer';
import todosReducer from './todosReducer';

const reducer = combineReducers({
  modal: modalReducer,
  todos: todosReducer,
});

export default reducer;
