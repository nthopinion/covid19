import React from 'react';
import '../styles/Button.css';

class FlagButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      changeColor: false,
    };
  }

  componentDidMount() {
    const svgToChangeColor = this.itemToChangeColor;
    svgToChangeColor.addEventListener('colorchangeend', this.colorChangeDone);
  }

  componentWillUnmount() {
    const svgToChangeColor = this.itemToChangeColor;
    svgToChangeColor.removeEventListener(
      'colorchangeend',
      this.colorChangeDone
    );
  }

  colorChangeDone() {
    this.setState({ changeColor: false });
  }

  changeColor() {
    this.setState({ changeColor: true });
  }

  render() {
    return (
      <div
        style={{
          position: 'relative',
          cursor: 'pointer',
          paddingRight: '10px',
        }}
        onClick={() => {
          // TODO make color only stay red when flag submitted on pop up prompt
          this.props.onClick();
          this.changeColor();
        }}
        id={this.props.itemId}
      >
        <svg
          ref={(e) => {
            this.itemToChangeColor = e;
          }}
          className={this.state.changeColor ? ' animate-flag-color' : ''}
          viewBox="0 0 15 13"
          width="15"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Layer_1">
            <g>
              <path d="M9.4 2L9 0H0V17H2V10H7.6L8 12H15V2H9.4Z" />
            </g>
          </g>
        </svg>
      </div>
    );
  }
}

export default FlagButton;
