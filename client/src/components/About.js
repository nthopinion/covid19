import React from 'react'
import { List } from 'semantic-ui-react'

import NavMenu from './NavLink'

const About = (props) => (
  <>
    <NavMenu />
    <List.Item>
      <List.Icon name="marker" />
      <List.Content>
        <List.Description>
          <span className="qAnswer">HI</span>
        </List.Description>
      </List.Content>
    </List.Item>
  </>
)
export default About
