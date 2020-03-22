import './App.scss'

import React, { Component } from 'react'
import Button from '@bit/semantic-org.semantic-ui-react.button'

import DisplayQrcode from '@bit/globalinput.web.display-qrcode'
import DragAndDrop from '@bit/bronz3beard.react-component-collection.drag-and-drop'

import ToDoList from '@bit/learn-bit.react-demo-app.to-do-list'
import AtomSpinner from '@bit/bondz.react-epic-spinners.atom-spinner'
import Timer from './Timer'
import Userexperiences from './listbox'
import Example from './physician-empower'

// import './font.css';

const style = (
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.css"
  />
)

const ButtonExampleGroupIconSize = () => (
  <Button.Group basic size="small">
    <Button icon="file" />
    <Button icon="save" />
    <Button icon="upload" />
    <Button icon="download" />
  </Button.Group>
)

const handleDrop = (files) => {
  const tempFileList = []

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    if (!file.name) {
      return
    }
    alert(file.name)
    tempFileList.push(file)
  }
}

export class App extends Component {
  render() {
    return (
      <div>
        <p className="Company-name">
          <div className="Atoms">
            <AtomSpinner color="#000000" size="100" />
          </div>
          Nᵀᴴ OPINION
        </p>
        <div className="question">
          What is best anticoagulant for atrial fibrillation?
        </div>
        <div className="Checkbox-container">
          <div className="Test" style={{ width: '150vw' }}>
            <ToDoList />
            <Timer />
          </div>
        </div>

        {/* <Userexperiences></Userexperiences>      */}
        <div className="toolbar">
          {style}
          <ButtonExampleGroupIconSize />
        </div>
        <div className="QR-container">
          <div className="QR-format" />
        </div>
        <DragAndDrop handleDrop={handleDrop}>
          <div
            type="file"
            name="files"
            accept="image/*"
            multiple
            style={{ height: `${300}px`, width: `${500}px` }}
          />
        </DragAndDrop>
      </div>
    )
  }
}

export default App
