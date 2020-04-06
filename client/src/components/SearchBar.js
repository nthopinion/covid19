import _ from 'lodash';
import React from 'react';
import { Search } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';

const SearchBar = (props) => {
  const { t } = props;
  return (
    <div className="searchBarDiv">
      <Search
        className="searchBar"
        loading={props.isLoading}
        onResultSelect={props.handleResultSelect}
        onSearchChange={_.debounce(props.handleSearchChange, 500, {
          leading: true,
        })}
        results={props.results}
        value={props.value}
        placeholder={t('patientBoard:searchBar.haveAQuestion')}
        noResultsMessage={t('patientBoard:searchBar.noResultsFound')}
        noResultsDescription={t('patientBoard:searchBar.selectAskAQuestion')}
        onKeyPress={props.handleKeyPress}
      />
    </div>
  );
};

export default withTranslation()(SearchBar);
