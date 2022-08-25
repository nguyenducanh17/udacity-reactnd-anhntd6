import React, { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useHook";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { IBook } from "../models/IBook";

import * as BookAPI from "../services/BooksAPI";
import BookItem from "./BookItem";

const Search = () => {
  const [inputSearch, setInputSearch] = useState<string>("");
  const [listSearch, setListSearch] = useState<any[]>([]);
  const navigate = useNavigate();
  const [storageBook] = useSessionStorage("books");
  const debounceInputSearch = useDebounce<string>(inputSearch, 500);

  useEffect(() => {
    if (debounceInputSearch) {
      BookAPI.search(debounceInputSearch)
        .then((book: IBook[]) =>
          setListSearch(
            book.map((item: IBook) => {
              const shelfName = (storageBook as IBook[]).find(
                (sb: IBook) => sb.id === item.id
              )?.shelf;
              return {
                ...item,
                shelf: shelfName ? shelfName : "none",
              };
            })
          )
        )
        .catch((error: Error) => console.log(error));
    }
  }, [debounceInputSearch]);

  const handleCloseSearch = (): void => {
    navigate("/");
  };

  const handleSearchBook = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>): void => {
    setInputSearch(value);
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
          {(listSearch as any)?.error ? (
            "No results found"
          ) : (
            <BookItem
              books={listSearch}
              handleSelectShelf={handleSelectShelf}
            />
          )}
        </ol>
      </div>
    </div>
  );
};

export default memo(Search);
