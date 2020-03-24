import { FETCH_ALL_UNANSWERED_QUESTION } from '../constants/ActionTypes';

const initialState = {
  questions: [],
};
const physicianQuestion = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_UNANSWERED_QUESTION:
      return {
        ...state,
        questions: action.questions,
      };
    default:
      return state;
  }
};
export default physicianQuestion;
