import React, { useEffect, useState } from 'react';
import axios from "axios";

import { findByTitle, findByAuthor, findByYear, findByKeeper } from './SearchFunctions.js';


function SearchInput(props) {
  const token = localStorage.getItem('access_token');
  const options = {
    year: 0,
    author: 1,
    title: 2,
    keeper: 3,
    all: 4
  }
  // states
  const [searchBtnText, setSearchBtnText] = useState('Поиск...');
  const [searchOption, setSearchOption] = useState(options.all);
  const [searchText, setSearchText] = useState('');

  const isOnlyAviableBooksSearch = props.onlyLibSearch;

  const { books, setBooks } = props;

  const origBooks = [...books];


  const filterBooksClick = () => {
    axios
      .get(`http://5.35.85.215:5000/books/all/${token}`)
      .then((response) => {
        let toSearchBooks = response.data.books;
        if (isOnlyAviableBooksSearch) {
          toSearchBooks = [];
          for (let i = 0; i < origBooks.length; i++) {
            if (origBooks[i].keeper == 'Библиотека') {
              toSearchBooks.push(origBooks[i]);
            }
          }
        }

        if (searchOption == options.year) {
          const currentYear = searchText;
          setBooks(findByYear(toSearchBooks, currentYear));
        } else if (searchOption == options.author) {
          const currentAuthor = searchText;
          setBooks(findByAuthor(toSearchBooks, currentAuthor))
        } else if (searchOption == options.title) {
          const currentTitle = searchText;
          setBooks(findByTitle(toSearchBooks, currentTitle));
        } else if (searchOption == options.keeper) {
          const currentKeeper = searchText;
          setBooks(findByKeeper(toSearchBooks, currentKeeper));
        } else {
          setBooks([...toSearchBooks]);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }


  return (
    <>
      <div className="input-group my-3">
        <input type="text" className="form-control" aria-label="Text input with segmented dropdown button"
          placeholder='Введите поисковый запрос'
          value={searchText}
          onChange={(evt) => { setSearchText(evt.target.value) }}
        />
        {/* Кнопка поиска тута */}
        <button onClick={filterBooksClick} type="button" className="btn btn-outline-secondary">{searchBtnText}</button>
        <button type="button" className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown"
          aria-expanded="false">
          <span className="visually-hidden"></span>
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
          <li>
            <a className="dropdown-item" onClick={() => {
              setSearchOption(options.year);
              console.log('year');
              setSearchBtnText('Поиск по году');
            }}>
              по году
            </a>
          </li>

          <li>
            <a className="dropdown-item"
              onClick={() => {
                setSearchOption(options.author);
                console.log('author');
                setSearchBtnText('Поиск по автору');
              }}>
              по автору
            </a>
          </li>
          <li>
            <a className="dropdown-item"
              onClick={() => {
                setSearchOption(options.title);
                console.log('title');
                setSearchBtnText('Поиск по названию')
              }}>
              по названию
            </a>
          </li>
          <li>
            <a className="dropdown-item"
              onClick={() => {
                setSearchOption(options.keeper);
                console.log('keeper');
                setSearchBtnText('Поиск по держателю книги')
              }}>
              по держателю книги
            </a>
          </li>
          <li><hr className="dropdown-divider" /></li>
          <li><a className="dropdown-item"
            onClick={() => {
              setSearchBtnText('Поиск...');
              setBooks([...origBooks]);
              setSearchText('');
            }}>
            Показать все книги
          </a></li>
        </ul>
      </div>
    </>
  )
}

export default SearchInput