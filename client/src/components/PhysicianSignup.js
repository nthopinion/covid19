import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

import logo from '../assets/images/co19-login-logo.svg';
import '../styles/PhysicianLogin.css';

class PhysicianSignup extends Component {
  render() {
    return (
      <div className="loginScreen">
        <section className="loginSection">
          <div>
            <h1>Log In</h1>
            <p>
              Thank you for taking the time to share you knowledge and
              experience about Covid19!
            </p>
            <Button active onClick={this.props.onSignIn}>
              Sign In / Register
            </Button>
          </div>
        </section>
        <section className="heroSection">
          <img src={logo} alt="Login Screen Logo" />
        </section>
      </div>
    );
  }
}

export default PhysicianSignup;
