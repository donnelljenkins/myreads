import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Book from './Book';

class SearchBooks extends Component {
  state = {
    query: ''
  }

  updateQuery(query) {
    const newState = { query: query.trim() };

    this.setState(newState);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.props.onSearchBooks(this.state.query);
    }
  }

  render() {
    const { books } = this.props;

    return (<div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/" >Close</Link>
        <div className="search-books-input-wrapper">
          {/* 
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
            
            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
          <input type="text"
            placeholder="Search by title or author"
            value={this.state.query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
              <Book book={book} />
            </li>
          )
          )}
        </ol>
      </div>
    </div>);
  }
}

export default SearchBooks;