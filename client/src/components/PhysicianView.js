import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Menu, Button, Message, Grid } from 'semantic-ui-react';

import '../styles/QuestionBoard.css';
import AuthProvider from '../AuthProvider';
import {
  fetchUnansweredQuestions,
  deleteQuestion,
  fetchQuestions,
} from '../actions';

import PhysicianLogin from './PhysicianLogin';
import AnswerForm from './AnswerForm';
import NavMenu from './NavLink';

class PhysicianView extends Component {
  constructor(props) {
    super(props);
    this.state = { showUnaswered: true };
  }

  componentDidMount() {
    this.props.fetchUnansweredQuestions();
    this.props.fetchQuestions();
  }

  handleToggleView(showUnaswered) {
    this.setState({ showUnaswered });
  }

  render() {
    return !this.props.account ? (
      <PhysicianLogin onSignIn={this.props.onSignIn} />
    ) : (
      <>
        <NavMenu
          account={this.props.account}
          onSignOut={this.props.onSignOut}
        />
        <div>
          <Menu secondary>
            <Menu.Menu position="right">
              {this.props.account && (
                <Menu.Item
                  active
                  name="logout"
                  onClick={this.props.onSignOut}
                />
              )}
            </Menu.Menu>
          </Menu>
          <div className="buttonGroupCustom">
            {this.props.account && (
              <Button.Group>
                <Button
                  basic
                  color="blue"
                  onClick={() => this.handleToggleView(true)}
                  active={this.state.showUnaswered}
                >
                  Unanswered Questions
                </Button>
                <Button
                  basic
                  color="green"
                  onClick={() => this.handleToggleView(false)}
                  active={!this.state.showUnaswered}
                >
                  Answered Questions
                </Button>
              </Button.Group>
            )}
          </div>
          <section className="container">
            {this.props.error && (
              <Message negative>
                <Message.Header>Sorry Something went wrong!</Message.Header>
                <p>{this.props.error}</p>
              </Message>
            )}
          </section>
          <section className="data" />
          <div>
            <Grid centered columns={2} stackable>
              <Grid.Column>
                {this.state.showUnaswered &&
                  this.props.account &&
                  this.props.unansweredQuestions &&
                  this.props.unansweredQuestions.map((q, idx) => (
                    <AnswerForm
                      q={q}
                      idx={idx}
                      showUnaswered={this.state.showUnaswered}
                    />
                  ))}

                {!this.state.showUnaswered &&
                  this.props.account &&
                  this.props.questions &&
                  this.props.questions.map((q, idx) => (
                    <AnswerForm
                      q={q}
                      idx={idx}
                      showUnaswered={this.state.showUnaswered}
                    />
                  ))}
              </Grid.Column>
            </Grid>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    unansweredQuestions: state.questionBoard.unansweredQuestions,
    questions: state.questionBoard.questions,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchUnansweredQuestions,
      deleteQuestion,
      fetchQuestions,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthProvider(PhysicianView));
