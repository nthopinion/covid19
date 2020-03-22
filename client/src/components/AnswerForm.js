import React, { Component, createRef, Fragment } from 'react'
import { connect } from 'react-redux'
import { Menu, Button, Form, Message, Card, Grid, Icon, List, Label } from 'semantic-ui-react'
import AuthProvider from "../AuthProvider";
import { deleteQuestion, setAnswerForQuestion } from '../actions'
import AnswerItem from '../components/AnswerItem'
import FileUpload from '../components/FileUpload'
import CardLeftPanel from '../components/CardLeftPanel'
import '../styles/QuestionBoard.css'
import { bindActionCreators } from 'redux'
import config from '../config'


class AnswerForm extends Component {
  constructor(props) {
    super(props)
    let newQ = Object.assign({}, props.q)
    if( props.q && !props.q.answers) {
      newQ.answers = ['']
    }
    this.state={q: newQ, idx: props.idx}

  }

  postQuestionAnswer = (question) => {
      const endpoint = this.props.showUnaswered ? 'updateQuestion': 'editAnswers';
      return fetch(`${config.domainURL}/api/${endpoint}`, {
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

  componentWillReceiveProps(nextProps){
  if(nextProps.q!==this.props.q){
    //Perform some operation
    this.setState({q: nextProps.q });
    // this.classMethod();
  }
  if(nextProps.idx!==this.props.idx){
    //Perform some operation
    this.setState({idx: nextProps.idx });
    // this.classMethod();
  }
}
  handleDeleteQuestion = (qId, idx) => {
    this.props.deleteQuestion(qId, idx)
  }
  handleSubmit = async (e, { value }, q) => {
    console.log('submit answer')
    // const key = 'q_'+q.id;

    const updatedQuestion = {...q}
    updatedQuestion.answers = updatedQuestion.answers.filter(a => a && a.length > 0)

    console.log('updatedQuestion', updatedQuestion)
    await this.postQuestionAnswer(updatedQuestion)
    this.setState({ submitted: true, ['newAnswers' + q.id]:  updatedQuestion.answers})
  }
  handleChange = (e, { value }, q) => {
    const key = 'q_'+q.id;
    this.setState({ [key]: value })
  }
  handleUpdatedAnswerChange = (e, { value }, q, ansIdx) => {
    const qu = Object.assign({}, q);
    qu.answers[ansIdx] = value
    // const key = 'q_'+q.id;
    this.setState({ q: qu })
    // this.props.setAnswerForQuestion()
    // await this.postQuestionAnswer(updatedQuestion)
    // this.setState({ submitted: true, newAnswer: q})
  }
  render() {
    const {q, idx} = this.state
    const metaData=  q.flagIssue && <Label as='a' color='red' tag>
          Report Issues: <span> {q.flagIssue}</span>
        </Label>
    return (
      <Card className="qCard" key={idx} style={{width:'100%'}}>
         <CardLeftPanel questionNumber={idx} title={q.title} metaData={metaData}/>

       {  !this.state.submitted && !(q.undeleted) &&
         <Fragment>
          <Form


         >


              {q.answers && q.answers.map((ans, ansIdx) => {
                return <Form.TextArea
                  value={q.answers[ansIdx]}
                  placeholder='Tell us more about it...'
                  onChange={(e, { value }) => this.handleUpdatedAnswerChange(e, { value }, q, ansIdx)}
                  />

              }) }
              <div>
               {false &&<Icon name='attach' />}
               {false && <FileUpload/>}
             </div>
            </Form>

                      <Card.Content extra>
                        <div className='ui two buttons'>
                          <Button basic color='green' onClick={(e, { value }) => this.handleSubmit(e, { value }, q)}>
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

                {this.state['newAnswers'+q.id] && this.state['newAnswers'+q.id].map( (answer, idx) => {
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
    // unansweredQuestions: state.questionBoard.unansweredQuestions

  }
}

const mapDispatchToProps= (dispatch) => bindActionCreators({
 deleteQuestion
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AuthProvider(AnswerForm))
