import React from 'react'
import Header from '../components/header/Header'
import RegisterButton from '../components/registerButton/RegisterButton'
import { useState } from 'react';
import Modal from '../components/modal/Modal';


function Home() {
    const [modal,setModal] = useState(false);
    const [type,setType] = useState("register");

    const toggleModal = (e) => {
        e.preventDefault();
        if (e.target.textContent === "Register") {
            setType("register")
        } else {
            setType("login")
        }
        setModal(!modal)
    } 

  return (
    <div className='Home'>
        <Header toggleModal={toggleModal}></Header>
        <RegisterButton toggleModal={toggleModal}/>
        <Modal type={type} toggleModal={toggleModal} modal={modal}>dadada</Modal>
    </div>
  )
}

export default Home