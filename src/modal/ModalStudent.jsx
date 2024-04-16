import React from 'react';
import axios from 'axios';
import AuthError from '../authError/AuthError';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

function ModalStudent() {
  const token = localStorage.getItem('access_token');

  const [name, setName] = useState('');
  const [classNum, setClassNum] = useState();
  const [surname, setSurname] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  let isAuthError = false;

  if (!token) {
    isAuthError = true;
  }

  const cleanForm = () => {
    setName('');
    setClassNum();
    setSurname('');
    setLogin('');
    setPassword('');
  }

  const checkForm = () => {
    
  }

  const addStudentClick = () => {
    axios
      .post(`http://5.35.85.215:5000/auth/reg/${token}`, {
        name,
        surname,
        password,
        login,
        classObj: classNum
      })
      .then((response) => {
        cleanForm();
        toast.success("Ученик успешно добавлен", { autoClose: 1800 });
      })
      .catch((err) => {
        if (err.response.status == 401) {
          toast.error("Данный логин уже занят, придумайте другой", { autoClose: 3100 })
        } 
        else {
          toast.error("Не удалось добавить ученика", { autoClose: 2750 })
        }
      })

  }

  if (isAuthError) {
    return <AuthError />
  }

  return (
    <>
      {/* Модальное окно */}
      <div className="modal fade" id="addStudentModal" tabIndex="-1" aria-labelledby="addStudentModal" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addStudentModal">Добавление ученика</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-2">
                  <div className="row">
                    <div className="col-9">
                      <label htmlFor="nameInput" className="form-label">Имя</label>
                      <input type="text" className="form-control" id="nameInput"
                        onChange={(evt) => { setName(evt.target.value) }}
                        value={name}
                      />
                    </div>

                    <div className="col">
                      <label htmlFor="classInput" className="form-label">Класс</label>
                      <input type="number" className="form-control" id="classInput"
                        onChange={(evt) => { setClassNum(Number(evt.target.value)) }}
                        value={classNum}
                      />
                    </div>
                  </div>

                </div>

                <div className="mb-2">
                  <label htmlFor="surnameInput" className="form-label">Фамилия</label>
                  <input type="text" className="form-control" id="surnameInput"
                    onChange={(evt) => { setSurname(evt.target.value) }}
                    value={surname}
                  />
                </div>

                <div className="mb-2">
                  <label htmlFor="loginInput" className="form-label">Придумайте логин</label>
                  <input type="text" className="form-control" id="loginInput"
                    onChange={(evt) => { setLogin(evt.target.value) }}
                    value={login}
                  />
                </div>

                <div className="mb-2">
                  <label htmlFor="passwordInput" className="form-label">Придумайте пароль</label>
                  <input type="password" className="form-control" id="passwordInput"
                    onChange={(evt) => { setPassword(evt.target.value) }}
                    value={password}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={addStudentClick}>Добавить ученика</button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default ModalStudent