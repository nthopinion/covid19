import React, { Component, createRef } from 'react'
import { connect } from 'react-redux'
import { Menu, Button, Form, Message, Card, Grid, Icon, List } from 'semantic-ui-react'
import AuthProvider from "../AuthProvider";
import { fetchUnansweredQuestions } from '../actions'
import AnswerItem from '../components/AnswerItem'

import CardLeftPanel from '../components/CardLeftPanel'
import '../styles/QuestionBoard.css'
import config from '../config'


class AnswerForm extends Component {
  state={}
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch } = this.props

  }

  postQuestionAnswer = (question) => {

      return fetch(`${config.domainURL}/api/updateQuestion`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
         body: JSON.stringify({...question})
       })
       .then(response => console.log(response))
       .catch(error => console.log(error))
    }

  handleSubmit = async (e, { value }, q) => {
    const key = 'q_'+q.id;

    const updatedQuestion = {...q}
    const newAnswer = this.state[key];
    let answers = updatedQuestion.answers
    if(answers) {
      answers.push(newAnswer)
    } else {
      updatedQuestion.answers = [newAnswer]
    }
    await this.postQuestionAnswer(updatedQuestion)
    this.setState({ submitted: true, newAnswer:  updatedQuestion.answers})
  }
  handleChange = (e, { value }, q) => {
    const key = 'q_'+q.id;
    console.log('key', key, this.state)
    this.setState({ [key]: value })
}
  render() {
    const {q, idx} = this.props
    return (
      <Card className="qCard" key={idx} style={{width:'100%'}}>
         <CardLeftPanel questionNumber={idx} title={q.title}/>
       {  !this.state.submitted && <Form
         onSubmit={(e, { value }) => this.handleSubmit(e, { value }, q)}

         >
              <Form.TextArea
              placeholder='Tell us more about it...'
              onChange={(e, { value }) => this.handleChange(e, { value }, q)}
              />
              <div>
               <Icon name='attach' />
               click to attach files
             </div>

              <Form.Button type='submit'>Submit</Form.Button>
            </Form>
          }

          {this.state.submitted &&
            <Message positive>
              <Message.Header>Thank you!</Message.Header>
              <List>

                {this.state.newAnswer && this.state.newAnswer.map( (answer, idx) => {
                  return <AnswerItem answer={answer} key={idx}/>
                })}
                </List>

            </Message>
          }

      </Card>
    )
  }
}


function mapStateToProps(state) {
  // console.log(state)
  return {
    // unansweredQuestions: state.questionBoard.unansweredQuestions
  }
}

export default AnswerForm
