import React, { Component, createRef } from 'react'
import { Button, Form, Modal, ModalActions } from 'semantic-ui-react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { postQuestion } from '../actions'
import '../styles/AskQuestionForm.css'

class AddQuestionForm extends Component {
  state={}
  constructor(props) {
    super(props)
    this.state = {
      showModal: false
    }
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

  closeModal = () => {
    this.setState({ showModal: false});
  }
  openModal = () => {
    this.setState({ showModal: true});
  }

  render() {
    const { showModal } = this.state;
    const AskQuestionButton = (
      <Button onClick={this.openModal} className='ask-button'>Ask a question</Button>
    )

    return (
         <Modal trigger={AskQuestionButton} closeIcon onClose={this.closeModal} open={showModal}>
         <Modal.Header>New Question</Modal.Header>
         <Modal.Content>
           <Modal.Description>
             <Form onSubmit={this.handleSubmit}>
                <Form.Input fluid label='Title' />
                <Form.TextArea 
                  label='Description' 
                  value={this.state.value} 
                  onChange={this.handleChange}
                />
                <div className='flex-container'>
                    <Form.Button type='submit'>Submit</Form.Button>
                    <Button onClick={this.closeModal}>Cancel</Button>
                </div>
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
