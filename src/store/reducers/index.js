import { combineReducers } from 'redux';
import modalReducer from './modalReducer';

const reducer = combineReducers({
  modal: modalReducer,
});

export default reducer;
