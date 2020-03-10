import React, { Component, Fragment } from 'react'
import styles from '../styles/FloatingMenu.module.css'
import Iframe from './Iframe'
import { List, Button, Icon, Message, Sticky, Header, Image } from 'semantic-ui-react'

class ChatBox extends Component {
  constructor () {
  		super()
  	}

  	render () {
  		return (
      <Fragment>
      <div className={styles.overlay} />
      <div className={styles.chatbotPanel}>
          <Header
          as='h2' className={styles.customMessageHead}
          attached
        >
          <Icon name='heartbeat' />
          <Header.Content>
               Janet Assistant
              <Header.Subheader>Let's chat</Header.Subheader>
            </Header.Content>
        </Header>

          <div className='attached fluid segment customChat'>
          <Iframe
              src='https://webchat.botframework.com/embed/ntozwu-qna-wellspring-bot?s=inVtGkA7vCM.w7KrGgKpZeqVW9HhSX8KcdjJD6sNOAvOP_EIeUiC5g4'
            />
        </div>
          {/*
               <Message attached='bottom' warning>
               <Icon name='help' />
               Already signed up?&nbsp;<a href='#'>Login here</a>&nbsp;instead.
             </Message>
             */}
        </div>
    </Fragment>

    )
  	}
}

export default ChatBox
