import React, { Component, Fragment } from 'react'
import { List } from 'semantic-ui-react'

const Iframe = (props) => (
  <>
    <iframe src={props.src} styles={props.style} width={props.width} height={props.height} />
  </>
)
export default Iframe
