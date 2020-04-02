import React from 'react';

export const SignupForm = () => {
  return (
    <form>
      <fieldset>
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
          placeholder="Password (6+ characters)"
          required
        />
        <input
          type="password"
          name="ConfirmPassword"
          id="ConfirmPassword"
          placeholder="Confirm Password"
          required
        />
      </fieldset>
      <button type="submit">Register</button>
    </form>
  );
};
