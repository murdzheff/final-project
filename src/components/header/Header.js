import React from 'react';
import Logo from "./logo.png";
import './header.scss'


export default function Header({toggleModal}) {
    return (
        <div className='header'>
            <img  className='logo' src={Logo}></img>
            <button onClick={toggleModal}>Login</button>
        </div>
    )
}
