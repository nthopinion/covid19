/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, Component } from 'react';
import { List } from 'semantic-ui-react';

import '../styles/AnswerItem.css'

import avatar from '../assets/images/askco-avatar.svg';


export default class AnswerItem extends Component {
  constructor(props) {
    super(props);
    this.state = {expanded : false, overflow : false};
  }

  componentDidMount() {
    this.setOverflow();
    window.addEventListener('resize', this.setOverflow);
  }

  setOverflow = () => {
    var el = document.getElementById(this.props.questionid);
    if (el == null) {
      console.log("Could not find element!");
      return;
    }

    var isOverflowing = el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;

    this.setState({overflow : isOverflowing});
  }


  render() {
    return (
      <List.Item>
        <List.Content>
          <div className="answerTitle">
            <div className="answeredByName">
              <span>A.</span>
              {this.props.answeredBy || 'AskCo19'}
            </div>
            <img
              src={this.props.answerByAvatarUrl || avatar}
              className="answeredByIcon"
              alt="answer avatar"
            />
          </div>
          <List.Description>
            <div id={this.props.questionid} className={"qAnswer " + (this.state.expanded ? '' : 'overflow')}>        
              {this.props.answer}
            </div>
            {this.state.overflow
              ? <a onClick={() => this.setState({expanded : !this.state.expanded})}>
              Show {this.state.expanded ? 'less' : 'more'}
               </a>
              : null
            }
          </List.Description>
        </List.Content>
      </List.Item>
    );
  }
}

