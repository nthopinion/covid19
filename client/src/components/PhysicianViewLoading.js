import React from 'react';
import { Button } from 'semantic-ui-react';

import logo from '../assets/images/co19-login-logo.svg';
import '../styles/PhysicianLogin.css';

const PhysicianViewLoading = (props) => {
  return (
    <div className="loginScreen">
      <section className="loginSection">
        <div>
          <h1>Welcome {props.account.name}</h1>
          <p>
            Please wait a few seconds while we prepare your screen
          </p>
        </div>
      </section>
      <section className="heroSection">
        <img src={logo} alt="Login Screen Logo" />
      </section>
    </div>
  );
};

export default PhysicianViewLoading;
