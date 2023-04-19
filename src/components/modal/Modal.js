// import React from 'react'
// import "./modal.scss"
// import Logo from "./logo.png"
// import { useState } from 'react';
// import userManager from "../../model/userManager"
// import { useNavigate } from 'react-router-dom';


// function Modal({ modal, toggleModal, type, setSuccess, loggedUser }) {
//     const [password, setPassword] = useState("")
//     const [email, setEmail] = useState("")
//     const navigate = useNavigate();
//     const [user, setUser] = useState(JSON.parse(localStorage.getItem("token")))

//     if (!modal) return null;

//     function handleRegister() {
//         userManager.signup(email, password).then(response => {
//             if (response) {
                
//                 setSuccess(true)
//                 navigate("/onboarding");
//             }
//         })

//     }




//     function handleLogin() {
//         userManager.login(email, password).then(response => {

//             setTimeout(() => {
//                 if (JSON.parse(localStorage.getItem("token"))) {
//                     setSuccess(true)
//                     navigate("/dashboard"); 
//                 }
//             }, 400);




//         })
//     }




//     return (
//         <div className='overlay'>
//             <div className='modal'>
//                 <button className='closeModal' onClick={toggleModal}>X</button>
//                 <img src={Logo}></img>
//                 <form>
//                     <input onChange={
//                         (e) => {
//                             setEmail(e.target.value)
//                         }
//                     } placeholder='Your email' type='email'></input>
//                     <input onChange={
//                         (e) => {
//                             setPassword(e.target.value)
//                         }
//                     } placeholder='Your password' type='password'></input>
//                     {type === "register" ? <input placeholder='Confirm your password' type='password'></input> : null}
//                     <button onClick={type === "register" ? handleRegister : handleLogin} type='submit'>Get to swiping</button>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default Modal

import React, { useState } from 'react';
import "./modal.scss";
import Logo from "./logo.png";
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import userManager from "../../model/userManager";

function Modal({ modal, toggleModal, type, setSuccess, loggedUser }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("token"));
  
  if (!modal) return null;

  function handleRegister(e) {
    e.preventDefault();

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    // Password validation
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage("Password must be at least 8 characters long, and contain at least one uppercase letter, one lowercase letter, and one number");
      return;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    userManager.signup(email, password)
      .then(response => {
        if (response) {
          setSuccess(true);
          navigate("/onboarding");
        }
      });
  }

  function handleLogin(e) {
    e.preventDefault();

    // // Email validation
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(email)) {
    //   setErrorMessage("Please enter a valid email address");
    //   return;
    // }

    userManager.login(email, password)
      .then(response => {
        setTimeout(() => {
          if (JSON.parse(localStorage.getItem("token"))) {
            setSuccess(true);
            navigate("/dashboard");
          }else{
            setErrorMessage("Wrong email or password");


          }
        }, 400);
      }).catch(err=>{
        console.log(err)

      }

      );
  }

  return (
    <div className='overlay'>
      <div className='modal'>
        <button className='closeModal' onClick={toggleModal}>X</button>
        <img src={Logo} alt="Logo"></img>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <form>
          <input
            onChange={e => setEmail(e.target.value)}
            placeholder='Your email'
            type='email'
            value={email}
            required
          />
          <input
            onChange={e => setPassword(e.target.value)}
            placeholder='Your password'
            type='password'
            value={password}
            required
          />
          {type === "register" &&
            <input
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder='Confirm your password'
              type='password'
              value={confirmPassword}
              required
            />
          }
          <button
            onClick={type === "register" ? handleRegister : handleLogin}
            type='submit'
          >
            Get to swiping
          </button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
