import React, { Component } from 'react';
import { ReactTinyLink } from 'react-tiny-link';
import { Modal, Card, List, Image, Label, Button } from 'semantic-ui-react';
import AnswerItem from './AnswerItem';
import CardLeftPanel from './CardLeftPanel';

import '../styles/QuestionBoard.css';
import config from '../config';
import LikeButton from './LikeButton';
import FlagButton from './FlagButton';
// import ShareButton from './ShareButton';

export default class QuestionBoard extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, reportQuestion: null };
    this.handleSubmitReportIssue = this.handleSubmitReportIssue.bind(this);
  }

  handleReportIssue(q) {
    return () => this.setState({ open: true, reportQuestion: q });
  }

  async handleSubmitReportIssue() {
    await this.reportQuestionFlag(this.state.reportQuestion);
    this.setState({ open: false, reportQuestion: null });
  }

  reportQuestionFlag = (question) => {
    return fetch(`${config.domainURL}/api/question/report`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: question.id }),
    })
      .then((response) => response)
      .catch((error) => {
        // eslint-disable-next-line
        console.log(error)
      });
  };

  close = () => this.setState({ open: false });

  render() {
    const { results } = this.props;

    return (
      <div className="container">
        <Card.Group>
          {results.map((question, i) => {
            if (!question.answers) {
              return null;
            }

            return (
              <Card fluid className="qCard" key={i} id={`q_${question.id}`}>
                <CardLeftPanel title={question.title} questionNumber={i} />

                <List>
                  {question.answers.map((answer, index) => {
                    return <AnswerItem answer={answer} key={index} />;
                  })}

                  {question.images &&
                    question.images.map((image, index) => (
                      <Image
                        src={image}
                        key={index}
                        fluid
                        className="answer-image"
                      />
                    ))}

                  {question.links &&
                    question.links.map((link, index) => (
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
                  {question.sources &&
                    question.sources.map((source, index) => (
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
                </List>

                {question.youtubeLinks &&
                  question.youtubeLinks.map((y, index) => {
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
                <div className="qPanelBottom">
                  <div className="qTag">
                    {question.tags &&
                      question.tags.map((tag, index) => {
                        return (
                          <Label color="blue" key={index}>
                            {tag}
                          </Label>
                        );
                      })}
                  </div>

                  <div>
                    {/* <a color='facebook' href="https://twitter.com/intent/tweet?text=My%20aura%20is%20blue.%20Discover%20your%20aura%20at%20http://www.carolynmcneillie.com/colours%20pic.twitter.com/E3SdsiIqPr%20@carolynalive" target="_blank">
                <Icon name='facebook'></Icon>

                </a> */}
                    <div className="buttonGroupCustom">
                      <FlagButton
                        color="red"
                        basic
                        title="report an issue"
                        onClick={this.handleReportIssue(question)}
                      />
                      <LikeButton
                        onClick={this.props.handleClickLike(question.id, i)}
                        likes={question.like || 0}
                      />
                      {/* <ShareButton /> */}
                      {/* <Button animated="vertical" color="twitter"> */}
                      {/*  <a */}
                      {/*    style={{ color: 'white' }} */}
                      {/*    href={`https://twitter.com/intent/tweet?text=${ */}
                      {/*      question.title */}
                      {/*    }%20Answer:%20${ */}
                      {/*      question.answers && */}
                      {/*      question.answers.length > 0 && */}
                      {/*      question.answers[0] */}
                      {/*        .split(' ') */}
                      {/*        .slice(0, 10) */}
                      {/*        .join(' ') */}
                      {/*    }...%20at%20${`${config.domainURL}?qid=${question.id}`}%20@thenthopinion`} */}
                      {/*    target="_blank" */}
                      {/*    rel="noopener noreferrer" */}
                      {/*  > */}
                      {/*    <Button.Content visible> */}
                      {/*      <Icon name="twitter" /> Tweet */}
                      {/*    </Button.Content> */}
                      {/*  </a> */}
                      {/* </Button> */}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </Card.Group>
        <Modal open={this.state.open} onClose={this.close}>
          <Modal.Header>
            Are you sure you want to report this question?
          </Modal.Header>
          <Modal.Content>
            <p>{this.state.reportQuestion?.title}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close} negative>
              No
            </Button>
            <Button
              positive
              onClick={this.handleSubmitReportIssue}
              labelPosition="right"
              icon="checkmark"
              content="Yes"
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
