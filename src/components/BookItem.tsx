import React, { memo } from "react";
import { IBook } from "../models/IBook";

interface Props {
  books: IBook[];
  handleSelectShelf: (book: IBook, option: any) => any;
}

const BookItem = ({ books, handleSelectShelf }: Props): JSX.Element => {
  return (
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books &&
          books.map((book: IBook) => {
            const backgroundImage = book.imageLinks
              ? book.imageLinks?.smallThumbnail
              : null;
            return (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${backgroundImage})`,
                      }}
                    ></div>
                    <div className="book-shelf-changer">
                      <select
                        onChange={(e) =>
                          handleSelectShelf(book, e.target.value)
                        }
                        value={book.shelf}
                      >
                        <option value="move" disabled>
                          Move to...
                        </option>
                        <option value="currentlyReading">
                          Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
            );
          })}
      </ol>
    </div>
  );
};

export default memo(BookItem);
