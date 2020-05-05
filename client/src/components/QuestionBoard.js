import React, { Component } from 'react';
import { Modal, Card, List, Button } from 'semantic-ui-react';
import AnswerItem from './AnswerItem';
import CardLeftPanel from './CardLeftPanel';

import '../styles/QuestionBoard.css';
import config from '../config';

import LikeButton from './LikeButton';

export default class QuestionBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      reportAnswer: null,
    };
    this.handleSubmitReportIssue = this.handleSubmitReportIssue.bind(this);
  }

  handleReportAnswer = (answer) => {
    this.setState({ open: true, reportAnswer: answer });
  };

  handleReportIssue(q) {
    return () => this.setState({ open: true, reportQuestion: q });
  }

  handleSubmitReportIssue = async () => {
    await this.reportAnswerFlag(this.state.reportAnswer);
    this.setState({ open: false, reportAnswer: null });
  };

  reportAnswerFlag = (answer) => {
    return fetch(`${config.domainURL}/api/answer/report`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: answer.id }),
    })
      .then((response) => response)
      .catch(() => {
        // TODO: Handle error here.
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
                    return (
                      <AnswerItem
                        answer={answer}
                        key={index}
                        question={question}
                        handleReportAnswer={this.handleReportAnswer}
                        handleClickLike={this.props.handleClickLike}
                        handleAnswerLike={this.props.handleAnswerLike}
                      />
                    );
                  })}
                </List>
                <div className="qPanelBottom">
                  <div className="buttonGroupCustom">
                    <LikeButton
                      onClick={this.props.handleClickLike(question.id, i)}
                      likes={question.like || 0}
                    />
                    {/*                     <ShareButton question={question}/> */}
                  </div>
                </div>
              </Card>
            );
          })}
        </Card.Group>
        <Modal open={this.state.open} onClose={this.close}>
          <Modal.Header>
            Are you sure you want to report this answer?
          </Modal.Header>
          <Modal.Content>
            <p>{this.state.reportAnswer && this.state.reportAnswer.title}</p>
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
