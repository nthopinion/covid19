import React from 'react';
// import { withTranslation } from 'react-i18next';
import { Dropdown } from 'semantic-ui-react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import { whitelist, languages } from '../constants/languages';
import '../styles/LanguageSelector.css';

const languageOptions = [
  {
    text: 'Hindi',
    link: '/hindi',
  },
  {
    text: 'English',
    link: '/',
  },
  {
    text: 'Chinese',
    link: '/chinese',
  },
];
const LanguageSelector = () => {
  return (
    <div className="language-selector">
      <Router>
        <Dropdown text="English">
          <Dropdown.Menu>
            {languageOptions.map((language) => (
/*
class LanguageSelector extends Component {
  render() {
    const { i18n } = this.props;
    const language = languages[i18n.language];

    const switchLanguage = (value) => () => {
      i18n.changeLanguage(value);
    };

    return language ? (
      <div className="language-selector">
        <Dropdown text={language}>
          <Dropdown.Menu className={this.props.className}>
            {whitelist.map((key) => (
*/
              <Dropdown.Item
                text={language.text}
                as={Link}
                to={language.link}
                key={language.text}
              />
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <Switch>
          <Route
            path="/hindi"
            component={() => {
              window.location.href =
                'https://ntozwu-pd-covid19-app.azurewebsites.net/';
              return null;
            }}
          />
        </Switch>
      </Router>
    </div>
  );
};

// class LanguageSelector extends Component {
//   render() {
//     const { i18n } = this.props;
//     const language = languages[i18n.language];

//     const switchLanguage = (value) => () => {
//       i18n.changeLanguage(value);
//     };

//     return language ? (
//       <div className="language-selector">
//         <Dropdown text={language}>
//           <Dropdown.Menu>
//             {whitelist.map((key) => (
//               <Dropdown.Item
//                 selected={key === i18n.language}
//                 key={key}
//                 text={languages[key]}
//                 onClick={switchLanguage(key)}
//               />
//             ))}
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>
//     ) : null;
//   }
// }

export default LanguageSelector;
// export default withTranslation()(LanguageSelector);
