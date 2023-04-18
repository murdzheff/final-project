import './App.css';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import { Routes, Route, Navigate } from 'react-router-dom';
import Onboarding from './pages/Onboarding';
import { useState } from 'react';
import userManager from './model/userManager';




function App() {
  
  let logged = JSON.parse(localStorage.getItem("token"))
  logged? console.log(logged.userId) : console.log("bahur") 

  const loggedUser = async () => {
    await userManager.getUserById(JSON.parse(localStorage.getItem("token")).userId)
  }


  return (
    <Routes>
      <Route index element={logged.userId ? <Navigate to={'/dashboard'} /> : <Navigate to={'/home'} />}></Route>
      <Route path='/home' element={<Home />}></Route>
      <Route path='/dashboard' element={logged.userId ? <Dashboard /> : <Navigate to={"/home"} />}></Route>
      <Route path='/onboarding' element={loggedUser ? <Onboarding /> : <Navigate to={"/home"} />}></Route>
    </Routes>
  );
}

export default App;
