import React, { Component, createRef } from 'react'
import { connect } from 'react-redux'
import { Menu, Button, Form, Message, Card, Grid, Icon } from 'semantic-ui-react'
import AuthProvider from "../AuthProvider";
import { fetchUnansweredQuestions } from '../actions'

import CardLeftPanel from '../components/CardLeftPanel'
import '../styles/QuestionBoard.css'
import config from '../config'


class PhysicianView extends Component {
  state={}
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchUnansweredQuestions())

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
    // dispatch(fetchUnansweredQuestions(this.state.value))
    // this.setState({ value: '' })
  }
  handleChange = (e, { value }, q) => {
    const key = 'q_'+q.id;
    console.log('key', key, this.state)
    this.setState({ [key]: value })
}
  handleItemClick = (e, { value }) => console.log('click')
  render() {
console.log(this.props)
    return (
      <div>

      <Menu secondary>

        <Menu.Menu position='right'>

          {this.props.account && (
            <Menu.Item
              active={true}
              name='logout'
              onClick={this.props.onSignOut}
            />
          )}
        </Menu.Menu>
      </Menu>

                     <section className="container">
                     {!this.props.account && (


                         <Message warning>
                              <Message.Header>You must register/signin before you can do that!</Message.Header>
                              <p></p>
                              <Button
                                active={true}
                                onClick={this.props.onSignIn}
                              >Signin </Button>
                      </Message>
                     )}


                         {this.props.error && (
                           <Message negative>
                             <Message.Header>Sorry Something went wrong!</Message.Header>
                             <p>{this.props.error}</p>
                           </Message>
                         )}
                     </section>
                     <section className="data">


                     </section>
                     <div>
                     <Grid centered columns={2} stackable>
                        <Grid.Column>
                     { this.props.account && this.props.unansweredQuestions &&
                       this.props.unansweredQuestions.map((q, idx) =>
                       <Card className="qCard" key={idx} style={{width:'100%'}}>
                          <CardLeftPanel questionNumber={idx} title={q.title}/>
                          <Form
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

                       </Card>

                     )}
                     </Grid.Column>
                   </Grid>
                     </div>
                 </div>
    )
  }
}


function mapStateToProps(state) {
  // console.log(state)
  return {
    unansweredQuestions: state.questionBoard.unansweredQuestions
  }
}

export default connect(mapStateToProps)(AuthProvider(PhysicianView))
