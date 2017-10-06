import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Category from './category';

function ListBooks(props) {

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Category
            headline="Currently Reading"
            books={props.currentlyReading}
            handleChangeCategory={props.changeCategory}
          />
          <Category
            headline="Want to Read"
            books={props.wantToRead}
            handleChangeCategory={props.changeCategory}
          />
          <Category
            headline="Read"
            books={props.read}
            handleChangeCategory={props.changeCategory}
          />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  )
}

ListBooks.propTypes = {
  currentlyReading: PropTypes.array,
  wantToRead: PropTypes.array,
  read: PropTypes.array,
  changeCategory: PropTypes.func,
};

export default ListBooks;
