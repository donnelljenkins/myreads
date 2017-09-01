import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link, Route } from 'react-router-dom';
import './App.css'
import BookShelf from './BookShelf';
import SearchBooks from './SearchBooks';

const shelves = {
  currentlyReading: "currentlyReading",
  wantToRead: "wantToRead",
  read: "read",
}

class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    currentlyReadingBooks: [], 
    wantToReadBooks: [],
    readBooks: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      const currentlyReadingBooks = books.filter(book => {
        return book.shelf === shelves.currentlyReading;
      });

      const wantToReadBooks = books.filter(book => {
        return book.shelf === shelves.wantToRead;
      });

      const readBooks = books.filter(book => {
        return book.shelf === shelves.read;
      });

      this.setState({ allBooks: books, currentlyReadingBooks, wantToReadBooks, readBooks });
    });
  }

  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(updatedBook => {
      const oldShelf = book.shelf;
      
      book.shelf = shelf;

      this.setState(state => {
        const newState = {};

        newState[`${shelf}Books`] = state[`${shelf}Books`].concat([book]);
        newState[`${oldShelf}Books`] = state[`${oldShelf}Books`].filter(shelfBook => {
          return shelfBook.id !== book.id;
        });

        return newState;
      });
    });
  }

  searchBooks = (query) => {
    if (query) {
      BooksAPI.search(query).then((results) => {
        const books = results.error ? [] : results;
        this.setState({ books });
      });
    } else {
      this.setState({ books: [] });
    }
  }

  render() {
    const { books, currentlyReadingBooks, wantToReadBooks, readBooks } = this.state;

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookShelf title="Currently Reading" books={currentlyReadingBooks} onMoveBook={this.moveBook} />
                  <BookShelf title="Want to Read" books={wantToReadBooks} onMoveBook={this.moveBook} />
                  <BookShelf title="Read" books={readBooks} onMoveBook={this.moveBook} />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
        )} />

        <Route path="/search" render={() => (
          <SearchBooks books={books} onSearchBooks={this.searchBooks} />
          )} />
      </div>
    )
  }
}

export default BooksApp
