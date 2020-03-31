import React, { Component } from 'react';

import '../styles/QuestionCard.css';
import AnswerCard from './AnswerCard';
import TimeLocation from './TimeLocation';

const testData = {
  asker: {
    name: 'Anna',
    location: 'Seattle',
  },
  title: 'Should I wear a face mask to protect myself against coronavirus?',
  time: 1585581957000,
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
      time: 1585236357000,
      text:
        'Nunc vitae velit est. Cras pretium tincidunt libero in vehicula. In a lectus commodo, molestie felis ut, laoreet magna. Quisque non justo ut lectus efficitur sagittis quis sed nunc. Nunc ac faucibus est. Quisque eleifend molestie tristique. Cras dictum, leo in tincidunt elementum, ligula quam rutrum dolor, eu dignissim dolor ante sit amet magna. In vestibulum nisi sem, at suscipit arcu congue vitae. Curabitur dapibus dui convallis urna vestibulum congue.',
      links: [],
      sources: [],
    },
  ],
};

// 1585236357

export default class QuestionCard extends Component {
  // constructor() {
  //   super ()

  // }

  render() {
    return (
      <div className="question-card">
        <div className="question-ask-container">
          <div className="question-ask">
            <div className="asker-icon" />
            <div className="question-ask-info">
              <div className="question">{testData.title}</div>
              <div className="ask-info-container">
                <TimeLocation
                  name={testData.asker.name || 'Anonymous'}
                  time={testData.time}
                  location={testData.asker.location}
                />
              </div>
              <div className="question-tag-container">
                {testData.tags.map((tag, i) => (
                  <div key={i} className="question-tag">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="question-answer-container">
          {testData.answers.map((answer, i) => (
            <AnswerCard answer={answer} key={i} />
          ))}
        </div>
      </div>
    );
  }
}
