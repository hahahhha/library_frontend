import React, { useEffect, useState } from 'react';
// import axios from "axios";
import { findByTitle, findByAuthor, findByYear } from './SearchFunctions.js';


function StudentSearchInput(props) {
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


  const { books, setBooks } = props;

  const origBooks = [...books];

  const filterBooksClick = () => {
    if (searchOption == options.year) {
      const currentYear = searchText;
      setBooks(findByYear(origBooks, currentYear));
    } else if (searchOption == options.author) {
      const currentAuthor = searchText;
      setBooks(findByAuthor(origBooks, currentAuthor))
    } else if (searchOption == options.title) {
      const currentTitle = searchText;
      setBooks(findByTitle(origBooks, currentTitle));
    } else {
      setBooks([...origBooks]);
    }
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
                setSearchBtnText('Поиск по автору');
              }}>
              по автору
            </a>
          </li>
          <li>
            <a className="dropdown-item"
              onClick={() => {
                setSearchOption(options.title);
                setSearchBtnText('Поиск по названию')
              }}>
              по названию
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

export default StudentSearchInput