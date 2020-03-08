import { FETCH_ALL_QUESTION,
  FETCH_ALL_QUESTION_SUCCESS,
  FETCH_ALL_QUESTION_FAILURE,
  ADD_QUESTION,
  SEARCH_QUESTIONS,
  SET_LOADING,
  SET_SEARCHTERM,
  RESET_SEARCH_RESULT,
  ADD_QUESTION_SUCCESS,
  ADD_QUESTION_FAILURE,
  FETCH_ALL_UNANSWERED_QUESTION
 } from '../constants/ActionTypes'

import config from '../config'
// export const fetchQuestion = () => ({
//   type: FETCH_ALL_QUESTION
// })
console.log('config', config)
export const addQuestion = () => ({
  type: ADD_QUESTION
})
export const addQuestionSuccess = () => ({
  type: ADD_QUESTION_SUCCESS,
  addSuccess: true

})
export const addQuestionFailure = error => ({
  type: ADD_QUESTION_FAILURE,
  addSuccess: false,
  payload: { error }
})

export const fetchQuestionsFailure = error => ({
  type: FETCH_ALL_QUESTION_FAILURE,
  payload: { error }
})

export const receiveQuestions = questions => ({
  type: FETCH_ALL_QUESTION,
  questions
})

export const receiveUnansweredQuestions = questions => ({
  type: FETCH_ALL_UNANSWERED_QUESTION,
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
    return fetch(`${config.domainURL}/api/questions`)
      .then(response => response.json())
      .then(json => dispatch(receiveQuestions(json)))
  }
}

export const fetchUnansweredQuestions = () => {
  console.log('fetchUnsweredQuestions');
  return dispatch => {
    return fetch(`${config.domainURL}/api/questions/unanswered`)
      .then(response => response.json())
      .then(json => dispatch(receiveUnansweredQuestions(json)))
  }
}

export const postQuestion = (title) => {
  return dispatch => {
    console.log('postQuestion', title);
    return fetch(`${config.domainURL}/api/addQuestion`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
       body: JSON.stringify({title})
     }).then(response => addQuestionSuccess())
     .catch(error => dispatch(addQuestionFailure(error)))
  }
}
// 
// export const updateQuestion = (question) => {
//   return dispatch => {
//     console.log('postQuestion', question);
//     return fetch(`${config.domainURL}/api/updateQuestion`, {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//        body: JSON.stringify({question})
//      })
//      .then(response => addQuestionSuccess())
//      .catch(error => dispatch(addQuestionFailure(error)))
//   }
// }

 // const fetchQuestion => () => dispatch => {
 //    return fetch(`https://nth-opinion.s3-us-west-2.amazonaws.com/questions.json`)
 //      .then(response => response.json())
 //      .then(json => dispatch(receiveQuestion(json)))
 //  }
