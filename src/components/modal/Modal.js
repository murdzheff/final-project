import React, { useState } from 'react';
import "./modal.scss";
import Logo from "./logo.png";
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import userManager from "../../model/userManager";

function Modal({ modal, toggleModal, type, setSuccess, success }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

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

          setSuccess(!success);
          navigate("/onboarding");
        }
      })
      .catch(err => {
        console.log(err)
        setErrorMessage("Email already exists")
      })
  }

  function handleLogin(e) {
    e.preventDefault();

    userManager.login(email, password)
      .then(response => {
        setTimeout(() => {
          if (JSON.parse(localStorage.getItem("token"))) {
            setSuccess(!success);
            console.log("login run")
            navigate("/dashboard");
          } else {
            setErrorMessage("Wrong email or password");


          }
        }, 400);
      }).catch(err => {
        console.log(err)

      }

      );
  }

  return (
    <div className='overlay'>
      <div className='modal'>
        <button className='closeModal' onClick={toggleModal}>X</button>
        <img className='logo' src={Logo} alt="Logo"></img>
        {type === "register" &&
          <h4 className='header-register'>Създай профил</h4>
        }
        {type === "login" &&
          <h4 className='header-register'>Да започваме</h4>
        }
        <h5 className='content-home-form'>С натискане на бутона Впиши се , ти се съгласяваш с нашите Условия. Приятно сърфиране!</h5>
        <Alert style={errorMessage ? { visibility: "visible" } : { visibility: "hidden" }} className='alert' variant="danger">{errorMessage}</Alert>

        <form className='form-home'>
          <input className='email'
            onChange={e => setEmail(e.target.value)}
            placeholder='Your email'
            type='email'
            value={email}
            required
          />
          <input
            className='password'
            onChange={e => setPassword(e.target.value)}
            placeholder='Your password'
            type='password'
            value={password}
            required
          />
          {type === "register" &&
            <input
              className='confirmPassword'
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
