import React, { Component } from 'react';

import Icon from './icon';

class ShareButton extends Component {
  render() {
    return (
      <div
        style={{
          position: 'relative',
          cursor: 'pointer',
          paddingRight: '10px',
        }}
        // onClick={this.props.onClick}
      >
        <Icon name="share" />
      </div>
    );
  }
}

export default ShareButton;
