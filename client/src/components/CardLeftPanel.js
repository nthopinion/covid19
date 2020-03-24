import React from 'react'
import { Label } from 'semantic-ui-react'

const CardLeftPanel = (props) => (
  <div className="vertical-grid qLeftCard">
    <div className="qTitle">
      <span>Q{props.questionNumber + 1}</span>: {props.title} {props.metaData}
    </div>
  </div>
)
export default CardLeftPanel
