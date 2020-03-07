import { FETCH_ALL_QUESTION,
  FETCH_ALL_QUESTION_SUCCESS,
  FETCH_ALL_QUESTION_FAILURE,
  ADD_QUESTION,
  SEARCH_QUESTIONS,
  SET_LOADING,
  SET_SEARCHTERM,
  RESET_SEARCH_RESULT
 } from '../constants/ActionTypes'

// export const fetchQuestion = () => ({
//   type: FETCH_ALL_QUESTION
// })

export const addQuestion = () => ({
  type: ADD_QUESTION
})


export const fetchProductsFailure = error => ({
  type: FETCH_ALL_QUESTION_FAILURE,
  payload: { error }
})

export const receiveQuestions = questions => ({
  type: FETCH_ALL_QUESTION,
  questions
})
export const searchQuestions = (questions, searchTerm) => ({
  type: SEARCH_QUESTIONS,
  questions,
  searchTerm
})
export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  isLoading,
})
export const setSearchTerm = (searchTerm) => ({
  type: SET_SEARCHTERM,
  searchTerm,
})
export const resetSearchResult = () => ({
  type: RESET_SEARCH_RESULT,
})

export const fetchQuestions = () => {
  console.log('fetchQuestion');
  return dispatch => {
    return fetch(`https://nth-opinion.s3-us-west-2.amazonaws.com/questions.json`)
      .then(response => response.json())
      .then(json => dispatch(receiveQuestions(json)))
  }
}

 // const fetchQuestion => () => dispatch => {
 //    return fetch(`https://nth-opinion.s3-us-west-2.amazonaws.com/questions.json`)
 //      .then(response => response.json())
 //      .then(json => dispatch(receiveQuestion(json)))
 //  }
