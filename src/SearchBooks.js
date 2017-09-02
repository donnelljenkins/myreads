import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Book from "./Book";
import shelves from "./shelves";

class SearchBooks extends Component {
  render() {
    const {
      books,
      onMoveBook,
      onUpdateQuery,
      query,
      queryResults
    } = this.props;
    const foundBooks = [];

    if (!queryResults.error) {
      queryResults.forEach(queryResult => {
        const bookOnShelf = books.find(book => book.id === queryResult.id);
        const shelf = bookOnShelf ? bookOnShelf.shelf : shelves.none;
        const result = Object.assign(queryResult, { shelf });

        foundBooks.push(result);
      });
    }

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
            {queryResults.error && <span>No books found</span>}
            {!queryResults.error &&
              foundBooks.map(book => (
                <li key={book.id}>
                  <Book
                    book={book}
                    onMoveBook={onMoveBook}
                    width={128}
                    height={193}
                  />
                </li>
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

SearchBooks.propTypes = {
  books: PropTypes.array.isRequired,
  onMoveBook: PropTypes.func,
  onUpdateQuery: PropTypes.func,
  query: PropTypes.string.isRequired,
  queryResults: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default SearchBooks;
