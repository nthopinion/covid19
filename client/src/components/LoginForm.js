import React, { useState } from 'react';
import '../styles/LoginForm.css';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export const LoginForm = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    keepLoggedIn: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'keepLoggedIn' ? e.target.checked : value;
    setFormValues({ ...formValues, [name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="loginFields">
        <input
          type="email"
          name="email"
          id="email"
          autoComplete={formValues.email}
          placeholder="Email Address"
          value={formValues.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          autoComplete={formValues.password}
          placeholder="Password"
          value={formValues.password}
          onChange={handleInputChange}
          required
        />
      </fieldset>
      <div className="loginOptions">
        <label htmlFor="keepLoggedIn">
          <input
            type="checkbox"
            name="keepLoggedIn"
            id="keepLoggedIn"
            defaultChecked={formValues.keepLoggedIn}
            onChange={handleInputChange}
          />
          Keep Me Logged In.
        </label>
        <a href="/">Forgot Password?</a>
      </div>
      <Button active type="submit">
        Sign In
      </Button>
      <p>
        Not A Member Yet? <Link to="/signup">Sign Up</Link>
      </p>
    </form>
  );
};
