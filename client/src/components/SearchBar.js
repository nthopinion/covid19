import _ from "lodash";
import React from "react";
import { Search } from "semantic-ui-react";
import AskQuestionForm from "../containers/AddQuestionForm";

const SearchBar = props => (
  <div className="searchBarDiv">
    <Search
      className="searchBar"
      loading={props.isLoading}
      onResultSelect={props.handleResultSelect}
      onSearchChange={_.debounce(props.handleSearchChange, 500, {
        leading: true
      })}
      results={props.results}
      noResultsDescription='Press "Ask a question" to continue.'
      value={props.value}
      placeholder="Have a question? Type here to search"
    />
    <AskQuestionForm />
  </div>
);
export default SearchBar;
