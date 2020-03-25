import React, { Component } from 'react';
import { Button, Form, Icon, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import { postQuestion } from '../actions';
import '../styles/AskQuestionForm.css';

class AddQuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  handleSubmit = () => {
    const { dispatch } = this.props;
    dispatch(postQuestion(this.state.value));
    this.setState({ value: '' });
  };

  handleChange = (e, { value }) => this.setState({ value });

  closeModal = () => {
    this.setState({ showModal: false });
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  render() {
    const { showModal } = this.state;
    const { t } = this.props;
    const AskQuestionButton = (
      <Button onClick={this.openModal} color="blue" className="ask-button">
        {t('app:askAQuestion')}
      </Button>
    );

    return (
      <Modal
        trigger={AskQuestionButton}
        onClose={this.closeModal}
        open={showModal}
      >
        <Modal.Header>
          <span>New Question</span>
          <Icon
            circular
            inverted
            size="small"
            color="blue"
            name="close"
            onClick={this.closeModal}
          />
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={this.handleSubmit}>
              <Form.Input fluid label="Title" />
              <Form.TextArea
                label="Description"
                value={this.state.value}
                onChange={this.handleChange}
              />
              <div className="flex-container">
                <Form.Button type="submit" color="blue">
                  Submit
                </Form.Button>
              </div>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.questionBoard,
  };
}

export default withTranslation()(connect(mapStateToProps)(AddQuestionForm));
