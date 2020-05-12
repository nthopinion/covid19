import React from 'react';
import { Collapse } from 'react-collapse';
import '../styles/Button.css';
import config from '../config';

class ShareButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      changeColor: false,
      isOpen: false,
    };
  }

  componentDidMount() {
    // window.fbAsyncInit = () => {
    //   window.FB.init({
    //     appId: '2623002327974339',
    //     autoLogAppEvents: true,
    //     cookie: true,
    //     xfbml: true,
    //     version: 'v6.0',
    //   });
    // };
    // (function (d, s, id) {
    //   const fjs = d.getElementsByTagName(s)[0];
    //   if (d.getElementById(id)) return;
    //   const js = d.createElement(s);
    //   js.id = id;
    //   js.src = '//connect.facebook.net/en_US/sdk.js';
    //   fjs.parentNode.insertBefore(js, fjs);
    // })(document, 'script', 'facebook-jssdk');

    const svgToChangeColor = this.itemToChangeColor;
    svgToChangeColor.addEventListener('colorChanged', this.colorChangeDone);
  }

  componentWillUnmount() {
    const svgToChangeColor = this.itemToChangeColor;
    svgToChangeColor.removeEventListener('colorChanged', this.colorChangeDone);
  }

  colorChangeDone() {
    this.setState({ changeColor: !this.state.changeColor });
  }

  changeColor() {
    this.setState({ changeColor: !this.state.changeColor });
  }

  handleIsOpen = () => {
    return this.setState({ isOpen: !this.state.isOpen });
  };

  handleFbShare = () => {
    // window.FB.ui(
    //   {
    //     method: 'share',
    //     href: 'google.com',
    //   },
    //   // eslint-disable-next-line func-names,no-unused-vars
    //   function (response) {}
    // );
  };

  render() {
    return (
      <div>
        <div
          className="share-button"
          onClick={() => {
            this.changeColor();
            this.handleIsOpen();
          }}
          // id={this.props.itemId}
        >
          <svg
            ref={(e) => {
              this.itemToChangeColor = e;
            }}
            className={
              this.state.changeColor ? 'like-button-clicked' : 'button'
            }
            viewBox="0 0 16 17"
            width="17"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.6253 11.461C12.0228 11.461 11.4798 11.7009 11.0675 12.0873L5.41911 8.70758C5.46272 8.52456 5.49046 8.33341 5.49046 8.13819C5.49046 7.94297 5.46272 7.75182 5.41911 7.5688L11.0081 4.22161C11.4322 4.62832 11.999 4.88047 12.6253 4.88047C13.9374 4.88047 15.0036 3.78643 15.0036 2.44024C15.0036 1.09404 13.9374 0 12.6253 0C11.3133 0 10.247 1.09404 10.247 2.44024C10.247 2.63546 10.2748 2.82661 10.3184 3.00963L4.72941 6.35682C4.30528 5.95011 3.73846 5.69795 3.11217 5.69795C1.80015 5.69795 0.733887 6.79199 0.733887 8.13819C0.733887 9.48439 1.80015 10.5784 3.11217 10.5784C3.73846 10.5784 4.30528 10.3263 4.72941 9.91956L10.3778 13.2993C10.3382 13.4701 10.3144 13.6491 10.3144 13.8321C10.3144 15.1417 11.349 16.2032 12.6253 16.2032C13.9017 16.2032 14.9362 15.1417 14.9362 13.8321C14.9362 12.5225 13.9017 11.461 12.6253 11.461Z" />
          </svg>
        </div>
        <div className="share-container">
          <Collapse isOpened={this.state.isOpen}>
            <ul className="social-container-icons">
              <li>
                <a
                  href={`https://twitter.com/intent/tweet?text=${
                    this.props.question.title
                  }%20Answer:%20${
                    this.props.answer &&
                    this.props.answer.text.length > 0 &&
                    this.props.answer.text.slice(0, 50)
                  }...%20at%20${`${config.domainURL}?qid=${this.props.answer.id}`}%20@thenthopinion`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    className="twitter-icon"
                    width="20"
                    height="20"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0ZM8.74934 7.62673L8.73045 7.31531C8.67379 6.50816 9.17112 5.77092 9.95804 5.48492C10.2476 5.38323 10.7387 5.37052 11.0597 5.4595C11.1856 5.49763 11.4248 5.62474 11.5948 5.73914L11.9033 5.94887L12.2432 5.84083C12.4321 5.78363 12.6839 5.6883 12.7972 5.62474C12.9042 5.56754 12.9987 5.53576 12.9987 5.55483C12.9987 5.66287 12.7657 6.03149 12.5706 6.23487C12.3062 6.52087 12.3817 6.54629 12.9168 6.35563C13.2379 6.24758 13.2442 6.24758 13.1812 6.36834C13.1435 6.43189 12.9483 6.65434 12.7406 6.85771C12.388 7.20727 12.3691 7.2454 12.3691 7.53775C12.3691 7.98899 12.1551 8.92961 11.9411 9.44441C11.5445 10.4104 10.6946 11.4083 9.84472 11.9103C8.64861 12.6158 7.0559 12.7938 5.715 12.3807C5.26803 12.2408 4.5 11.8849 4.5 11.8214C4.5 11.8023 4.73293 11.7769 5.01622 11.7705C5.60798 11.7578 6.19973 11.5926 6.70336 11.3002L7.04331 11.0968L6.653 10.9634C6.09901 10.7727 5.60168 10.3342 5.47577 9.92107C5.438 9.7876 5.45059 9.78125 5.80313 9.78125L6.16826 9.77489L5.85979 9.62872C5.49466 9.44441 5.16101 9.13299 4.99733 8.81521C4.87772 8.58641 4.72663 8.00806 4.7707 7.96357C4.78329 7.94451 4.91549 7.98264 5.06658 8.03348C5.50095 8.19237 5.55761 8.15424 5.3058 7.88731C4.83365 7.40429 4.68886 6.68611 4.91549 6.00607L5.02251 5.70101L5.438 6.11412C6.28787 6.94669 7.28882 7.44242 8.43457 7.5886L8.74934 7.62673Z" />
                  </svg>
                </a>
              </li>
              {/* <li> */}
              {/*  <div onClick={this.handleFbShare}> */}
              {/*    <svg */}
              {/*      className="facebook-icon" */}
              {/*      width="18" */}
              {/*      height="18" */}
              {/*      viewBox="0 0 18 18" */}
              {/*      fill="none" */}
              {/*      xmlns="http://www.w3.org/2000/svg" */}
              {/*    > */}
              {/*      <path d="M18 9C18 4.02891 13.9711 0 9 0C4.02891 0 0 4.02891 0 9C0 13.493 3.29062 17.216 7.59375 17.891V11.6016H5.30859V9H7.59375V7.01719C7.59375 4.76191 8.93672 3.51562 10.9934 3.51562C11.9777 3.51562 13.0078 3.69141 13.0078 3.69141V5.90625H11.8723C10.7543 5.90625 10.4062 6.60059 10.4062 7.3125V9H12.9023L12.5033 11.6016H10.4062V17.891C14.7094 17.216 18 13.493 18 9Z" /> */}
              {/*    </svg> */}
              {/*  </div> */}
              {/* </li> */}
            </ul>
          </Collapse>
        </div>
      </div>
    );
  }
}

export default ShareButton;
