import React, { Component } from 'react';
import { Modal, Card, List, Button } from 'semantic-ui-react';
import AnswerItem from './AnswerItem';
import CardLeftPanel from './CardLeftPanel';

import '../styles/QuestionBoard.css';
import config from '../config';

export default class QuestionBoard extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, reportQuestion: null };
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
        console.log(error);
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
                      />
                    );
                  })}
                </List>
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
