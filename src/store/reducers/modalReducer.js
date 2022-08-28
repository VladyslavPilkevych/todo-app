import { TOGGLE_MODAL_OPEN, GET_TASK_INFO } from '../actions/modalActions';

const initialValues = {
  isOpen: false,
  taskInfo: {
    id: null,
    content: null,
    categorie: null,
  },
};

const modalReducer = (state = initialValues, { type, payload } = {}) => {
  switch (type) {
    case TOGGLE_MODAL_OPEN:
      return { ...state, isOpen: payload };
    case GET_TASK_INFO:
      return { ...state, taskInfo: payload };
    default:
      return state;
  }
};

export default modalReducer;
