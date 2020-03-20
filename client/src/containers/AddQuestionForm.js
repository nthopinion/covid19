import React, { Component, createRef } from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { postQuestion } from '../actions'
import '../styles/PatientBoard.css'

const AskQuestionButton = (
  <Button className='ask-button'>Ask a question</Button>
)

class AddQuestionForm extends Component {
  state={}
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch } = this.props
  }

  handleSubmit = (e, { value }) => {
    const { dispatch } = this.props
    dispatch(postQuestion(this.state.value))
    this.setState({ value: '' })
  }
  handleChange = (e, { value }) => this.setState({ value })

  render() {

    return (
/*       <Form onSubmit={this.handleSubmit}>
           <Form.TextArea
           value={this.state.value}
           onChange={this.handleChange}
           label='Do you have a question?'
           placeholder='Tell us more about it...'

           />
           <Form.Button type='submit'>Submit</Form.Button>
         </Form> */
         <Modal trigger={AskQuestionButton}>
         <Modal.Header>New Question</Modal.Header>
         <Modal.Content>
           <Modal.Description>
             <Form>
               <Form.Input fluid label='Title' />
               <Form.TextArea label='Description' />
               <Form.Button type='submit' color='#006EAA'>Submit</Form.Button>
             </Form>
           </Modal.Description>
         </Modal.Content>
       </Modal>
    )
  }
}

function mapStateToProps(state) {
  console.log(state)
  return {
    ...state.questionBoard
  }
}

export default connect(mapStateToProps)(AddQuestionForm)
