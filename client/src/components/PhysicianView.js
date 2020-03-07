import React, { Component, createRef } from 'react'
import { Form } from 'semantic-ui-react'
import { connect } from 'react-redux'

class PhysicianView extends Component {
  state={}
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch } = this.props
  }

  handleSubmit = (e, { value }) => {
    const { dispatch } = this.props
    // dispatch(postQuestion(this.state.value))
    // this.setState({ value: '' })
  }
  handleChange = (e, { value }) => this.setState({ value })

  render() {

    return (
      <div></div>
    )
  }
}


function mapStateToProps(state) {
  // console.log(state)
  return {
    ...state.questionBoard
  }
}

export default connect(mapStateToProps)(PhysicianView)
