import {
  FETCH_ALL_QUESTION,
  FETCH_ALL_QUESTION_SUCCESS,
  FETCH_ALL_QUESTION_FAILURE,
  ADD_QUESTION,
  SEARCH_QUESTIONS,
  SET_LOADING,
  SET_SEARCHTERM,
  RESET_SEARCH_RESULT,
  ADD_QUESTION_SUCCESS,
  ADD_QUESTION_FAILURE,
  FETCH_ALL_UNANSWERED_QUESTION,
  DISMISS_MESSAGE,
  LIKE_QUESTION_SUCCESS,
  DELETE_QUESTION_SUCCESS,
  SET_ANSWERS_BY_QUESTION
} from '../constants/ActionTypes'

import data from '../data/questions.json'
import udata from '../data/unanswered.json'

import config from '../config'
// export const fetchQuestion = () => ({
//   type: FETCH_ALL_QUESTION
// })
console.log('config', config)
export const addQuestion = () => ({
  type: ADD_QUESTION
})

// export const updatedQuestionSuccess = (questions) => ({
//   type: ADD_QUESTION_SUCCESS,
//   submitted: true
//
// })

const dismissMessage = () => ({
  type: DISMISS_MESSAGE,
  messageActive: false
})

export const deleteQuestionSuccess = (qIdx) => ({
  type: DELETE_QUESTION_SUCCESS,
  qIdx: qIdx

})

export const addQuestionSuccess = (q) => {
  console.log('addQuestionSuccess')
  return dispatch => {
    setTimeout(() => {
      dispatch(dismissMessage())
      // dispatch(resetSearchResult())
    }, 6000)

    return dispatch({
      type: ADD_QUESTION_SUCCESS,
      addSuccess: true,
      newQ: q,
      messageActive: true
    })
  }
}

export const addQuestionFailure = (error) => {
  //   console.log('fetchQuestion');
  return dispatch => {
    setTimeout(() => {
      dispatch(dismissMessage())
    }, 6000)

    return dispatch({
      type: ADD_QUESTION_FAILURE,
      addSuccess: false,
      messageActive: true
    })
  }
}

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


export const searchQuestions = (questions, searchTerm) => {
  //   console.log('fetchQuestion');
    return dispatch => {
      console.log('searchQuestions', searchTerm)

    return dispatch({
    type: SEARCH_QUESTIONS,
    questions,
    searchTerm
  })
  }
}


export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  isLoading
})
export const setSearchTerm = (searchTerm) => ({
  type: SET_SEARCHTERM,
  searchTerm
})



export const setAnswerForQuestion = (idx, answers) => ({
  type: SET_ANSWERS_BY_QUESTION,
  idx,
  answers
})



export const resetSearchResult = () => ({
  type: RESET_SEARCH_RESULT
})

export const fetchQuestions = () => {
  console.log('fetchQuestion')
  return dispatch => {
    return fetch(`${config.domainURL}/api/questions`)
      .then(response => response.json())
      .then(json => {
        json.reverse();
        dispatch(receiveQuestions(json))
      });

    // test local file
    // return  dispatch(receiveQuestions(data))
  }
}

export const fetchUnansweredQuestions = () => {
  console.log('fetchUnsweredQuestions')
  return dispatch => {
    return fetch(`${config.domainURL}/api/questions/unanswered`)
      .then(response => response.json())
      .then(json => dispatch(receiveUnansweredQuestions(json)))

    // return  dispatch(receiveUnansweredQuestions(udata))
  }
}

export const postQuestion = (title) => {
  return dispatch => {
    console.log('postQuestion', title)
    // dispatch(addQuestionFailure({title: 'newTitle'}))

    return fetch(`${config.domainURL}/api/addQuestion`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title })
    })
      .then(response => response.json())
      .then(json => dispatch(addQuestionSuccess(json)))
      .catch(error => {
        dispatch(addQuestionFailure(error))
      })
  }
}

export const deleteQuestion = (qId, idx) => {
  return dispatch => {
    console.log('deleteQuestion', qId, idx)
    // dispatch(addQuestionFailure({title: 'newTitle'}))
    // return dispatch(deleteQuestionSuccess(idx))

    return fetch(`${config.domainURL}/api/question`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: qId })
    })
      .then(r => dispatch(deleteQuestionSuccess(idx)))
    // .catch(error => {
    //   dispatch(addQuestionFailure(error));
    // })
  }
}

export const increaseLike = (qId, idx) => {
  return dispatch => {
    console.log('increaseLike----', qId, idx)

    let likeItems = localStorage.getItem('likeItems')
    likeItems = likeItems? JSON.parse(likeItems):{}
    likeItems[qId] = 1
     localStorage.setItem('likeItems', JSON.stringify(likeItems))
    return dispatch({
      type: LIKE_QUESTION_SUCCESS,
      qIdx: idx
    })
  }
}

export const clickLikeQuestion = (qId, idx) => {

  let likeItems = localStorage.getItem('likeItems')
  likeItems = likeItems? JSON.parse(likeItems):{}
  return dispatch => {
    if (likeItems[qId]) return dispatch({type: 'ALREADY_LIKE'})
    return fetch(`${config.domainURL}/api/question/like`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: qId })
    })
      .then(response => dispatch(increaseLike(qId, idx)))
      .catch(error => {
        // dispatch(addQuestionFailure(error));
      })
  }
}
