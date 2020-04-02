import React from 'react';
import '../styles/LoginForm.css';

export const LoginForm = () => {
  return (
    <form>
      <fieldset className="loginFields">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email Address"
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          required
        />
      </fieldset>
      <fieldset className="loginOptions">
        <label htmlFor="keepLoggedIn">
          <input type="checkbox" name="keepLoggedIn" id="keepLoggedIn" />
          Keep Me Logged In.
        </label>
        <a href="/">Forgot Password?</a>
      </fieldset>
      <button type="submit">Sign In</button>
    </form>
  );
};
