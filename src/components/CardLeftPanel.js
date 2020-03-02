import React from 'react'
import { Label } from 'semantic-ui-react'

const CardLeftPanel = (props) => (
  <div className='vertical-grid qLeftCard'>
    <div className='qTitle'><span>Q{props.questionNumber + 1}</span>: {props.title}</div>
    <div className='qTag'>
      {props.tags.map((tag) => {
        return <Label color='blue'>
          {tag}
               </Label>
      })}
    </div>
  </div>
)
export default CardLeftPanel
