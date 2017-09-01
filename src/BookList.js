import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";
import shelves from "./shelves";

class BookList extends Component {
  render() {
    const { books, onMoveBook } = this.props;

    const currentlyReadingBooks = books.filter(book => {
      return book.shelf === shelves.currentlyReading;
    });

    const wantToReadBooks = books.filter(book => {
      return book.shelf === shelves.wantToRead;
    });

    const readBooks = books.filter(book => {
      return book.shelf === shelves.read;
    });

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              title="Currently Reading"
              books={currentlyReadingBooks}
              onMoveBook={onMoveBook}
            />
            <BookShelf
              title="Want to Read"
              books={wantToReadBooks}
              onMoveBook={onMoveBook}
            />
            <BookShelf title="Read" books={readBooks} onMoveBook={onMoveBook} />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default BookList;
