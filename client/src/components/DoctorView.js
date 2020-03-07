import React from 'react'
import { List } from 'semantic-ui-react'

const DoctorView = (props) => (
  <List.Item>
    <List.Icon name='marker' />
    <List.Content>
      <List.Description>
        <span className='qAnswer'>DoctorView</span>
      </List.Description>
    </List.Content>
  </List.Item>
)
export default DoctorView
