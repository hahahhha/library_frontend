import React from 'react';
import { useNavigate } from "react-router-dom";

import Header from '../../header/Header'
import ModalStudent from '../../modal/ModalStudent';
import ModalBook from '../../modal/ModalBook'


function Admin() {
  const navigate = useNavigate();

  const booksList = () => {
    navigate('/books', { replace: false });
  }

  return (
    <>
      <div className="container">
        <Header />
        <div className="p-5 mb-4 bg-body-tertiary rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">Управление книгами</h1>
            <p className="col-md-8 fs-4">
              Перейдя на страницу, вы можете увидеть список всех книг библиотеки и найти интересующую вас книгу.
            </p>
            <button
              className="btn btn-primary btn-lg"
              type="button"
              onClick={booksList}
            >
              Перейти
            </button>
          </div>
        </div>

        <div className="row align-items-md-stretch">
          <div className="col-md-6">
            <div className="h-100 p-5 text-bg-dark rounded-3">
              <h2>Добавить книгу</h2>
              <p>
                Нажмите на кнопку ниже, чтобы добавить новую книгу в библиотеку
              </p>

              <button className="btn btn-outline-light" type="button" data-bs-toggle="modal" data-bs-target="#addBookModal">
                Добавить книгу
              </button>


            </div>
          </div>

          <div className="col-md-6">
            <div className="h-100 p-5 bg-body-tertiary border rounded-3">
              <h2>Добавить ученика</h2>
              <p>
                Во всплывающем окне вы сможете добавить нового пользователя библиотеки.
              </p>

              {/* Кнопка триггер для модального окна добавления ученика*/}
              <button className="btn btn-outline-secondary" type="button" data-bs-toggle="modal" data-bs-target="#addStudentModal">
                Добавить ученика
              </button>


            </div>
          </div>
        </div>

        <footer className="pt-3 mt-4 text-body-secondary border-top">
          © 2024
        </footer>
      </div>

      {/* Модальные окна */}
      <ModalStudent />
      <ModalBook />

      
    </>
  )
}

export default Admin