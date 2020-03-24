import React, { Component, createRef } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Grid,
  Header,
  Image,
  Rail,
  Ref,
  Segment,
  Sticky,
  Item,
  Search,
  Message,
  Form,
  Button,
} from 'semantic-ui-react';
import {
  fetchQuestions,
  setLoading,
  searchQuestions,
  resetSearchResult,
  setSearchTerm,
  postQuestion,
  clickLikeQuestion,
} from '../actions';
import QuestionBoard from '../components/QuestionBoard';
import SearchBar from '../components/SearchBar';
import '../styles/PatientBoard.css';
import AddQuestionForm from './AddQuestionForm';
import FloatingMenu from '../components/FloatingMenu';
import Links from '../componnets/Links';

class MailForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
    };
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => this.setState({ email: '', name: '' });

  render() {
    return (
      <Segment
        raised
        className={this.props.isMobile ? 'mailForm_mobile' : 'mailForm'}
      >
        <Form
          target="_blank"
          action="https://covid19webapp.us19.list-manage.com/subscribe/post?u=6df180a9a54cb559de205f0a1&amp;id=b0e6458aa3"
          method="post"
        >
          <Form.Input
            name="EMAIL"
            placeholder="joe@gmail.com email for Subscription"
            onChange={this.handleChange}
          />

          <Button>Submit</Button>
        </Form>
      </Segment>
    );
  }
}

export default MailForm;
