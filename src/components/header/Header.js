import React from 'react';
import Logo from "./logo.png";
import './header.scss'


export default function Header({toggleModal}) {
    return (
        <div className='header'>

            
            <div className='menu-box'>
            <img  className='logo' src={Logo}></img>
            <a href='https://tinder.com/bg/feature/swipe' className='menu'>Продукти</a>
            <a href='https://tinder.com/bg/about' className='menu'>Научи</a>
            <a href='https://policies.tinder.com/safety/intl/bg' className='menu'>Безопасност</a>
            <a href='https://www.help.tinder.com/hc/bg?utm_source=web' className='menu'>Поддръжка</a>
            </div>
            

            <button className='header-button' onClick={toggleModal}>Впиши се</button>

        </div>
    )
}
