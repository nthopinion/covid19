// import { FETCH_ALL_UNANSWERED_QUESTION } from '../constants/ActionTypes';

import {
  SET_QUESTION,
  CLEAR_QUESTION,
  UPDATE_FOCUSED_QUESTION_ANSWER,
} from '../constants/ActionTypes';

const initialState = {};
const focusedQuestion = (state = initialState, action) => {
  switch (action.type) {
    case SET_QUESTION:
      return action.question;
    case CLEAR_QUESTION:
      return initialState;
    case UPDATE_FOCUSED_QUESTION_ANSWER:
      const question = {
        ...state,
        answers: action.newAnswers,
      };
      return question;
    default:
      return state;
  }
};
export default focusedQuestion;
