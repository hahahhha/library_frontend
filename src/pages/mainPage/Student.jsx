import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Header from '../../header/Header.jsx';
import StudentSearchInput from '../../searchInput/studentSearchInput.jsx';
import ServerError from '../../serverError/ServerError.jsx';

function Student() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  let isServerError = false;
  const token = localStorage.getItem('access_token');
  // добавить везде проверку на авторизацию и выделить ей в отдельное место
  useEffect(() => {
    axios
      .get(`http://5.35.85.215:5000/books/aviable/${token}`)
      .then((response) => {
        console.log(response.data.books)
        setBooks([...response.data.books]);
        setFilteredBooks([...response.data.books]);
      })
      .catch((err) => {
        console.log(err);
        isServerError = true;
      })
  }, [])

  if (isServerError) {
    return <ServerError />
  }

  return (
    <>
      <div className='container'>
        <Header />

        <h1 className='mb-4'>Список книг</h1>
        <div style={{ width: 400 }}>
          <StudentSearchInput books={books} setBooks={setFilteredBooks} />

        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Автор</th>
              <th scope="col">Год</th>
              <th scope="col">Название</th>
            </tr>
          </thead>
          <tbody>
            {
              filteredBooks.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{item.year}</th>
                  <td>{item.author}</td>
                  <td>{item.title}</td>
                </tr>
              ))
            }

          </tbody>
        </table>
      </div>
    </>

  )
}

export default Student