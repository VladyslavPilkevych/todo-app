import {
  CHANGE_TODOS_VALUES,
  CHANGE_TODOS_CATEGORIE,
  CLEAR_TODOS_VALUES,
} from '../actions/todosActions';

const initialValues = {
  todoValues: {
    task: null,
    complete: false,
    categorie: null,
  },
};

const todosReducer = (state = initialValues, { type, payload } = {}) => {
  switch (type) {
    case CHANGE_TODOS_VALUES:
      return { ...state, todoValues: payload };
    case CHANGE_TODOS_CATEGORIE:
      return {
        ...state,
        todoValues: { ...state.todoValues, categorie: payload },
      };
    case CLEAR_TODOS_VALUES:
      return {
        ...state,
        todoValues: { task: null, complete: false, categorie: null },
      };
    default:
      return state;
  }
};

export default todosReducer;
