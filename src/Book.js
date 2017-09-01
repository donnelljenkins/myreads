import React, { Component } from 'react'

class Book extends Component {
  handleChange(event) {
    this.props.onMoveBook(this.props.book, event.target.value);
  }

  render() {
    const { book } = this.props;

    return (
      <div className="book">
          <div className="book-top">
          {book.imageLinks && (<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>)}
          <div className="book-shelf-changer">
              <select onChange={this.handleChange.bind(this)} value={book.shelf}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
              </select>
          </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div>
      </div>
      )
  }
}

export default Book;