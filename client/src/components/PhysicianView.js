import React, { Component, createRef } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Menu, Button, Form, Message, Card, Grid, Icon } from 'semantic-ui-react'
import AuthProvider from "../AuthProvider";
import { fetchUnansweredQuestions, deleteQuestion, fetchQuestions } from '../actions'
import AnswerForm from '../components/AnswerForm'

import CardLeftPanel from '../components/CardLeftPanel'
import '../styles/QuestionBoard.css'
import config from '../config'


class PhysicianView extends Component {
  state={showUnaswered: true}
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch } = this.props
    this.props.fetchUnansweredQuestions()
    this.props.fetchQuestions()

  }

  handleToggleView(showUnaswered) {
    this.setState({showUnaswered: showUnaswered})
  }

  render() {
    console.log('this.props.unansweredQuestions', this.props.unansweredQuestions)
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
        <div className='buttonGroupCustom'>
        {this.props.account &&<Button.Group>
          <Button basic color='blue' onClick={() => this.handleToggleView(true)} active={this.state.showUnaswered}>
            Unanswered Questions
          </Button>
          <Button basic color='green' onClick={() => this.handleToggleView(false)} active={!this.state.showUnaswered}>
            Answered Questions
          </Button>
        </Button.Group>}
        </div>
         <section className="container">
         { !this.props.account && (
             <Message warning>
                  <Message.Header>You must register/signin before you can do that!</Message.Header>
                  <p></p>
                  <Button
                    active={true}
                    onClick={this.props.onSignIn}
                  >Signin
                  </Button>
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
         { this.state.showUnaswered && this.props.account && this.props.unansweredQuestions &&
           this.props.unansweredQuestions.map((q, idx) => <AnswerForm q={q} idx={idx} showUnaswered={this.state.showUnaswered}/>
         )}

         { !this.state.showUnaswered && this.props.account && this.props.questions &&
           this.props.questions.map((q, idx) => <AnswerForm q={q} idx={idx} showUnaswered={this.state.showUnaswered}/>
         )}
         </Grid.Column>
       </Grid>
         </div>
     </div>
  )
  }
}


const mapStateToProps = (state) => {
  console.log(state)
  return {
    unansweredQuestions: state.questionBoard.unansweredQuestions,
    questions: state.questionBoard.questions
  }
}

const mapDispatchToProps= (dispatch) => bindActionCreators({
fetchUnansweredQuestions, deleteQuestion, fetchQuestions
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AuthProvider(PhysicianView))
