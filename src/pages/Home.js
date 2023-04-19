import React from 'react'
import Header from '../components/header/Header'
import RegisterButton from '../components/registerButton/RegisterButton'
import { useState } from 'react';
import Modal from '../components/modal/Modal';
import Chat from '../components/chat/Chat';
import { Navigate } from 'react-router-dom';
import './styles/home-page.css'
import backgroundImg from './styles/images/tinderBackground.webp'
import ClientReviews from '../components/clientReviews/clientReviews';

function Home(props) {
    const [modal,setModal] = useState(false);
    const [type,setType] = useState("register");
    
    const toggleModal = (e) => {
        e.preventDefault();
        if (e.target.textContent === "Създай профил") {
            setType("register")
        } else {
            setType("login")
        }
        setModal(!modal)
    } 

    

  return (
    <div className='Home'>
        <div className='home-page-container'>
        <img src={backgroundImg}></img>
        <Header toggleModal={toggleModal}></Header>
        <RegisterButton toggleModal={toggleModal}/>
        {<Modal success={props.success} setSuccess={props.setSuccess} loggedUser={props.loggedUser} type={type} setLoggedUser={props.setLoggedUser} toggleModal={toggleModal} modal={modal}>dadada</Modal>}
        <ClientReviews/>

        </div>
       
    </div>
  )
}

export default Home;