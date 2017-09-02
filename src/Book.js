import React, { Component } from "react";
import PropTypes from "prop-types";

class Book extends Component {
  handleChange(event) {
    this.props.onMoveBook(this.props.book, event.target.value);
  }

  render() {
    const { book, height, width } = this.props;

    return (
      <div className="book">
        <div className="book-top">
          {book.imageLinks && (
            <div
              className="book-cover"
              style={{
                width: width,
                height: height,
                backgroundImage: `url(${book.imageLinks.smallThumbnail})`
              }}
            />
          )}
          <div className="book-shelf-changer">
            <select onChange={this.handleChange.bind(this)} value={book.shelf}>
              <option value="none" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors ? book.authors.join(", ") : ""}
        </div>
      </div>
    );
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
};

export default Book;
