import React, { Component } from 'react';

import Icon from './icon';

class LikeButton extends Component {
  render() {
    return (
      <div
        style={{ position: 'relative', float: 'left' }}
        onClick={this.props.onClick}
        id={this.props.itemId}
      >
        <Icon name="like" />
        {this.props.likes}
      </div>
    );
  }
}

export default LikeButton;
