import React from 'react';
import logo from '../assets/images/covid-19-logo.svg';

const Loader = () => (
  <div className="App">
    <img src={logo} className="App-logo" alt="logo" />
    <div>loading...</div>
  </div>
);
export default Loader;
