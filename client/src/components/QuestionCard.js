import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AuthProvider from '../AuthProvider';

import { clearQuestion } from '../actions';

import AnswerCard from './AnswerCard';
import TimeLocation from './TimeLocation';

import '../styles/QuestionCard.css';

const testData = {
  asker: {
    name: 'Anna',
    location: 'Seattle',
  },
  title: 'Should I wear a face mask to protect myself against coronavirus?',
  time: 1585236357000,
  tags: ['tag1', 'tag2'],
  answers: [
    {
      time: 1585598866000,
      text:
        'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas convallis purus vel quam congue semper. Vestibulum volutpat auctor pharetra. Proin congue vehicula nisi a posuere. Curabitur commodo arcu eu lorem fermentum, eget varius arcu aliquet. Sed in dapibus tortor, et semper velit. Sed luctus risus at urna varius scelerisque. Morbi nec mi rutrum, placerat justo sit amet, semper dui. Mauris venenatis egestas urna ac interdum. Cras at erat in sem bibendum pharetra. Vivamus in volutpat ipsum.',
      links: [],
      sources: [],
      user: {
        name: 'Ray Ng, MD',
        location: 'Los Angeles, CA, USA',
      },
    },
    {
      time: 1585675565500,
      text:
        'Nunc vitae velit est. Cras pretium tincidunt libero in vehicula. In a lectus commodo, molestie felis ut, laoreet magna. Quisque non justo ut lectus efficitur sagittis quis sed nunc. Nunc ac faucibus est. Quisque eleifend molestie tristique. Cras dictum, leo in tincidunt elementum, ligula quam rutrum dolor, eu dignissim dolor ante sit amet magna. In vestibulum nisi sem, at suscipit arcu congue vitae. Curabitur dapibus dui convallis urna vestibulum congue.',
      links: [],
      sources: [],
    },
  ],
};

// 1585236357

class QuestionCard extends Component {
  // constructor() {
  //   super ()

  componentDidMount() {
    const { question } = this.props;
    console.log(question);
    if (!question || !question.id) {
      console.log('huh');
      this.props.history.push('/bIiOOIIqgwEXwUU3SaD0F9');
    }
  }

  // }
  componentWillUnmount() {
    this.props.clearQuestion();
  }

  render() {
    console.log('questionnnnn', this.props.question);
    const { question } = this.props;
    const numAnswers = testData.answers.length;
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
          {(question.answers || []).map((answer, i) => (
            <AnswerCard
              answer={answer}
              key={i}
              last={i + 1 === numAnswers}
              links={i === 0 ? question.links : null}
              sources={i === 0 ? question.sources : null}
            />
          ))}
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
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthProvider(QuestionCard));
