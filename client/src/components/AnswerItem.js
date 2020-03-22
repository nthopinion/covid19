import React, { useState } from 'react'
import { List } from 'semantic-ui-react'

const PREVIEW_CHARS = 200

const AnswerItem = (props) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <List.Item>
      <List.Icon name='marker' />
      <List.Content>
        <List.Description>
          { expanded 
          ? 
            <>
              <span className='qAnswer'>{props.answer}</span>
              <br/>
              <a onClick={() => setExpanded(false)}>Show less</a>
            </>
          : 
            <>
              <span className='qAnswer'>
                {props.answer.substring(0, PREVIEW_CHARS)}
                {props.answer.length > PREVIEW_CHARS ? '...' : ''}
              </span>
              <br/>
              <a onClick={() => setExpanded(true)}>Show more</a>
            </>
          }
        </List.Description>
      </List.Content>
    </List.Item>
  )
}
export default AnswerItem
