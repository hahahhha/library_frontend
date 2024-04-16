import React, { useEffect, useState } from 'react';
import axios from 'axios';

import AuthError from '../../authError/AuthError';
import ServerError from '../../serverError/ServerError';
import Header from '../../header/Header';

import styles from './profile.module.css';

function Profile() {
  let isServerError = false;

  const token = localStorage.getItem('access_token');

  const [user, setUser] = useState({});
  const [books, setBooks] = useState([]);

  if (!token) {
    return <AuthError />
  }

  // getting user
  useEffect(() => {
    // user's data
    axios
      .get(`http://5.35.85.215:5000/users/me/${token}`)
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((err) => {
        console.log(err);
        isServerError = true;
      });

    // books
    axios
      .get(`http://5.35.85.215:5000/books/my/${token}`)
      .then((response) => {
        setBooks(response.data.books);
      })
      .catch((err) => {
        console.log(err);
        isServerError = true;
      });
  }, [])



  if (isServerError) {
    return <ServerError />
  }

  return (
    <div className='container'>

      <Header />

      <div className={`${styles.mainblock}`}>
        <div className={`${styles.profilediv} p-4`}>

          <div className={`${styles.start}`}>
            <h2 className='ms-2 border-bottom'>Пользователь</h2>
            <div className='ms-2 p-0'>
              <div>
                <label htmlFor="">Имя</label>
                <h4>{user.name}</h4>
              </div>
              <div>
                <label htmlFor="">Фамилия</label>
                <h4>{user.surname}</h4>
              </div>
              <div>
                <label htmlFor="">Логин</label>
                <h4>{user.login}</h4>
              </div>
            </div>
          </div>

          <div className={`${styles.end}`}>
            <div className='ms-2'>
              <h2>Взятые книги</h2>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Автор</th>
                    <th scope="col">Название</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    books.map((book, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{book.author}</td>
                        <td>{book.title}</td>
                      </tr>
                    ))

                  }
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Profile