import React, { Component } from "react";
import { withTranslation } from "react-i18next";

class LanguageSelector extends Component {
  render() {
    const i18n = this.props.i18n;
    const language = i18n.language;

    return language
    ? (
    <ul>
      <li onClick={() => i18n.changeLanguage("en")} style={{ color: language === "en" ? "blue" : "inherit"}}>EN</li>
      <li onClick={() => i18n.changeLanguage("de")} style={{ color: language === "de" ? "blue" : "inherit"}}>DE</li>
    </ul>)
    : null
  };
}
export default withTranslation()(LanguageSelector);
