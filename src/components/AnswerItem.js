import React from 'react'
import { List } from 'semantic-ui-react'

const SearchBar = (props) => (
  <List.Item>
    <List.Icon name='marker' />
    <List.Content>
      <List.Description>
        <span className='qAnswer'>{props.answer}</span>
      </List.Description>
    </List.Content>
  </List.Item>
)
export default SearchBar
