import React, { Component } from 'react';
import { Sticky, Message } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';

import logo from '../assets/images/ask-covid-19-logo.svg';
import { normalizeResults } from '../helpers/normalizeResults';

import LanguageSelector from './LanguageSelector';
import SearchBar from './SearchBar';
import Menu from './NavLink';

class StickyHeader extends Component {
  render() {
    const {
      contextRef,
      isLoading,
      results,
      searchTerm,
      handleResultSelect,
      handleSearchChange,
      handleKeyPress,
      addSuccess,
      messageActive,
      newQ,
      t,
      account,
      onSignOut,
      handleChangeLanguage,
    } = this.props;

    return (
      <Sticky context={contextRef} className="sticky-container">
        <div className="sticky-top">
          <a href="https://www.askco19.com/">
            <img className="logo" src={logo} alt="Logo" />
          </a>
          <div>
            <LanguageSelector handleChangeLanguage={handleChangeLanguage} />
            <SearchBar
              isLoading={isLoading}
              results={normalizeResults(results)}
              value={searchTerm}
              handleResultSelect={handleResultSelect}
              handleSearchChange={handleSearchChange}
              handleKeyPress={handleKeyPress}
            />
          </div>

          <Menu account={account} onSignOut={onSignOut} />
          {addSuccess && messageActive && (
            <Message positive>
              <Message.Header>
                {t('patientBoard:stickyHeader.questionSubmitted')}
              </Message.Header>
              <p>
                {t('patientBoard:stickyHeader.checkBackLater')}{' '}
                {newQ && newQ.title}
              </p>
            </Message>
          )}
          {!addSuccess && messageActive && (
            <Message error>
              <Message.Header>
                {t('patientBoard:stickyHeader.triedToSubmit')}
              </Message.Header>
              <p>{t('patientBoard:stickyHeader.somethingWentWrong')}</p>
            </Message>
          )}
        </div>

        {/* <AddQuestionForm/> */}
      </Sticky>
    );
  }
}

export default withTranslation()(StickyHeader);
