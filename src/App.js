import React from 'react'
import {Route} from 'react-router';
import { withRouter } from 'react-router-dom';
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { getAll, search, update } from './BooksAPI'

import Search from './components/search';
import ListBooks from './components/listBooks';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.changeCategory = this.changeCategory.bind(this);
    this.onTextCahange = this.onTextCahange.bind(this);
    this.goBack = this.goBack.bind(this);

    this.state = {
      allBooks: {},
      searchValue: '',
      searchBooks: {},
    }
  }
  
  objectBooks(res) {
    let allBooksObj = {};
    res.forEach(book => {
      allBooksObj[book.id] = book;
    })
    return allBooksObj;
  }
  
  filterByCategory(category, res) {
    return res.filter(book => book.shelf === category)
  }
  
  componentDidMount() {
    getAll().then((res) => {
      this.setState({allBooks: this.objectBooks(res)})
    });
  }
  
  removeBook(category, id) {
    return this.state[category].filter((book) => book.id !== id);
  }
  
  changeCategory(category, book) {
    (book.shelf !== category && update(book, category).then((res) => {
  
      this.setState((prevState) => {
        let bookInAllBooks = prevState.allBooks[book.id];
        let bookInSearchBooks = prevState.searchBooks[book.id];

        if(bookInAllBooks){
          bookInAllBooks.shelf = category;
        } else {
          bookInAllBooks = book;
          bookInAllBooks = category;
        }
        
        if(bookInSearchBooks) {
          bookInSearchBooks.shelf = category;
        }
  
        if(category === 'none') {
          console.log('state', prevState)
          return Object.assign({}, prevState, {
            allBooks: Object.keys(prevState.allBooks).reduce((result, key) => {
              if (key !== book.id) {
                result[key] = prevState.allBooks[key];
              }
              return result;
            }, {})
          });
        }
      });
    }))
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
        this.setState({searchBooks: this.objectBooks(this.addShelf(res))})
      }
      
    });
    
  }
  
  goBack(event) {
    event.preventDefault();
    this.setState({searchBooks: {}});
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' component={() => (
          <Search
            onTextCahange={this.onTextCahange}
            searchBooks={this.state.searchBooks}
            changeCategory={this.changeCategory}
            back={this.goBack}
          />
        )} />
        <Route exact path='/' render={() => (
          <ListBooks
            allBooks={this.state.allBooks}
            changeCategory={this.changeCategory}
          />
        )} />
      </div>
    )
  }
}

export default withRouter(BooksApp)
