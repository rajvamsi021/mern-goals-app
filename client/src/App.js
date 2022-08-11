import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Goals from './components/Goals';
import Signup from './components/Signup';
import Errorpage from './components/Errorpage';
import Logout from './components/Logout';

function App() {

  return (
    <>
    <Navbar />
      <Routes>
        <Route exact element={<Home />} path='/'/>

        <Route exact element={<Goals />} path='/goals'/>

        <Route exact element={<Login />} path='/login'/>

        <Route exact element={<Signup />} path='/register'/>

        <Route exact element={<Logout />} path='/logout'/>

        <Route exact element={<Errorpage />} path='*'/>

      </Routes>
    </>
  );
}

export default App;
