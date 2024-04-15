import axios from 'axios';
import React, { useEffect, useState } from 'react'

import Header from '../../header/Header'
import SearchInput from '../../searchInput/SearchInput';
import AuthError from '../../authError/AuthError';

import ModalBook from '../../modal/ModalBook';
import ModalBookChange from '../../modal/ModalBookChange';

function Books() {
  // поле для динамического модального окна
  const [currentBook, setCurrentBook] = useState({});
  const [currentBookIndex, setCurrentBookIndex] = useState();

  const token = localStorage.getItem('access_token');
  if (!token) {
    return <AuthError />
  }

  const [onlyLibSearch, setOnlyLibSearch] = useState(false);

  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  // useEffect для запроса
  useEffect(() => {
    try {
      // доделать проверку на админа
    } catch (error) {
      
    }

    axios
      .get(`http://localhost:5000/books/all/${token}`)
      .then((response) => {
        setBooks(response.data.books);
        setFilteredBooks(response.data.books);
      })
      .catch((err) => {
        console.log('ошибка при отправке запроса в файле Books.jsx');
      });
  }, []);

  const changeBook = (newBook) => {
    let toChangeBooks = [...filteredBooks];
    toChangeBooks[currentBookIndex] = { ...newBook };
    setFilteredBooks([...toChangeBooks]);
  }

  return (
    <div className='container'>
      <Header />

      <h1>Список книг</h1>
      <div className='border-bottom' style={{ width: 400 }}>
        <SearchInput books={books} setBooks={setFilteredBooks} onlyLibSearch={onlyLibSearch} />

        <div className="my-3 form-check">
          <input type="checkbox" className="form-check-input" id="onlyAviableSearch"
            checked={onlyLibSearch}
            onChange={() => {
              setOnlyLibSearch(!onlyLibSearch);
            }}
          />
          <label className="form-check-label" htmlFor="onlyAviableSearch">
            Искать только среди книг в библиотеке
          </label>
        </div>

        <button className="btn btn-primary mt-1 mb-3" data-bs-toggle="modal" data-bs-target="#addBookModal">
          Добавить книгу
        </button>

      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Год</th>
            <th scope="col">Автор</th>
            <th scope="col">Название</th>
            <th scope="col">Логин держателя</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {
            filteredBooks.map((item, index) => (
              <tr key={index}>
                <th scope="row">{item.year}</th>
                <td>{item.author}</td>
                <td>{item.title}</td>
                <td>{item.keeper}</td>
                <td>
                  <a href="" className='link-opacity-100' data-bs-toggle="modal" data-bs-target="#changeBookModal"
                    onClick={() => {
                      setCurrentBook(item);
                      setCurrentBookIndex(index);
                    }}
                  >
                    Изменить
                  </a>
                </td>
              </tr>
            ))
          }

        </tbody>
      </table>
      <ModalBookChange book={currentBook} changeBook={changeBook} />
      <ModalBook />
    </div>
  )
}


export default Books