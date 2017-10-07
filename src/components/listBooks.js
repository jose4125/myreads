import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Category from './category';

function ListBooks(props) {
  const shelves = [
    {
      id: 'currentlyReading',
      title: 'Currently Reading',
      books: props.currentlyReading
    },
    {
      id: 'wantToREad',
      title: 'Want to Read',
      books: props.wantToRead
    },
    {
      id: 'read',
      title: 'Read',
      books: props.read
    },
  ]
  
  const renderShelves = (shelf) => (
    <Category
      headline={shelf.title}
      books={shelf.books}
      handleChangeCategory={props.changeCategory}
      key={shelf.id}
    />
  )

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelves.map(renderShelves)}
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
