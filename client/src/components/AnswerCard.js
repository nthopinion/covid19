import React from 'react';
import TimeLocation from './TimeLocation';

import '../styles/AnswerCard.css';

export default function AnswerCard(props) {
  const {
    text,
    // links,
    // sources,
    time,
    user,
  } = props.answer || {};

  return (
    <div className="answer">
      <div className="answer-header">
        <div className="asker-icon" />
        <div className="answer-info">
          <div className="answer-doctor">
            {(user || {}).name || 'Anonymous'}
          </div>
          <TimeLocation time={time} location={user && user.location} />
        </div>
      </div>
      <div className="answer-body">
        <div className="answer-text">{text}</div>
      </div>
    </div>
  );
}
