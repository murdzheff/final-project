import React from 'react'
import "./modal.scss"
import Logo from "./logo.png"
import { useState } from 'react';
import userManager from "../../model/userManager"
import { useNavigate } from 'react-router-dom';






function Modal({ modal, toggleModal, type, setLoggedUser }) {
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate();

    if (!modal) return null;

    function handleRegister() {
        userManager.signup(email, password).then(response => {
            if (response) {
                setLoggedUser(response)
                navigate("/onboarding");

            }
        })

    }




    function handleLogin() {
        userManager.login(email, password).then(response => {
            if (response) {
                setLoggedUser(response)
                navigate("/dashboard");
            }

        })
    }




    return (
        <div className='overlay'>
            <div className='modal'>
                <button className='closeModal' onClick={toggleModal}>X</button>
                <img src={Logo}></img>
                <form>
                    <input onChange={
                        (e) => {
                            setEmail(e.target.value)
                        }
                    } placeholder='Your email' type='email'></input>
                    <input onChange={
                        (e) => {
                            setPassword(e.target.value)
                        }
                    } placeholder='Your password' type='password'></input>
                    {type === "register" ? <input placeholder='Confirm your password' type='password'></input> : null}
                    <button onClick={type === "register" ? handleRegister : handleLogin} type='submit'>Get to swiping</button>
                </form>
            </div>
        </div>
    )
}

export default Modal