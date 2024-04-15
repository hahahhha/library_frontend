import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import styles from './login.module.css';


function Login() {
    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            navigate("/main", { replace: true });
            return
        }
    }, [])

    const navigate = useNavigate();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loginClass, setLoginClass] = useState('');
    const [passwordClass, setPasswordClass] = useState('');

    const [isDataCorrect, setIsDataCorrect] = useState(true);

    const submit = async (evt) => {
        evt.preventDefault();
        if (login.length === 0 || password.length === 0) {
            setLoginClass('is-invalid');
            setPasswordClass('is-invalid');
            return
        } else {
            setLoginClass('');
            setPasswordClass('');
        }
        try {
            const response = await axios.post('http://localhost:5000/auth/login', {
                login: login,
                password: password
            });

            localStorage.setItem('access_token', response.data.token);

            navigate("/main", { replace: true });

        } catch (error) {
            setIsDataCorrect(false);
            setLoginClass('is-invalid');
            setPasswordClass('is-invalid');
        }
    };


    return (
        <div className={styles.bg}>
            <div className={`container ${styles.container} col-xl-10 col-xxl-8 px-4 py-5`}>
                <div className="row align-items-center g-lg-5 py-5">
                    <div className="col-lg-7 text-center text-lg-start ">
                        <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">Library21</h1>
                        <p className="col-lg-10 fs-4">
                            Библиотека21 - сайт для эффективного управления книгами, обеспечивающий удобный доступ к информации.
                        </p>
                    </div>
                    <div className="col-md-10 mx-auto col-lg-5">
                        <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary">

                            {isDataCorrect
                                ?
                                <h2 className="mb-4">Вход</h2>
                                :
                                <>
                                    <h2 className="mb-2">Вход</h2>
                                    <h6 style={{ color: '#ea0000' }}>Неправильно введен логин и/или пароль</h6>
                                </>
                            }
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className={`form-control ${loginClass}`}
                                    id="login"
                                    placeholder="Введите логин"
                                    value={login}
                                    onChange={(evt) => { setLogin(evt.target.value) }}
                                />
                                <label htmlFor="login">Логин</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="password"
                                    className={`form-control ${passwordClass}`}
                                    id="password"
                                    placeholder="Введите пароль"
                                    value={password}
                                    onChange={(evt) => { setPassword(evt.target.value) }}
                                />
                                <label htmlFor="password">Пароль</label>
                            </div>
                            <button className="w-100 btn btn-lg btn-primary" onClick={submit}>Войти</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
