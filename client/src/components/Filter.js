import React from 'react';
import { Select } from 'semantic-ui-react';
import { Component } from 'react';
import { sortBy } from 'lodash';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortKey: ''
    };
  }
}

// const Sort=({sortKey,onSort})

const SelectExample = () => {
  return (
    <div className="flex  justify-center mx-56 mb-8 w-2/3">
      <select
        name="sort"
        className="px-4 ml-8 mr-12  font-bold focus:outline-none focus:shadow-outline pr-8 leading-tight py-2 rounded-lg border border-blue-600 border-8 hover:border-blue-700 block appearance:outline-none shadow h-16 text-blue-600 "
      >
        <option value="answered">Answered</option>
        <option value="unanswered">Unanswered</option>
      </select>
      <select
        name="sortbytime"
        className="px-4  font-bold focus:outline-none focus:shadow-outline pr-8 leading-tight py-2 rounded-lg border border-blue-600 border-8 hover:border-blue-700 block appearance:outline-none shadow h-16 text-blue-600 "
      >
        <option value="recent">Popular</option>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
  );
};

export default SelectExample;
