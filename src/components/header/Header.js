import React from 'react';
import Logo from "./logo.png";
import './header.scss'


export default function Header({toggleModal}) {
    return (
        <div className='header'>

            
            <div className='menu-box'>
            <img  className='logo' src={Logo}></img></div>
            <button className='header-button' onClick={toggleModal}>Впиши се</button>

        </div>
    )
}
