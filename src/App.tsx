import React from "react";
import BookList from "./components/BookList";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Search from "./components/Search";

const App = (): JSX.Element => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
