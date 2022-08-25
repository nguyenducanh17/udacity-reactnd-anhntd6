import React, { memo, useEffect, useState } from "react";
import * as BookAPI from "../services/BooksAPI";
import { IBook } from "../models/IBook";
import BookItem from "./BookItem";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "../hooks/useSessionStorage";

const LABEL_NAME: Array<{ key: string; label: string }> = [
  {
    key: "currentlyReading",
    label: "Currently Reading",
  },
  {
    key: "wantToRead",
    label: "Want to Read",
  },
  {
    key: "read",
    label: "Read",
  },
];

interface initialState {
  read: Array<any>;
  currentlyReading: Array<any>;
  wantToRead: Array<any>;
}

const BookList = (): JSX.Element => {
  const [listBooks, setListBooks] = useState<initialState>({
    read: [],
    currentlyReading: [],
    wantToRead: [],
  });
  const navigate = useNavigate();
  const [, setStorageBook] = useSessionStorage("books");

  useEffect(() => {
    getAllBooks();
  }, []);

  const getAllBooks = () => {
    BookAPI.getAll()
      .then((res: IBook[]) => {
        const read = filterBookByShelf(res, "read");
        const currentlyReading = filterBookByShelf(res, "currentlyReading");
        const wantToRead = filterBookByShelf(res, "wantToRead");
        setListBooks((preState: initialState) => {
          return {
            ...preState,
            read,
            currentlyReading,
            wantToRead,
          };
        });
        setStorageBook(res);
      })
      .catch((err: Error) => console.error(err));
  };

  const filterBookByShelf = (dataSource: IBook[], shelf: string) => {
    return dataSource.filter((book: IBook) => book.shelf === shelf);
  };

  const handleSelectShelf = (book: IBook, option: string) => {
    BookAPI.update(book, option).then(() => getAllBooks());
  };

  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {LABEL_NAME.map(
              ({ key, label }: { key: string; label: string }) => {
                return (
                  <div className="bookshelf" key={key}>
                    <h2 className="bookshelf-title">{label}</h2>
                    <BookItem
                      books={(listBooks as any)[key]}
                      handleSelectShelf={handleSelectShelf}
                    />
                  </div>
                );
              }
            )}
          </div>
        </div>
        <div className="open-search">
          <button onClick={() => navigate("/search")}>Add a book</button>
        </div>
      </div>
    </div>
  );
};

export default memo(BookList);
