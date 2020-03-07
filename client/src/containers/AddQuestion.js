import React from 'react'
import { connect } from 'react-redux'
import { addQuestion } from '../actions'

const AddQuestion = ({ dispatch }) => {
  let input

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        dispatch(addQuestion(input.value))
        input.value = ''
      }}
      >
        <input ref={node => input = node} />
        <button type='submit'>
          Add Todo
        </button>
      </form>
    </div>
  )
}

export default connect()(AddQuestion)
