import { TOGGLE_MODAL_OPEN, GET_TASK_INFO } from '../actions/modalActions';

export const toggleModalOpen = (data) => ({
  type: TOGGLE_MODAL_OPEN,
  payload: data,
});
export const getTaskInfo = (data) => ({ type: GET_TASK_INFO, payload: data });
