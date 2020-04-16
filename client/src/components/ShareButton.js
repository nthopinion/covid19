import React from 'react';
import '../styles/Button.css';

class ShareButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // changeColor: false,
    };
  }

  // componentDidMount() {
  //   const svgToChangeColor = this.itemToChangeColor;
  //   svgToChangeColor.addEventListener('colorchangeend', this.colorChangeDone);
  // }
  //
  // componentWillUnmount() {
  //   const svgToChangeColor = this.itemToChangeColor;
  //   svgToChangeColor.removeEventListener(
  //     'colorchangeend',
  //     this.colorChangeDone
  //   );
  // }
  //
  // colorChangeDone() {
  //   this.setState({ changeColor: false });
  // }
  //
  // changeColor() {
  //   this.setState({ changeColor: true });
  // }

  render() {
    return (
      <div
        style={{
          position: 'relative',
          cursor: 'pointer',
          paddingLeft: '0.8em',
          paddingTop: '0.1em',
        }}
        // onClick={() => {
        //   this.props.onClick();
        //   this.changeColor();
        // }}
        // id={this.props.itemId}
      >
        <svg
          ref={(e) => {
            this.itemToChangeColor = e;
          }}
          className={this.state.changeColor ? ' animate-color' : ''}
          viewBox="0 0 16 17"
          width="17"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Layer_1">
            <g>
              <path d="M12.6253 11.461C12.0228 11.461 11.4798 11.7009 11.0675 12.0873L5.41911 8.70758C5.46272 8.52456 5.49046 8.33341 5.49046 8.13819C5.49046 7.94297 5.46272 7.75182 5.41911 7.5688L11.0081 4.22161C11.4322 4.62832 11.999 4.88047 12.6253 4.88047C13.9374 4.88047 15.0036 3.78643 15.0036 2.44024C15.0036 1.09404 13.9374 0 12.6253 0C11.3133 0 10.247 1.09404 10.247 2.44024C10.247 2.63546 10.2748 2.82661 10.3184 3.00963L4.72941 6.35682C4.30528 5.95011 3.73846 5.69795 3.11217 5.69795C1.80015 5.69795 0.733887 6.79199 0.733887 8.13819C0.733887 9.48439 1.80015 10.5784 3.11217 10.5784C3.73846 10.5784 4.30528 10.3263 4.72941 9.91956L10.3778 13.2993C10.3382 13.4701 10.3144 13.6491 10.3144 13.8321C10.3144 15.1417 11.349 16.2032 12.6253 16.2032C13.9017 16.2032 14.9362 15.1417 14.9362 13.8321C14.9362 12.5225 13.9017 11.461 12.6253 11.461Z" />
            </g>
          </g>
        </svg>
      </div>
    );
  }
}

export default ShareButton;
