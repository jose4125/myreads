import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {DebounceInput} from 'react-debounce-input';
import Category from './category';

function Search(props) {
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
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
