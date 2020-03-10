import { combineReducers } from 'redux'
import questions from './questions'
import physicianQuestion from './physicianQuestion'
export default combineReducers({
  questionBoard: questions,
  physician: physicianQuestion
})
