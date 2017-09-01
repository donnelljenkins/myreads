import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import shelves from "./shelves";

class SearchBooks extends Component {
  render() {
    const { books, onMoveBook, onUpdateQuery, query } = this.props;
    const queryResults = [];

    this.props.queryResults.forEach(queryResult => {
      const bookOnShelf = books.find(book => book.id === queryResult.id);
      const shelf = bookOnShelf ? bookOnShelf.shelf : shelves.none;
      const result = Object.assign(queryResult, { shelf });

      queryResults.push(result);
    });

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={event => onUpdateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {queryResults.map(book => (
              <li key={book.id}>
                <Book book={book} onMoveBook={onMoveBook} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
