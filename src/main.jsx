import React from 'react'
import ReactDOM from 'react-dom/client'
// import './index.css'
import Login from './pages/login-page/Login'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainPage from './pages/main-page/MainPage';
import Books from './pages/books/Books';
import Profile from './pages/profile/Profile';

import { ToastContainer } from 'react-toastify';


const router = createBrowserRouter([
  {
    path: "/",
    element:
      <Login />
  },
  {
    path: "/main",
    element: <>
      <MainPage />
      {/* Контейнер по требованию либы react toastify */}
      <ToastContainer />
    </>
  },
  {
    path: "/books",
    element:
      <>
        <Books />
        {/* Контейнер по требованию либы react toastify */}
        <ToastContainer />
      </>
  },
  {
    path: "/profile",
    element: <Profile />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

