import './App.css';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import { Routes, Route, Navigate } from 'react-router-dom';
import Onboarding from './pages/Onboarding';
import { useEffect, useState } from 'react';
import userManager from './model/userManager';
import { useNavigate } from 'react-router-dom';



function App() {

  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState(null)


  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("token"));
    let userId = token?.userId
    if(token!==null){
      userManager.getUserById(userId).then(res => {
        if (res !== null) {
          setLoggedUser(res)
          navigate("/dashboard")
          console.log(res)
        }
  
      })

    }

 
  },[])

  return (
    <Routes>
      <Route index element={loggedUser ? <Navigate to={'/dashboard'} /> : <Navigate to={'/home'} />}></Route>
      <Route path='/home'  element={<Home setLoggedUser={setLoggedUser} loggedUser={loggedUser}/>}></Route>
      <Route path='/dashboard'  element={loggedUser ? <Dashboard setLoggedUser={setLoggedUser} loggedUser={loggedUser} /> : <Navigate to={"/home"} />}></Route>
      <Route path='/onboarding'  element={loggedUser ? <Onboarding setLoggedUser={setLoggedUser} loggedUser={loggedUser}  /> : <Navigate to={"/home"} />}></Route>
    </Routes>
  );
}

export default App;
