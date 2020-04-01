import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Form,
  Message,
  Card,
  Icon,
  List,
  Label,
} from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import AuthProvider from '../AuthProvider';
import { deleteQuestion, setQuestion } from '../actions';
import AnswerItem from './AnswerItem';
import FileUpload from './FileUpload';
import CardLeftPanel from './CardLeftPanel';
import '../styles/QuestionBoard.css';
import config from '../config';

class AnswerForm extends Component {
  constructor(props) {
    super(props);
    const newQ = { ...props.q };
    this.state = { q: newQ, idx: props.idx };
  }

  postQuestionAnswer = (question) => {
    const endpoint = this.props.showUnaswered
      ? 'updateQuestion'
      : 'editAnswers';
    return fetch(`${config.domainURL}/api/${endpoint}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...question }),
    })
      .then((response) => response)
      .catch((error) => console.log(error));
  };

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps) {
    if (nextProps.q !== this.props.q) {
      // Perform some operation
      this.setState({ q: nextProps.q });
      // this.classMethod();
    }
    if (nextProps.idx !== this.props.idx) {
      // Perform some operation
      this.setState({ idx: nextProps.idx });
      // this.classMethod();
    }
  }

  handleDeleteQuestion = (qId, idx) => {
    const isUnanswered = this.props.showUnaswered;

    this.props.deleteQuestion(qId, idx, isUnanswered);
  };

  handleExpandQuestion = (question) => {
    const { history, setThisQuestion } = this.props;

    setThisQuestion(question);

    history.push('/jakeTest');
    // console.log(this.props)
  };

  handleSubmit = async (e, value, q) => {
    const updatedQuestion = { ...q };
    updatedQuestion.answers = updatedQuestion.answers.filter(
      (a) => a && a.length > 0
    );

    await this.postQuestionAnswer(updatedQuestion);
    this.setState({
      submitted: true,
      [`newAnswers${q.id}`]: updatedQuestion.answers,
    });
  };

  handleChange = (e, { value }, q) => {
    const key = `q_${q.id}`;
    this.setState({ [key]: value });
  };

  handleUpdatedAnswerChange = (e, { value }, q, ansIdx) => {
    const qu = { ...q };
    qu.answers[ansIdx] = value;
    // const key = 'q_'+q.id;
    this.setState({ q: qu });
    // this.props.setAnswerForQuestion()
    // await this.postQuestionAnswer(updatedQuestion)
    // this.setState({ submitted: true, newAnswer: q})
  };

  render() {
    const { q, idx } = this.state;
    const metaData = q.flagIssue && (
      <Label as="a" color="red" tag>
        Report Issues: <span> {q.flagIssue}</span>
      </Label>
    );
    return (
      <Card className="qCard" key={idx} style={{ width: '100%' }}>
        <CardLeftPanel
          questionNumber={idx}
          title={q.title}
          metaData={metaData}
        />

        {!this.state.submitted && !q.undeleted && (
          <>
            <Form>
              {q.answers &&
                q.answers.map((ans, ansIdx) => {
                  return (
                    <Form.TextArea
                      value={q.answers[ansIdx]}
                      placeholder="Tell us more about it..."
                      onChange={(e, { value }) =>
                        this.handleUpdatedAnswerChange(e, { value }, q, ansIdx)
                      }
                    />
                  );
                })}
              <div>
                {false && <Icon name="attach" />}
                {false && <FileUpload />}
              </div>
            </Form>

            <Card.Content extra>
              <div className="ui three buttons">
                <Button
                  basic
                  color="green"
                  onClick={(e, { value }) => this.handleSubmit(e, { value }, q)}
                >
                  Submit
                </Button>
                <Button
                  basic
                  color="red"
                  onClick={() => this.handleDeleteQuestion(q.id, idx)}
                >
                  Delete
                </Button>
                <Button
                  basic
                  color="blue"
                  onClick={() => this.handleExpandQuestion(q)}
                >
                  Expand
                </Button>
              </div>
            </Card.Content>
          </>
        )}

        {q.undeleted && (
          <Message positive>
            <Message.Header>Deleted</Message.Header>
          </Message>
        )}
        {this.state.submitted && (
          <Message positive>
            <Message.Header>Thank you!</Message.Header>
            <List>
              {this.state[`newAnswers${q.id}`] &&
                this.state[`newAnswers${q.id}`].map((answer, index) => {
                  return <AnswerItem answer={answer} key={index} />;
                })}
            </List>
          </Message>
        )}
      </Card>
    );
  }
}

const mapStateToProps = () => {
  return {
    // unansweredQuestions: state.questionBoard.unansweredQuestions
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      deleteQuestion,
      setThisQuestion: setQuestion,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthProvider(AnswerForm));
