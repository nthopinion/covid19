import { ADD_QUESTION } from '../constants/ActionTypes'

const questions = (state = [], action) => {
  switch (action.type) {
    case ADD_QUESTION:
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    default:
      return state
  }
}
export default questions
