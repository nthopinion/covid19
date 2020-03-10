import React, { Component, Fragment } from "react";
import { List } from 'semantic-ui-react'

const Iframe = (props) => (
  <Fragment>
    <iframe src={props.src} styles={props.style} width={props.width} height={props.height}/>
  </Fragment>
)
export default Iframe
