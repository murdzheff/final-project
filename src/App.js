import './App.css';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import { Routes, Route, Navigate } from 'react-router-dom';
import Onboarding from './pages/Onboarding';




function App() {
  let loggedUser = JSON.parse(localStorage.getItem("token")) || null;


  return (
    <Routes>
      <Route index element={loggedUser ? <Navigate to={'/dashboard'} /> : <Navigate to={'/home'} />}></Route>
      <Route path='/home' element={<Home />}></Route>
      <Route path='/dashboard' element={loggedUser ? <Dashboard /> : <Navigate to={"/home"} />}></Route>
      <Route path='/onboarding' element={loggedUser ? <Onboarding /> : <Navigate to={"/home"} />}></Route>
    </Routes>
  );
}

export default App;
