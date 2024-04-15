import React from 'react';
import styles from './header.module.css';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const exitButtonClick = () => {
    localStorage.removeItem('access_token');
    navigate("/", { replace: true });
  }

  return (
    <div className={styles.header}>
      <Link className={styles.title} to="/main">Library21</Link>

      <div className={styles.btnsBlock}>
        <Link className="btn btn-primary" to="/profile">Мой профиль</Link>

        <button
          className='btn btn-secondary px-3'
          onClick={exitButtonClick}
        >
          Выйти
        </button>
      </div>

    </div>
  )
}

export default Header