import React from 'react';

import Ask from './Ask';
import AboutUs from './AboutUs';

import '../../styles/HeaderWithLink.css';

const HeaderWithLink = (props) => {
  return (
    <div className="header-wrapper">
      <AboutUs />
      <Ask buttonLabel={props.buttonLabel} />
    </div>
  );
};

export default HeaderWithLink;
