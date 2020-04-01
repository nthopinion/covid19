import { SET_QUESTION, CLEAR_QUESTION } from '../constants/ActionTypes';

export const setQuestion = (question) => (dispatch) => {
  dispatch({
    type: SET_QUESTION,
    question,
  });
};

export const clearQuestion = () => (dispatch) => {
  dispatch({ type: CLEAR_QUESTION });
};
