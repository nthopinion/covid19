import React, { Component, createRef } from 'react'
import { connect } from 'react-redux'
import { Menu, Button, Form, Message, Card, Grid, Icon } from 'semantic-ui-react'
import AuthProvider from "../AuthProvider";
import { fetchUnansweredQuestions } from '../actions'

import CardLeftPanel from '../components/CardLeftPanel'
import '../styles/QuestionBoard.css'


class PhysicianView extends Component {
  state={}
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchUnansweredQuestions())

  }

  handleSubmit = (e, { value }) => {
    const { dispatch } = this.props
    // dispatch(fetchUnansweredQuestions(this.state.value))
    // this.setState({ value: '' })
  }
  handleChange = (e, { value }) => this.setState({ value })
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
                          <Form >
                               <Form.TextArea
                               placeholder='Tell us more about it...'

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
