import React, { Component, createRef, Fragment } from 'react'
import { connect } from 'react-redux'
import { Menu, Button, Form, Message, Card, Grid, Icon, List } from 'semantic-ui-react'
import AuthProvider from "../AuthProvider";
import { deleteQuestion } from '../actions'
import AnswerItem from '../components/AnswerItem'
import FileUpload from '../components/FileUpload'
import CardLeftPanel from '../components/CardLeftPanel'
import '../styles/QuestionBoard.css'
import { bindActionCreators } from 'redux'
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
  handleDeleteQuestion = (qId, idx) => {
    this.props.deleteQuestion(qId, idx)
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
    this.setState({ [key]: value })
}
  render() {
    const {q, idx} = this.props
    return (
      <Card className="qCard" key={idx} style={{width:'100%'}}>
         <CardLeftPanel questionNumber={idx} title={q.title}/>
       {  !this.state.submitted && !(q.undeleted) &&
         <Fragment>
          <Form


         >
              <Form.TextArea
              placeholder='Tell us more about it...'
              onChange={(e, { value }) => this.handleChange(e, { value }, q)}
              />
              <div>
               {false &&<Icon name='attach' />}
               {false && <FileUpload/>}
             </div>
            </Form>

                      <Card.Content extra>
                        <div className='ui two buttons'>
                          <Button basic color='green' onSubmit={(e, { value }) => this.handleSubmit(e, { value }, q)}>
                            Submit
                          </Button>
                          <Button basic color='red' onClick={() => this.handleDeleteQuestion(q.id, idx)}>
                            Delete
                          </Button>
                        </div>
                      </Card.Content>
                      </Fragment>
          }

          {(q.undeleted) &&
            <Message positive>
              <Message.Header>Deleted</Message.Header>
            </Message>
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


const mapStateToProps = (state) => {
  return {
    unansweredQuestions: state.questionBoard.unansweredQuestions

  }
}

const mapDispatchToProps= (dispatch) => bindActionCreators({
 deleteQuestion
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AuthProvider(AnswerForm))
