import _ from 'lodash'
import { ADD_QUESTION,
  FETCH_ALL_QUESTION,
   SET_LOADING, SET_SEARCHTERM,
   SEARCH_QUESTIONS,
   RESET_SEARCH_RESULT,
   ADD_QUESTION_SUCCESS,
   ADD_QUESTION_FAILURE,
   FETCH_ALL_UNANSWERED_QUESTION
  } from '../constants/ActionTypes'
const initialState = {
  isLoading: false,
  questions: [],
  results: []
}
const questions = (state = initialState, action) => {
  switch (action.type) {
      case FETCH_ALL_UNANSWERED_QUESTION:
        console.log('FETCH_ALL_UNANSWERED_QUESTION', action)
        return {
          ...state,
          unansweredQuestions: action.questions
        }

    case ADD_QUESTION:
      return {
        ...state
      }
    case ADD_QUESTION_FAILURE:
    case ADD_QUESTION_SUCCESS:
        return {
          ...state,
          ...action
        }
    case FETCH_ALL_QUESTION:
    console.log('FETCH_ALL_QUESTION', action)
      return {
        ...state,
        questions: action.questions,
        results: action.questions,
      }
      case SEARCH_QUESTIONS:
        const re = new RegExp(_.escapeRegExp(action.searchTerm), 'i')
        const isMatch = (q) => re.test(q.title)

        return {
          ...state,
          questions: action.questions,
          searchTerm: action.searchTerm,
          results: _.filter(action.questions, isMatch),
          isLoading: false
        }
    case SET_LOADING:
    return {
      ...state,
      isLoading: action.isLoading
    }
    case SET_SEARCHTERM:
    return {
      ...state,
      searchTerm: action.searchTerm
    }
    case RESET_SEARCH_RESULT:
    return {
      ...state,
      searchTerm: "",
      result: state.questions
    }
    default:
      return state
  }
}
export default questions
