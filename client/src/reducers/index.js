import { combineReducers } from 'redux';
import questions from './questions';
import physicianQuestion from './physicianQuestion';
import focusedQuestion from './focusedQuestion';

export default combineReducers({
  questionBoard: questions,
  physician: physicianQuestion,
  focusedQuestion,
});
