import React from 'react';

import Flag from './Flag';
import Like from './Like';
import Share from './Share';

const Icon = (props) => {
  switch (props.name) {
    case 'flag':
      return <Flag />;
    case 'like':
      return <Like />;
    case 'share':
      return <Share />;
    default:
  }
};

export default Icon;
