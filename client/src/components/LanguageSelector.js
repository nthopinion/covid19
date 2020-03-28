import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Dropdown } from 'semantic-ui-react';

import { options as languagesOptions } from '../constants/languages';
import '../styles/LanguageSelector.css';

class LanguageSelector extends Component {
  render() {
    const { i18n } = this.props;
    const language = (
      languagesOptions.find((l) => l.key === i18n.language) || {}
    ).text;
    const switchLanguage = (value) => () => {
      i18n.changeLanguage(value);
    };

    return language ? (
      <div className="language-selector">
        <Dropdown text={language}>
          <Dropdown.Menu>
            {languagesOptions.map((lang) => (
              <Dropdown.Item
                selected={lang.text === language}
                key={lang.key}
                text={lang.text}
                onClick={switchLanguage(lang.value)}
              />
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    ) : null;
  }
}
export default withTranslation()(LanguageSelector);
