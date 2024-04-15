import React from 'react'

function AuthError() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: 34 }}>Вы не авторизованы</h1>
      <a href="/" style={{ fontSize: 20 }}
        onClick={() => { localStorage.removeItem('access_token') }}>Нажмите сюда, чтобы перейти к странице входа</a>
    </div>
  )
}

export default AuthError