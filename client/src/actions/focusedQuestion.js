import {
  SET_QUESTION,
  CLEAR_QUESTION,
  UPDATE_FOCUSED_QUESTION_ANSWER,
} from '../constants/ActionTypes';

export const setQuestion = (question) => (dispatch) => {
  dispatch({
    type: SET_QUESTION,
    question,
  });
};

export const clearQuestion = () => (dispatch) => {
  dispatch({ type: CLEAR_QUESTION });
};

export const updateFocusedQuestionAnswers = (newAnswers) => (dispatch) => {
  dispatch({ type: UPDATE_FOCUSED_QUESTION_ANSWER, newAnswers });
};
