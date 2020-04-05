import React, { useState, useRef } from 'react';
import { Button } from 'semantic-ui-react';

import '../styles/SignupForm.css';

export const SignupForm = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    npiidentifier: '',
    role: '',
    profilelink: '',
    profilestatus: '',
    anonymous: false,
  });

  const confirmPassword = useRef('confirm');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    confirmPassword.current.setCustomValidity('');
    const newValue = name === 'anonymous' ? e.target.checked : value;
    setFormValues({ ...formValues, [name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValues.password !== formValues.confirmPassword) {
      confirmPassword.current.setCustomValidity("Passwords Don't Match");
      confirmPassword.current.focus();
      e.currentTarget.reportValidity();
    } else {
      confirmPassword.current.setCustomValidity('');
      // Success Path
      // console.log(formValues);
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
          minLength="6"
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
        <input
          value={formValues.npiidentifier}
          onChange={handleInputChange}
          type="text"
          name="npiidentifier"
          id="npiidentifier"
          placeholder="NPI Identifier (optional)"
        />
        <input
          value={formValues.role}
          onChange={handleInputChange}
          type="text"
          name="role"
          id="role"
          placeholder="Role"
          required
        />
        <input
          value={formValues.profilelink}
          onChange={handleInputChange}
          type="text"
          name="profilelink"
          id="profilelink"
          placeholder="Profile Link"
          required
        />
        <input
          value={formValues.profilestatus}
          onChange={handleInputChange}
          type="text"
          name="profilestatus"
          id="profilestatus"
          placeholder="Profile Status"
          required
        />
        <label htmlFor="anonymous">
          <input
            type="checkbox"
            name="anonymous"
            id="anonymous"
            defaultChecked={formValues.anonymous}
            onChange={handleInputChange}
          />
          Keep my profile anonymous.
        </label>
      </fieldset>
      <Button type="submit">Register</Button>
      <p>
        By creating an account, you agree to our Terms of Use and our Privacy
        Policy
      </p>
    </form>
  );
};
