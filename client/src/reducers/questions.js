import _ from 'lodash'
import {
  ADD_QUESTION,
  FETCH_ALL_QUESTION,
  SET_LOADING, SET_SEARCHTERM,
  SEARCH_QUESTIONS,
  RESET_SEARCH_RESULT,
  ADD_QUESTION_SUCCESS,
  ADD_QUESTION_FAILURE,
  FETCH_ALL_UNANSWERED_QUESTION,
  DISMISS_MESSAGE,
  LIKE_QUESTION_SUCCESS,
  DELETE_QUESTION_SUCCESS
} from '../constants/ActionTypes'
const initialState = {
  isLoading: false,
  questions: [],
  results: []
}
const questions = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_UNANSWERED_QUESTION:
      return {
        ...state,
        unansweredQuestions: action.questions
      }

    case ADD_QUESTION:
      return {
        ...state
      }
    case DISMISS_MESSAGE:
      return {
        ...state,
        messageActive: action.messageActive
      }
    case ADD_QUESTION_FAILURE:
    case ADD_QUESTION_SUCCESS:
      return {
        ...state,
        newQ: action.newQ,
        addSuccess: action.addSuccess,
        messageActive: action.messageActive
      }
    case FETCH_ALL_QUESTION:
      return {
        ...state,
        questions: action.questions,
        results: action.questions
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
        searchTerm: '',
        result: state.questions
      }
    case LIKE_QUESTION_SUCCESS:
      const val = state.questions[action.qIdx].like || 0
      const questions = JSON.parse(JSON.stringify(state.questions))
      questions[action.qIdx].like = val + 1
      return {
        ...state,
        questions
      }
    case DELETE_QUESTION_SUCCESS:
      console.log('unansweredQuestions', state.unansweredQuestions, action.qIdx)
      const unansweredQuestions = JSON.parse(JSON.stringify(state.unansweredQuestions))
      unansweredQuestions[action.qIdx].undeleted = true
      console.log(unansweredQuestions[action.qIdx])
      return {
        ...state,
        unansweredQuestions: unansweredQuestions
      }

    default:
      return state
  }
}
export default questions
