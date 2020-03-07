import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchQuestions, setLoading, searchQuestions, resetSearchResult, setSearchTerm } from '../actions'
import QuestionBoard from '../components/QuestionBoard'

class PatientBoard extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchQuestions())
  }

  handleResultSelect = (e, {result}) => {
    const { dispatch } = this.props
    dispatch(setSearchTerm(result.title))
  }
  handleSearchChange = (e, { value }) => {
    const { dispatch } = this.props

  dispatch(setLoading(false))
  dispatch(setSearchTerm(value))
  setTimeout(() => {
    if (this.props.searchTerm.length < 1) return dispatch(resetSearchResult())
    dispatch(searchQuestions(this.props.questions, this.props.searchTerm))

  }, 300)
}

  render() {
    return (
      <div>
        <QuestionBoard
          results={this.props.results}
          handleResultSelect ={this.handleResultSelect}
          handleSearchChange ={this.handleSearchChange}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  // console.log(state)
  return {
    ...state.questionBoard
  }
}

export default connect(mapStateToProps)(PatientBoard)
