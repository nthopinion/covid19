import React, { useState, useRef } from 'react';
import { Button } from 'semantic-ui-react';

export const SignupForm = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const confirmPassword = useRef('confirm');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    confirmPassword.current.setCustomValidity('');
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    if (formValues.password !== formValues.confirmPassword) {
      confirmPassword.current.setCustomValidity("Passwords Don't Match");
      confirmPassword.current.focus();
      e.currentTarget.reportValidity();
    } else {
      confirmPassword.current.setCustomValidity('');
      console.log(formValues);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email Address"
          required
          value={formValues.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password (6+ characters)"
          required
          value={formValues.password}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm Password"
          ref={confirmPassword}
          required
          value={formValues.confirmPassword}
          onChange={handleInputChange}
        />
      </fieldset>
      <Button type="submit">Register</Button>
      <p>
        By creating an account, you agree to our Terms of Use and our Privacy
        Policy
      </p>
    </form>
  );
};
