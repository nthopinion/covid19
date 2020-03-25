import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import styles from '../styles/FloatingMenu.module.css';
import ChatBox from './ChatBox';

class FloatingMenu extends Component {
  constructor() {
    super();

    this.state = {
      toggled: false,
    };
  }

  componentDidMount() {
    if (window.innerWidth > 760)
      this.interval = setTimeout(() => this.setState({ toggled: true }), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  toggleMenu = () => {
    this.setState({ toggled: !this.state.toggled });
  };

  render() {
    return (
      <>
        <div className={[styles.floatingMenuButton].join(' ')}>
          {this.state.toggled && <ChatBox />}

          <Icon
            circular
            className={styles.floatingMenuIcon}
            inverted
            color="teal"
            name="rocketchat"
            onClick={this.toggleMenu}
          />
        </div>
      </>
    );
  }
}

export default FloatingMenu;
