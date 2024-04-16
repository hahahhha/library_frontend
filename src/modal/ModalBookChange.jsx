import React, { useEffect } from 'react';
import Modal from './Modal';
import { useState } from 'react';
import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ModalBookChange(props) {
  let book = props.book;

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [keeper, setKeeper] = useState('');


  // useEffect для обновления данных при каждом изменении book
  useEffect(() => {
    setTitle(book.title);
    setAuthor(book.author);
    setYear(book.year);
    setKeeper(book.keeper);
  }, [book]);


  const changeBook = () => {
    const token = localStorage.getItem('access_token');
    axios
      .post(`http://5.35.85.215:5000/books/update/${token}`, {
        id: book._id,
        title, author, year, keeper
      })
      .then((response) => {
        toast.success("Книга успешно изменена");
        props.changeBook({
          ...book,
          title, author, year, keeper
        })
      })
      .catch((err) => {
        toast.error("Не удалось изменить книгу")
      });
  }

  return (
    <Modal title="Изменить книгу" submitText="Сохранить" cancelText="Закрыть" id="changeBookModal" submitFunc={changeBook} cleanFunc={() => { }}>
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

        <div className="mb-2">
          {/* Держатель книги тута */}
          <label htmlFor="keeperInput" className="form-label">У кого книга</label>

          <input type="text" className="form-control" id="keeperInput"
            onChange={(evt) => {
              setKeeper(evt.target.value);
            }}
            value={keeper}
          />

          {/* {
            isBookInLib
              ?
              // Если книга в библиотеке (Чекбокс checked)
              <input type="text" className="form-control" id="keeperInput" value="Библиотека" disabled />

              :
              // Если книга у кого-то на руках (Чекбокс unchecked)
              <input type="text" className="form-control" id="keeperInput"
                onChange={(evt) => {
                  setKeeper(evt.target.value);
                  console.log(evt.target.value);
                }}
                value={keeper}
              />
          } */}

          {/* Чекбокс тут */}


          {/* <div className="form-check mt-2">
            <input className="form-check-input" type="checkbox" id="isInLibraryCheck" checked={isBookInLib}
              onChange={(evt) => {
                setIsBookInLib(evt.target.checked);
              }}
            />
            <label className="form-check-label" htmlFor="isInLibraryCheck">
              Книга в библиотеке
            </label>
          </div> */}

        </div>
      </form>
    </Modal>
  )
}

export default ModalBookChange