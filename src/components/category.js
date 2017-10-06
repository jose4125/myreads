import React from 'react';
import PropTypes from 'prop-types';

import Book from './book';

function Category ({headline, books, handleChangeCategory}) {

  const renderBook = (book) => {
    return <Book
      info={book}
      onChange={(event) => handleChangeCategory(event.target.value, book)}
      key={book.id}
    />
  };

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{headline}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(renderBook)}
        </ol>
      </div>
    </div>
  )
}

Category.propTypes = {
  handleChangeCategory: PropTypes.func,
  books: PropTypes.array,
  headline: PropTypes.string,
};

export default Category;
