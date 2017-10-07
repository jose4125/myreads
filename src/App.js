import React from 'react'
import {Route} from 'react-router';
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { getAll, search } from './BooksAPI'

import Search from './components/search';
import ListBooks from './components/listBooks';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.changeCategory = this.changeCategory.bind(this);
    this.onTextCahange = this.onTextCahange.bind(this);

    this.state = {
      allBooks: {},
      currentlyReading: [],
      wantToRead: [],
      read: [],
      none: [],
      showSearchPage: false,
      searchValue: '',
      searchBooks: [],
    }
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
      if (book.shelf) {
        prevState[book.shelf] = this.removeBook(book.shelf, book.id);
      }
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
        <Route path='/search' component={() => (
          <Search
            onTextCahange={this.onTextCahange}
            searchBooks={this.state.searchBooks}
            changeCategory={this.changeCategory}
          />
        )} />
        <Route exact path='/' render={() => (
          <ListBooks
            currentlyReading={this.state.currentlyReading}
            wantToRead={this.state.wantToRead}
            read={this.state.read}
            changeCategory={this.changeCategory}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
