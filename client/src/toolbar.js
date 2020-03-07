import React from 'react'
import Button from '@bit/semantic-org.semantic-ui-react.button'

const style = <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.css'/>

const ButtonExampleGroupIconSize = () => (
  <Button.Group basic size='small'>
    <Button icon='file' />
    <Button icon='save' />
    <Button icon='upload' />
    <Button icon='download' />
  </Button.Group>
)

export default () => (<div>{style}<ButtonExampleGroupIconSize/></div>)