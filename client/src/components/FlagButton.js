import React, { Component } from 'react';

import Icon from './icon';

class FlagButton extends Component {
  render() {
    return (
      <div
        style={{
          float: 'left',
          position: 'relative',
          cursor: 'pointer',
          paddingRight: '10px',
        }}
        onClick={this.props.onClick}
      >
        <Icon name="flag" />
      </div>
    );
  }
}

export default FlagButton;
