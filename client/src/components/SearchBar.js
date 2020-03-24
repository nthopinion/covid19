import _ from 'lodash';
import React from 'react';
import { Search } from 'semantic-ui-react';

const SearchBar = (props) => (
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
      placeholder="Have a question? Type here to search"
      noResultsMessage="No results found."
      noResultsDescription="Select Ask a Question to Continue"
      onKeyPress={props.handleKeyPress}
    />
  </div>
);
export default SearchBar;
