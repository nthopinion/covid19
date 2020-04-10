import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';

import '../styles/AnswerSubmission.css';

export default function AnswerSubmission(props) {
  const { updateAnswer } = props;

  const [answer, setAnswer] = useState('');

  return (
    <div className="answer-submission">
      <Form onSubmit={() => updateAnswer(answer)}>
        <Form.Field
          control="textarea"
          rows="3"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <div className="answer-submit-container">
          <Button
            className="icon exit-button"
            onClick={(e) => {
              e.preventDefault();
              props.back();
            }}
          >
            <i className="icon arrow left" />
          </Button>
          <Form.Field control="button">Submit</Form.Field>
        </div>
      </Form>
    </div>
  );
}
