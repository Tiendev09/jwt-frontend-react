import Nav from './components/Nav/Nav';
import './App.scss';
import React from "react";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
function App() {
  const [account, setAccount] = useState({});//an hien nav
  useEffect(() => {
    let session = sessionStorage.getItem('account');
    //neu da co bien session thi cap nhat lai giao dien
    if (session) {
      // console.log(session);
      setAccount(JSON.parse(session));
    }
  },[])
  return (
    <>
      <Router>
        <div className="app-header">
          <Nav/>
        </div>
        <AppRoutes/>
        <div className='app-container'>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
    </Router>
      </>
  );
}

export default App;
