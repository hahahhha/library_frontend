import React, { useState } from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Modal from './Modal';
import axios from 'axios';

function ModalBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');

  const token = localStorage.getItem('access_token');
  const keeper = "Библиотека"

  const addBook = () => {
    console.log('add')
    axios
      .patch(`http://localhost:5000/books/${token}`, {
        title, author, year, keeper
      })
      .then(() => {
        toast.success('Книга добавлена')
      })
      .catch((err) => {
        toast.error('Не удалось добавить книгу')
      })
  }

  const cleanForm = () => {
    setTitle('');
    setAuthor('');
    setYear('');
    console.log('clean')
  }

  return (
    <Modal title="Добавить книгу" submitText="Добавить" cancelText="Закрыть" id="addBookModal" submitFunc={addBook} cleanFunc={cleanForm}>
      <form>
        <div className="mb-2">
          <div className="row">
            <div className="col-9">
              <label htmlFor="nameInput" className="form-label">Название</label>
              <input type="text" className="form-control" id="nameInput"
                onChange={(evt) => { setTitle(evt.target.value) }}
                value={title}
              />
            </div>

            <div className="col">
              <label htmlFor="classInput" className="form-label">Год</label>
              <input type="number" className="form-control" id="classInput"
                onChange={(evt) => { setYear(evt.target.value) }}
                value={year}
              />
            </div>
          </div>

        </div>

        <div className="mb-2">
          <label htmlFor="surnameInput" className="form-label">Автор</label>
          <input type="text" className="form-control" id="surnameInput"
            onChange={(evt) => { setAuthor(evt.target.value) }}
            value={author}
          />
        </div>
      </form>
    </Modal>
  )
}

export default ModalBook