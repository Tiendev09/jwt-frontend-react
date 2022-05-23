import './App.scss';
import React from "react";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect,useContext } from 'react';
import AppRoutes from './routes/AppRoutes';
import { TailSpin } from  'react-loader-spinner'
import { UserContext } from './context/UserContext';
import NavHeader from './components/Nav/NavHeader';
import { Scrollbars } from "react-custom-scrollbars";
const App =()=> {
  const { user } = useContext(UserContext);
  const [scrollHeight, setScrollHeight] = useState(0);
  useEffect(() => {
    let windowHeight = window.innerHeight;
    setScrollHeight(windowHeight);

  },[user])
  return (
    <Scrollbars autoHide style={{height:scrollHeight}}>
      <Router>
        {
          user && user.isLoading ?
            <div className='loading-container'> 
              
          <TailSpin
            height="100"
            width="100"
            color='#1877f2'
            ariaLabel='loading'
              />
              <div>Loading data ...</div>
            </div>
            :
            <>
              <div className="app-header">
                <NavHeader/>
              </div>
              <AppRoutes/>
              <div className='app-container'>
              </div>
            </>
        }
        
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
    </Router>
      </Scrollbars>
  );
}

export default App;
