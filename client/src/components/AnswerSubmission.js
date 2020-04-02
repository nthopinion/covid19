import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';

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
        <Form.Field className="answer-submit-container" control="button">
          Submit
        </Form.Field>
      </Form>
    </div>
  );
}
