import React, { Component, Fragment } from 'react'
import styles from '../styles/FloatingMenu.module.css'
import Iframe from './Iframe'
import ChatBox from './ChatBox'
import { List, Button, Icon, Message, Sticky, Header, Image } from 'semantic-ui-react'

class FloatingMenu extends Component {
  constructor () {
  		super()

  		this.state = {
  			toggled: false
  		}
  	}

  componentDidMount () {
    if (window.innerWidth > 760) this.interval = setTimeout(() => this.setState({ toggled: true }), 5000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  	toggleMenu () {
  		this.setState({ toggled: !this.state.toggled })
  	}

  	render () {
  		return (
    <Fragment>

        <div className={[styles.floatingMenuButton].join(' ')}>
        {this.state.toggled && <ChatBox />}

        <Icon circular className={styles.floatingMenuIcon} inverted color='teal' name='rocketchat' onClick={this.toggleMenu.bind(this)} />
      </div>
      </Fragment>

    )
  	}
}

export default FloatingMenu
