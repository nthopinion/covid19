import React, { Component } from 'react';

import Icon from './icon';

class FlagButton extends Component {
  render() {
    return (
      <div
        style={{ position: 'relative', float: 'right' }}
        onClick={this.props.onClick}
      >
        <Icon name="flag" />
      </div>
    );
  }
}

export default FlagButton;
