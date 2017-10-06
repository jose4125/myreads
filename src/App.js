import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { getAll, search } from './BooksAPI'

import Category from './components/category';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    allBooks: {},
    currentlyReading: [],
    wantToRead: [],
    read: [],
    showSearchPage: false,
    searchValue: '',
    searchBooks: [],
  }
  
  constructor(props) {
    super(props);
    this.changeCategory = this.changeCategory.bind(this);
    this.onTextCahange = this.onTextCahange.bind(this);
  }
  
  objectBooks(res) {
    res.forEach(book => {
      this.setState((prevState) => {
        prevState.allBooks[book.id] = book;
      })
    })
  }
  
  filterByCategory(category, res) {
    return res.filter(book => book.shelf === category)
  }
  
  componentDidMount() {
    getAll().then((res) => {
      this.objectBooks(res);
      this.setState((prevState) => ({
        currentlyReading: this.filterByCategory('currentlyReading', res),
        wantToRead: this.filterByCategory('wantToRead', res),
        read: this.filterByCategory('read', res),
      }))
    });
  }
  
  removeBook(category, id) {
    return this.state[category].filter((book) => book.id !== id);
  }
  
  changeCategory(category, book) {
    this.setState((prevState) => {
      prevState[book.shelf] = this.removeBook(book.shelf, book.id);
      prevState[category] = prevState[category].concat(book);
      book.shelf = category;
    })
    
  }
  
  addShelf(res) {
    return res.map(book => {
      if(book.id in this.state.allBooks) {
        book.shelf = this.state.allBooks[book.id].shelf
      }
      return book;
    })
  }
  
  onTextCahange(event) {
    this.setState({searchValue: event.target.value})
    search(this.state.searchValue).then((res) => {
      if (res && !res.error) {
        this.setState({searchBooks: this.addShelf(res)})
      }
      
    });
    
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input
                  type="text"
                  placeholder="Search by title or author"
                  value={this.state.searchValue}
                  onChange={this.onTextCahange}
                />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {(this.state.searchBooks.length) ? <Category
                  books={this.state.searchBooks}
                  handleChangeCategory={this.changeCategory}
                /> : null}
              </ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Category
                  headline="Currently Reading"
                  books={this.state.currentlyReading}
                  handleChangeCategory={this.changeCategory}
                />
                <Category
                  headline="Want to Read"
                  books={this.state.wantToRead}
                  handleChangeCategory={this.changeCategory}
                />
                <Category
                  headline="Read"
                  books={this.state.read}
                  handleChangeCategory={this.changeCategory}
                />
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
