import React from 'react';
import PropTypes from 'prop-types';

import Book from './book';

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.renderBook = this.renderBook.bind(this);
  }
  renderBook(book) {
    return <Book
      info={book}
      onChange={(event) => this.props.handleChangeCategory(event.target.value, book)}
      key={book.id}
  />
  }
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.headline}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map(this.renderBook)}
          </ol>
        </div>
      </div>
    )
  }
}

Category.propTypes = {
  handleChangeCategory: PropTypes.func,
  books: PropTypes.array,
  headline: PropTypes.string,
}

export default Category;
