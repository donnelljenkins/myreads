import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import * as BooksAPI from "./BooksAPI";
import BookList from "./BookList";
import SearchBooks from "./SearchBooks";

class BooksApp extends Component {
  state = {
    books: [],
    query: "",
    queryResults: []
  };

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks() {
    return BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  moveBook(bookToMove, shelf) {
    return BooksAPI.update(bookToMove, shelf).then(updatedBook => {
      return this.getAllBooks().then(() => {
        return Promise.resolve(updatedBook);
      });
    });
  }

  searchBooks(query) {
    if (query) {
      BooksAPI.search(query).then(results => {
        const queryResults = results.error ? [] : results;
        this.setState({ queryResults });
      });
    } else {
      this.setState({ queryResults: [] });
    }
  }

  updateQuery(query) {
    this.setState({ query: query.trim() });

    this.searchBooks(query);
  }

  render() {
    const { books, query, queryResults } = this.state;

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <BookList
              books={books}
              onMoveBook={(book, shelf) => this.moveBook(book, shelf)}
            />
          )}
        />

        <Route
          path="/search"
          render={() => (
            <SearchBooks
              books={books}
              query={query}
              queryResults={queryResults}
              onMoveBook={(bookToMove, shelf) => {
                this.moveBook(bookToMove, shelf).then(updatedBook => {
                  const updatedBooks = queryResults.slice(0);

                  const movedBook = updatedBooks.find(
                    book => book.id === updatedBook.id
                  );

                  if (movedBook) {
                    movedBook.shelf = shelf;
                  }

                  this.setState({ queryResults: updatedBooks });
                });
              }}
              onUpdateQuery={query => {
                this.updateQuery(query);
              }}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
