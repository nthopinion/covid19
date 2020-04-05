import React, { Component } from 'react';
// import { Button } from 'semantic-ui-react';

import logo from '../assets/images/co19-login-logo.svg';
// import googleLogo from '../assets/images/google-logo.svg';
import '../styles/PhysicianLogin.css';
import { SignupForm } from './SignupForm';

class PhysicianSignup extends Component {
  render() {
    return (
      <div className="loginScreen">
        <section className="loginSection">
          <div>
            <h1>Sign Up</h1>
            {/* <Button active onClick={this.props.onSignIn}>
              <img src={googleLogo} alt="Google Logo" />
              Sign Up with Google
            </Button>
            <div className="divider">
              <span>or</span>
            </div> */}
            <SignupForm />
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
