import React, { Component } from 'react';

import '../styles/QuestionCard.css';

const testData = {
  asker: {
    name: 'Anna',
    location: 'Seattle',
  },
  title: 'Should I wear a face mask to protect myself against coronavirus?',
  time: 1585581957,
  tags: ['tag1', 'tag2'],
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
                <div className="ask-info">
                  {testData.asker.name
                    ? `${testData.asker.name} `
                    : 'Anonymous'}
                </div>
                {testData.time ? (
                  <div className="ask-info">
                    <i className="clock outline icon" />
                    <div> {testData.time}</div>
                  </div>
                ) : (
                  ''
                )}

                {testData.asker.location ? (
                  <div className="ask-info">
                    <i className="map marker icon" />
                    <div> {testData.asker.location}</div>
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div className="question-tag-container">
                {testData.tags.map((tag) => (
                  <div className="question-tag">{tag}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
