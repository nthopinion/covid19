import React from 'react';
import TimeLocation from './TimeLocation';

import '../styles/AnswerCard.css';

export default function AnswerCard(props) {
  const { answer, last } = props;
  const user = null;

  // const {
  //   text,
  //   links,
  //   sources,
  //   time,
  //   user,
  // } = answer || {};

  return (
    <div className="answer">
      <div className="answer-header">
        <div className="qa-icon">A.</div>
        <div className="answer-info">
          <div className="answer-doctor">{(user || {}).name || 'AskCo19'}</div>
          <TimeLocation time={null} location={user && user.location} />
        </div>
      </div>
      <div className={`answer-body${last ? ' last-answer' : ''}`}>
        <div className="answer-text">{answer}</div>
      </div>
    </div>
  );
}
