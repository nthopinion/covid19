import React from 'react';
import { List } from 'semantic-ui-react';

import Footer from './Footer';
import NavMenu from './NavLink';

const About = () => (
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
    <Footer />
  </>
);
export default About;
