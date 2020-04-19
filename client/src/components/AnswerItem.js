/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { List } from 'semantic-ui-react';

import '../styles/AnswerItem.css'

import avatar from '../assets/images/askco-avatar.svg';

const PREVIEW_CHARS = 200;




const AnswerItem = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [overflow, setOverflow] = useState(checkOverflow(props.drewval));
  // const [overflow, setOverflow] = useState(true);

  
  var myBool = checkOverflow(props.drewval);

  function componentDidMount() {
    setOverflow(checkOverflow(props.drewval));
    console.log("I RUN");
  }

  function output(x) {
    console.log("hello!!!!!!!!");
    
    console.log(x);
    var el = document.getElementById(x);

    var isOverflowing = el.clientWidth < el.scrollWidth 
    || el.clientHeight < el.scrollHeight;

    console.log("Overflowing? " + checkOverflow(x));

    console.log("State of overflow: " + overflow);
    console.log("State of exapnsion: " + expanded);
    
  }

  
  function checkOverflow(x) {
    var el = document.getElementById(x);
    if (el == null) {
      console.log("it was null, but the id was " + x);
      return;
    }

    // var curOverflow = el.style.overflow;

    // if ( !curOverflow || curOverflow === "visible" )
    //    el.style.overflow = "hidden";

    var isOverflowing = el.clientWidth < el.scrollWidth 
      || el.clientHeight < el.scrollHeight;

    // el.style.overflow = curOverflow;

    // setOverflow(isOverflowing);
    return isOverflowing;
    // return true;
    // return false;
  }
  


  return (
    <List.Item>
      <List.Content>
        <div className="answerTitle">
          <div className="answeredByName">
            <span>A.</span>
            {props.answeredBy || 'AskCo19'}
          </div>
          <img
            src={props.answerByAvatarUrl || avatar}
            className="answeredByIcon"
            alt="answer avatar"
          />
        </div>
        <List.Description>
          <div id={props.drewval} className={"qAnswer " + (expanded ? '' : 'test')}>        
            {props.answer}
          </div>
          {() => checkOverflow(props.drewval)
            ? <a onClick={() => setExpanded(!expanded)}>
            Show {expanded ? 'less' : 'more'}
             </a>
            : <p>sup</p>
          }
          <button onClick={() => output(props.drewval)}>hey</button>
          {(props.drewval)}
          
          


          {/* {props.answer.length > PREVIEW_CHARS ? (
            <div>    
              <div className={"qAnswer " + (expanded ? '' : 'test')}>
                {props.answer}
                {expanded
                  ? props.answer
                  : `${props.answer.substring(0, PREVIEW_CHARS)}...`}
              </div>
              <br />
              <a onClick={() => setExpanded(!expanded)}>
                Show {expanded ? 'less' : 'more'}
              </a>
            </div>
          ) : (
            <>
              <span className="test">{props.answer}</span>
            </>
          )} */}
        </List.Description>
      </List.Content>
    </List.Item>
  );
};
export default AnswerItem;
