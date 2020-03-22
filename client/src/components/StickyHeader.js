import React, { Component } from "react";
import { Sticky, Message } from "semantic-ui-react";

import logo from "../assets/images/covid-19-logo-white.svg";

import SearchBar from "../components/SearchBar";
import Menu from "../components/NavLink";

class StickyHeader extends Component {
  constructor(props) {
    super(props);
  }
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
      newQ
    } = this.props;

    return (
      <Sticky context={contextRef} className="sticky-container">
        <div className="sticky-top">
          <img className="logo" src={logo} alt="Logo" />
          <SearchBar
            isLoading={isLoading}
            results={results}
            value={searchTerm}
            handleResultSelect={handleResultSelect}
            handleSearchChange={handleSearchChange}
            handleKeyPress={handleKeyPress}
          />
          <Menu lightMenu />
          {addSuccess && messageActive && (
            <Message positive>
              <Message.Header>We've submitted your question</Message.Header>
              <p>Please check back later. {newQ && newQ.title}</p>
            </Message>
          )}
          {!addSuccess && messageActive && (
            <Message error>
              <Message.Header>
                We've tried to submit your question
              </Message.Header>
              <p>Sorry Something went wrong. Please try again later</p>
            </Message>
          )}
        </div>

        {/*<AddQuestionForm/>*/}
      </Sticky>
    );
  }
}

export default StickyHeader;
