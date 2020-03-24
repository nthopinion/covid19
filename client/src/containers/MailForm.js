import React, { Component } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';

import '../styles/PatientBoard.css';

class MailForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      success: false,
    };
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  // eslint-disable-next-line react/no-unused-state
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
