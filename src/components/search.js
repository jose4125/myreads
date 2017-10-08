import React from 'react';
import PropTypes from 'prop-types';

import {DebounceInput} from 'react-debounce-input';
import Category from './category';

function Search(props) {
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <a className="close-search" onClick={props.back}>Close</a>
        <div className="search-books-input-wrapper">
          <DebounceInput
            minLength={2}
            placeholder="Search by title or author"
            debounceTimeout={1000}
            onChange={props.onTextCahange}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {(props.searchBooks.length) ? <Category
            books={props.searchBooks}
            handleChangeCategory={props.changeCategory}
          /> : null}
        </ol>
      </div>
    </div>
  )
}

Search.propTypes = {
  onTextCahange: PropTypes.func,
  searchBooks: PropTypes.array,
  changeCategory: PropTypes.func,
};

export default Search;
