import './App.scss';
import Example from './physician-empower'

import React, { Component } from 'react'
import Userexperiences from './listbox';
import Button from '@bit/semantic-org.semantic-ui-react.button'

import DisplayQrcode from '@bit/globalinput.web.display-qrcode';
import DragAndDrop from '@bit/bronz3beard.react-component-collection.drag-and-drop';

import ToDoList from '@bit/learn-bit.react-demo-app.to-do-list';
// import './font.css';



const style = <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.css'/>

const ButtonExampleGroupIconSize = () => (
  <Button.Group basic size='small'>
    <Button icon='file' />
    <Button icon='save' />
    <Button icon='upload' />
    <Button icon='download' />
  </Button.Group>
)

const handleDrop = (files) => {
	let tempFileList = [];

	for (let i = 0; i < files.length; i++) {
		const file = files[i];
		if (!file.name) {
			return;
		}
		alert(file.name)
		tempFileList.push(file);
	}
};


export class App extends Component {
  constructor(props) {
    super(props)
    this.handleQRsend = 50.00
  }
  render() {

    return (
      <div>
        <p className="Company-name">Nᵀᴴ OPINION</p>
        <div>What is best anticoagulant for atrial fibrillation?</div>
        <div style={{width: '100vw'}}>
          <ToDoList/>
        </div>
        {/* <Userexperiences></Userexperiences>      */}
        <div className='toolbar'>{style}<ButtonExampleGroupIconSize/></div>
        <div className='QR-container'>
          <div className='QR-format'>
            <DisplayQrcode size={parseFloat(100)} code={`You received ${this.handleQRsend} NTO Thank you!`} label={`Scan to receive: ${this.handleQRsend} NTO`}/>
          </div> 
        </div>
        <DragAndDrop handleDrop={handleDrop}>
          <div
            type="file"
            name="files"
            accept="image/*"
            multiple
            style={{ height: `${300}px`, width: `${500}px` }}
          ></div>
        </DragAndDrop>
        
        Library   
      </div>
      
    )
  }
}

export default App
