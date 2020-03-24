module.exports = {
  root: true,
  extends: [
    "react-app",
    "airbnb",
    "plugin:jsx-a11y/recommended",
    "prettier",
    "prettier/react",
  ],
  plugins: [
    "jsx-a11y",
    "prettier",
  ],
  rules: {
    "semi": 0,
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "prettier/prettier": "error",
    "react/prop-types": "off",
    "react/destructuring-assignment": "off"
  }
}
