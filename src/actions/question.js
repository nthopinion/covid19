import { FETCH_ALL_QUESTION, FETCH_ALL_QUESTION_SUCCESS, FETCH_ALL_QUESTION_FAILURE, ADD_QUESTION } from '../constants/ActionTypes'

export const fetchQuestion = () => ({
  type: FETCH_ALL_QUESTION
})

export const addQuestion = () => ({
  type: ADD_QUESTION
})
export const fetchProductsSuccess = questions => ({
  type: FETCH_ALL_QUESTION_SUCCESS,
  payload: { questions }
})

export const fetchProductsFailure = error => ({
  type: FETCH_ALL_QUESTION_FAILURE,
  payload: { error }
})
