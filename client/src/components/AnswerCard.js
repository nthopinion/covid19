import React from 'react';
import { Button } from 'semantic-ui-react';

import { ReactTinyLink } from 'react-tiny-link';
import TimeLocation from './TimeLocation';
import config from '../config';

import '../styles/AnswerCard.css';

export default function AnswerCard(props) {
  const { answer, last, sources, youtubeLinks } = props;
  const user = null;
  // const {
  //   text,
  //   links,
  //   sources,
  //   time,
  //   user,
  // } = answer || {};

  // long arrow alternate left

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
        {sources && sources.length ? (
          <div className="answer-source-container">
            {sources.map((source, i) => (
              <AnswerSource key={i} source={source} />
            ))}
          </div>
        ) : (
          ''
        )}
        {youtubeLinks && youtubeLinks.length ? (
          <div className="answer-youtube-container">
            {youtubeLinks.map((youtubeLink, i) => (
              <AnswerYoutubeLink youtubeLink={youtubeLink} key={i} />
            ))}
          </div>
        ) : (
          ''
        )}

        {last ? (
          <div className="exit-row">
            <Button className="icon exit-button" onClick={props.back}>
              <i className="icon arrow left" />
            </Button>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

function AnswerSource(props) {
  const link = props.source;

  return (
    <div className="answer-source">
      <i className="linkify icon" />
      <ReactTinyLink
        cardSize="small"
        showGraphic
        maxLine={2}
        minLine={1}
        url={link}
        proxyUrl={config.corsProxyUrl}
      />
    </div>
  );
}

function AnswerYoutubeLink(props) {
  const { youtubeLink } = props;

  const videoSrc = `https://www.youtube.com/embed/${youtubeLink}?autoplay=false`;

  return (
    <div className="answer-youtube">
      <iframe
        title={videoSrc}
        className="player"
        type="text/html"
        width="100%"
        height="400px"
        src={videoSrc}
        frameBorder="0"
      />
    </div>
  );
}
