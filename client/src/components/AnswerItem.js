/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { ReactTinyLink } from 'react-tiny-link';
import { List, Image, Label, Button, Icon } from 'semantic-ui-react';

import avatar from '../assets/images/askco-avatar.svg';

import config from '../config';

const PREVIEW_CHARS = 200;

const AnswerItem = (props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <List.Item>
      <List.Content>
        <div className="answerTitle">
          <div className="answeredByName">
            <span>A.</span>
            {props.answeredBy || 'AskCo19'}
          </div>
          <img
            src={props.answerByAvatarUrl || avatar}
            className="answeredByIcon"
            alt="answer avatar"
          />
        </div>
        <List.Description>
          {props.answer.text.length > PREVIEW_CHARS ? (
            <>
              <span className="qAnswer">
                {expanded
                  ? props.answer.text
                  : `${props.answer.text.substring(0, PREVIEW_CHARS)}...`}
              </span>
              <br />
              <a onClick={() => setExpanded(!expanded)}>
                Show {expanded ? 'less' : 'more'}
              </a>
            </>
          ) : (
            <>
              <span className="qAnswer">{props.answer.text}</span>
            </>
          )}
        </List.Description>

        {props.answer.images &&
          props.answer.images.map((image, index) => (
            <Image src={image} key={index} fluid className="answer-image" />
          ))}

        {props.answer.links &&
          props.answer.links.map((link, index) => (
            <List.Item key={index}>
              <List.Icon name="linkify" />
              <List.Content>
                {link && (
                  <ReactTinyLink
                    cardSize="small"
                    showGraphic
                    maxLine={2}
                    minLine={1}
                    url={link}
                    proxyUrl={config.corsProxyUrl}
                  />
                )}
              </List.Content>
            </List.Item>
          ))}

        {props.answer.sources &&
          props.answer.sources.map((source, index) => (
            <List.Item key={index}>
              <List.Icon name="linkify" />
              <List.Content>
                {source && (
                  <ReactTinyLink
                    cardSize="small"
                    showGraphic
                    maxLine={2}
                    minLine={1}
                    url={source}
                    proxyUrl={config.corsProxyUrl}
                  />
                )}
              </List.Content>
            </List.Item>
          ))}

        {props.youtubeLinks &&
          props.youtubeLinks.map((y, index) => {
            const videoSrc = `https://www.youtube.com/embed/${y}?autoplay=false`;

            return (
              y && (
                <iframe
                  title={videoSrc}
                  className="player"
                  type="text/html"
                  width="100%"
                  height="400px"
                  src={videoSrc}
                  key={index}
                  frameBorder="0"
                />
              )
            );
          })}

        <div className="answer-metadata">
          <div>Answered By: {props.answer.firstAnsweredBy.name}</div>
          <div>
            Posted:{' '}
            {new Date(props.answer.firstAnsweredOn).toLocaleDateString()}
          </div>
          <div>
            Edited: {new Date(props.answer.lastAnsweredOn).toLocaleDateString()}
          </div>
        </div>

        <div className="qPanelBottom">
          <div className="qTag">
            {props.tags &&
              props.tags.map((tag, index) => {
                return (
                  <Label color="blue" key={index}>
                    {tag}
                  </Label>
                );
              })}
          </div>

          <div>
            <div className="qPanelBottom-buttons-wrapper">
              <Button as="div" labelPosition="right">
                <Button
                  color="red"
                  onClick={() => props.handleClickLike(props.id)}
                >
                  <Icon name="heart" />
                  Like
                </Button>
                <Label as="a" basic color="red" pointing="left">
                  {props.like || 0}
                </Label>
              </Button>
              <Button animated="vertical" color="twitter">
                <a
                  style={{ color: 'white' }}
                  href={`https://twitter.com/intent/tweet?text=${
                    props.title
                  }%20Answer:%20${
                    props.answer &&
                    props.answer.text.length > 0 &&
                    props.answer.text.slice(0, 10)
                  }...%20at%20${`${config.domainURL}?qid=${props.answer.id}`}%20@thenthopinion`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button.Content visible>
                    <Icon name="twitter" /> Tweet
                  </Button.Content>
                </a>
              </Button>
              <Button
                icon="flag"
                color="red"
                basic
                title="report an issue"
                onClick={() => props.handleReportIssue(props.answer)}
              />
            </div>
          </div>
        </div>
      </List.Content>
    </List.Item>
  );
};
export default AnswerItem;
