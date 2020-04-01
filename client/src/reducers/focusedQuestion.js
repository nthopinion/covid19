// import { FETCH_ALL_UNANSWERED_QUESTION } from '../constants/ActionTypes';

import { SET_QUESTION, CLEAR_QUESTION } from '../constants/ActionTypes';

const initialState = {
  question: {},
};
const focusedQuestion = (state = initialState, action) => {
  switch (action.type) {
    case SET_QUESTION:
      return {
        question: action.question,
      };
    case CLEAR_QUESTION:
      return initialState;
    default:
      return state;
  }
};
export default focusedQuestion;
