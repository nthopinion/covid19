import React, { Component } from "react";
import "../styles/FloatingMenu.css";
import Iframe from './Iframe'
import { List, Button, Icon, Message, Sticky, Header, Image } from 'semantic-ui-react'

class FloatingMenu extends Component {
  constructor() {
  		super();

  		this.state = {
  			toggled: false
  		}
  	}

  	toggleMenu() {
  		this.setState({toggled: !this.state.toggled});
  	}

  	render() {

  		return(
  			 <div className='floating-menu'>
         {this.state.toggled &&

           <div className='chat-bot-panel'>
           <Header as='h2' className='custom-message-head'
           attached>
             <Icon name='heartbeat' />
             <Header.Content>
               Here is Jenna
               <Header.Subheader>Let's chat</Header.Subheader>
             </Header.Content>
           </Header>


             <div className='attached fluid segment'>
             <Iframe
             src={'https://webchat.botframework.com/embed/ntozwu-qna-wellspring-bot?s=inVtGkA7vCM.w7KrGgKpZeqVW9HhSX8KcdjJD6sNOAvOP_EIeUiC5g4'}
             width={'100%'} height={'500px'}></Iframe>
             </div>
             {/*
               <Message attached='bottom' warning>
               <Icon name='help' />
               Already signed up?&nbsp;<a href='#'>Login here</a>&nbsp;instead.
             </Message>
             */}
           </div>

          }
            <Icon circular className='floating-menu-icon' inverted color='teal' name='rocketchat' onClick={this.toggleMenu.bind(this)} />

  		    </div>
);
  	}
}

export default FloatingMenu;
