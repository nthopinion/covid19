/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { ReactTinyLink } from 'react-tiny-link';
import { List, Image, Label } from 'semantic-ui-react';

import LikeButton from './LikeButton';
import FlagButton from './FlagButton';
import TelevideoButton from './TelevideoButton';
import ShareButton from './ShareButton';

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
                    loadSecureUrl
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
                    loadSecureUrl
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
          <div>
            Answered By{' '}
            <span className="bold">
              {props.answer.firstAnsweredBy &&
                props.answer.firstAnsweredBy.name}{' '}
            </span>
            on{' '}
            <span className="bold">
              {new Date(props.answer.firstAnsweredOn * 1000)
                .toDateString()
                .substring(4)}
            </span>
          </div>
          {props.answer.lastAnsweredOn !== props.answer.firstAnsweredOn && (
            <div>
              Last Edited by{' '}
              <span className="bold">{props.answer.lastAnsweredBy.name}</span>{' '}
              on{' '}
              <span className="bold">
                {new Date(props.answer.lastAnsweredOn * 1000)
                  .toDateString()
                  .substring(4)}
              </span>
            </div>
          )}
        </div>

        <div className="qPanelBottom">
          <div className="qTag">
            {props.answer.tags &&
              props.answer.tags.map((tag, index) => {
                return (
                  <Label color="blue" key={index}>
                    {tag}
                  </Label>
                );
              })}
          </div>
          <div>
            <div className="buttonGroupCustom">
              <TelevideoButton />
              <FlagButton
                selected={props.answer.id === props.selected ? 1 : 0}
                color="red"
                basic
                title="report an issue"
                onClick={() => props.handleReportAnswer(props.answer)}
              />
              <LikeButton
                onClick={() =>
                  props.handleAnswerLike(props.question.id, props.answer.id)
                }
                likes={props.answer.like || 0}
              />
              <ShareButton question={props.question} answer={props.answer} />
            </div>
          </div>
        </div>
      </List.Content>
    </List.Item>
  );
};
export default AnswerItem;
