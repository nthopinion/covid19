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
  NEW_QUESTION_ANSWERED,
  DELETE_ANSWERED_QUESTION_SUCCESS,
  DELETE_UNANSWERED_QUESTION_SUCCESS
} from '../constants/ActionTypes'
const initialState = {
  isLoading: false,
  questions: [],
  results: []
}
const questions = (state = initialState, action) => {
  switch (action.type) {
    // case SET_ANSWERS_BY_QUESTION:
    // const val = state.questions[action.idx]['answers']
    // const questions = JSON.parse(JSON.stringify(state.questions))
    // questions[action.qIdx]['answers'] = action.answers
    // return {
    //   ...state,
    //   questions: action.questions
    // }
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
    case NEW_QUESTION_ANSWERED:
      const newQuestions = [{...action.question}, ...state.questions];

      return {
        ...state,
        questions: newQuestions,
        results: newQuestions
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
      const val = state.questions[action.qIdx]['like'] || 0
      const questions = JSON.parse(JSON.stringify(state.questions))
      questions[action.qIdx]['like'] = val + 1
      console.log(questions[action.qIdx])
      return {
        ...state,
        questions,
        results :questions
      }
    case DELETE_UNANSWERED_QUESTION_SUCCESS:
      const unansweredQuestions = state.unansweredQuestions.map((question, index) => {
        return {
          ...question,
          undeleted: index === action.qIdx
        }
      });

      return {
        ...state,
        unansweredQuestions: unansweredQuestions
      }
    case DELETE_ANSWERED_QUESTION_SUCCESS:
      const data = state.questions.map((question, index) => {
        return {
          ...question,
          undeleted: index === action.qIdx
        }
      });

      console.log("i am here");

      return {
        ...state,
        questions: data
      }

    default:
      return state
  }
}
export default questions
