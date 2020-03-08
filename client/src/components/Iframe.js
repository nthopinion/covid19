

import React from 'react'
import { List } from 'semantic-ui-react'

const Iframe = (props) => (
  <div>
    <iframe src={props.src} styles={props.style} width={props.width} height={props.height}/>
  </div>
)
export default Iframe
