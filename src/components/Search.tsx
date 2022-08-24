import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IBook } from "../models/IBook";

import * as BookAPI from "../services/BooksAPI";
import BookItem from "./BookItem";

const Search = () => {
  const [inputSearch, setInputSearch] = useState<string>("");
  const [listSearch, setListSearch] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleCloseSearch = (): void => {
    navigate("/");
  };

  const handleSearchBook = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>): void => {
    setInputSearch(value);
    BookAPI.search(value)
      .then((res: IBook[]) => setListSearch(res))
      .catch((error: Error) => console.log(error));
  };

  const handleSelectShelf = (book: IBook, option: string) => {
    BookAPI.update(book, option)
      .then((res) => console.log(res))
      .catch((error: Error) => console.log(error));
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <button className="close-search" onClick={handleCloseSearch}>
          Close
        </button>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            value={inputSearch}
            placeholder="Search by title or author"
            onChange={handleSearchBook}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          <BookItem books={listSearch} handleSelectShelf={handleSelectShelf} />
        </ol>
      </div>
    </div>
  );
};

export default memo(Search);
