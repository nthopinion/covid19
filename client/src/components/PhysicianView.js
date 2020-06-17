/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable no-shadow */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Trans, withTranslation } from 'react-i18next';
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
import Footer from './Footer';

const PhysicianView = (props) => {
  const [isMessageVisible, setIsMessageVisible] = useState(true);
  const [isUnansweredShown, setIsUnansweredShown] = useState(true);

  const { fetchUnansweredQuestions, fetchQuestions } = props;

  useEffect(() => {
    fetchUnansweredQuestions();
    fetchQuestions();
  }, [fetchUnansweredQuestions, fetchQuestions]);

  const handleToggleView = (showUnanswered) => {
    setIsUnansweredShown(showUnanswered);
  };

  const handleDismissMessage = () => {
    setIsMessageVisible(false);
  };

  return !props.authuser ? (
    <PhysicianLogin onSignIn={props.onSignIn} />
  ) : (
    <>
      <NavMenu
        account={props.account}
        onSignOut={props.onSignOut}
        idToken={props.idToken}
      />

      <Grid centered columns={2} stackable>
        <Grid.Column>
          {props.authuser.profilestatus === 'level 0' ? (
            <Message color="yellow">
              <Message.Header>
                {props.t('physicianView:welcome', {
                  returnObjects: true,
                  userFullName: props.authuser.fullname,
                })}
              </Message.Header>
              <Trans i18nKey="physicianView:unverifiedUserMessage">
                <a
                  href="//www.askco19.com/j-2-lightbox.html"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              </Trans>
            </Message>
          ) : (
            isMessageVisible && (
              <Message color="green" onDismiss={() => handleDismissMessage()}>
                {props.t('physicianView:welcome')} {props.authuser.fullname}
              </Message>
            )
          )}
        </Grid.Column>
      </Grid>

      <div className="physician-view-container">
        <Menu secondary style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="right menu" style={{ margin: '1rem 0' }}>
            <a
              href="https://ai-passion.appspot.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="active item"
            >
              {props.t('physicianView:buttons.televideo')}
            </a>
          </div>
          <Menu.Menu position="right">
            {props.account && (
              <Menu.Item
                active
                name={props.t('physicianView:buttons.logOut')}
                onClick={props.onSignOut}
              />
            )}
          </Menu.Menu>
        </Menu>
        <div className="buttonGroupCustom">
          {props.account && (
            <Button.Group>
              <Button
                basic
                color="blue"
                onClick={() => handleToggleView(true)}
                active={isUnansweredShown}
              >
                {props.t('physicianView:buttons.unansweredQuestions')}
              </Button>
              <Button
                basic
                color="green"
                onClick={() => handleToggleView(false)}
                active={!isUnansweredShown}
              >
                {props.t('physicianView:buttons.answeredQuestions')}
              </Button>
            </Button.Group>
          )}
        </div>
        <section className="container">
          {props.error && (
            <Message negative>
              <Message.Header></Message.Header>
              <p>{props.error}</p>
            </Message>
          )}
        </section>
        <section className="data" />
        <div>
          <Grid centered columns={2} stackable>
            <Grid.Column>
              {isUnansweredShown &&
                props.account &&
                props.unansweredQuestions &&
                props.unansweredQuestions.map((q, idx) => (
                  <AnswerForm
                    history={props.history}
                    userToken={props.idToken}
                    profileStatus={props.authuser.profilestatus}
                    q={q}
                    idx={idx}
                    showUnanswered={isUnansweredShown}
                  />
                ))}

              {!isUnansweredShown &&
                props.account &&
                props.questions &&
                props.questions.map((q, idx) => (
                  <AnswerForm
                    history={props.history}
                    userToken={props.idToken}
                    profileStatus={props.authuser.profilestatus}
                    q={q}
                    idx={idx}
                    showUnanswered={isUnansweredShown}
                  />
                ))}
            </Grid.Column>
          </Grid>
        </div>
        <Footer />
      </div>
    </>
  );
};

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

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(AuthProvider(PhysicianView))
);
