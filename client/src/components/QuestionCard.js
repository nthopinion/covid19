import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AuthProvider from '../AuthProvider';

import { clearQuestion, updateFocusedQuestionAnswers } from '../actions';
import config from '../config';

import AnswerCard from './AnswerCard';
import AnswerSubmission from './AnswerSubmission';
import TimeLocation from './TimeLocation';

import '../styles/QuestionCard.css';

class QuestionCard extends Component {
  // constructor() {
  //   super ()

  componentDidMount() {
    const { question } = this.props;
    if (!question || !question.id) {
      this.props.history.push('/bIiOOIIqgwEXwUU3SaD0F9');
    }
  }

  // }
  componentWillUnmount() {
    this.props.clearQuestion();
  }

  backToPhysicianView = () => {
    this.props.history.push('/bIiOOIIqgwEXwUU3SaD0F9');
  };

  updateAnswer = async (answer) => {
    const question = { ...this.props.question, answers: [answer] };
    // question.answers = [answer];

    const endpoint = 'updateQuestion';
    await fetch(`${config.domainURL}/api/${endpoint}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...question }),
    }).catch((err) => console.error(err));

    // update the focused question
    this.props.updateAnswers(question.answers);

    // update the questions list
  };

  render() {
    const { question } = this.props;
    const numAnswers = (question.answers || []).length;
    return (
      <div className="question-card">
        <div className="question-ask-container">
          <div className="question-ask">
            <div className="qa-icon">Q.</div>
            <div className="question-ask-info">
              <div className="question">{question.title}</div>
              <div className="ask-info-container">
                <TimeLocation
                  // name={'Anonymous'}
                  time={question.date}
                  // location={testData.asker.location}
                />
              </div>
              <div className="question-tag-container">
                {(question.tags || []).map((tag, i) => (
                  <div key={i} className="question-tag">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="question-answer-container">
          {(question.answers || [''])[0].length ? (
            (question.answers || []).map((answer, i) => (
              <AnswerCard
                answer={answer}
                key={i}
                last={i + 1 === numAnswers}
                links={i === 0 ? question.links : null}
                back={this.backToPhysicianView}
                sources={i === 0 ? question.sources : null}
                youtubeLinks={i === 0 ? question.youtubeLinks : null}
              />
            ))
          ) : (
            <AnswerSubmission
              updateAnswer={this.updateAnswer}
              back={this.backToPhysicianView}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    question: state.focusedQuestion,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      clearQuestion,
      updateAnswers: updateFocusedQuestionAnswers,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthProvider(QuestionCard));
