import React, { Component } from 'react'
import DisplayQrcode from '@bit/globalinput.web.display-qrcode'

export class Timer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      NTO: 0
    }
  }

  tick () {
    this.setState(state => ({
      NTO: state.NTO + 1
    }))
  }

  componentDidMount () {
    this.interval = setInterval(() => this.tick(), 2000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  render () {
    return (
      <div>
        <DisplayQrcode size={parseFloat(100)} code={`You received ${this.state.NTO} NTO Thank you!`} label={`Scan to receive: ${this.state.NTO} NTO`} />

      </div>
    )
  }
}

export default Timer
