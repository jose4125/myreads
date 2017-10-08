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
      id: 'wantToRead',
      title: 'Want to Read',
      books: props.wantToRead
    },
    {
      id: 'read',
      title: 'Read',
      books: props.read
    },
  ]
  
  const filterBooks = (shelf) => {
    return Object.keys(props.allBooks)
    .map(key => {
      return props.allBooks[key];
    })
    .filter(book => {
      return  shelf.id === book.shelf
    })
  }
  
  const renderShelves = (shelf) => (
    <Category
      headline={shelf.title}
      books={filterBooks(shelf)}
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
