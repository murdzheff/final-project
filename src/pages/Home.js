import React from 'react'
import Header from '../components/header/Header'
import RegisterButton from '../components/registerButton/RegisterButton'
import { useState, useEffect } from 'react';
import Modal from '../components/modal/Modal';
import './styles/home-page.scss'
import backgroundImg from './styles/images/tinderBackground.webp'
import ClientReviews from '../components/clientReviews/clientReviews';

function Home(props) {
  const [modal, setModal] = useState(false);
  const [type, setType] = useState("register");

  const toggleModal = (e) => {
    e.preventDefault();
    if (e.target.textContent === "Създай профил") {
      setType("register")
      document.body.style.overflow = 'hidden';
    } else if (e.target.textContent === "Впиши се") {
      setType("login")
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    setModal(!modal)
  }




  return (
    <div className="Home">
      <div className="home-page-container">
        <img src={backgroundImg} alt="background"></img>
        <Header toggleModal={toggleModal}></Header>
        <RegisterButton toggleModal={toggleModal} />
        {modal && (
          <div className="overlay-home-page">
            <Modal
              success={props.success}
              setSuccess={props.setSuccess}
              setType={setType}
              loggedUser={props.loggedUser}
              type={type}
              setLoggedUser={props.setLoggedUser}
              toggleModal={toggleModal}
              modal={modal}
            >
            </Modal>
          </div>
        )}
        <ClientReviews />
      </div>
    </div>
  );
}

export default Home;