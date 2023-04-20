import React from 'react';
import './styles.scss'

function Navigation() {
  return (
    <nav className="menu">
      <input type="checkbox" href="#" className="menu-open" name="menu-open" id="menu-open"/>
      <label className="menu-open-button" htmlFor="menu-open">
        <span className="hamburger hamburger-1"></span>
        <span className="hamburger hamburger-2"></span>
        <span className="hamburger hamburger-3"></span>
      </label>

      <a href="#" className="menu-item"> <i className="fa fa-bar-chart"></i> </a>
      <a href="#" className="menu-item"> <i className="fa fa-plus"></i> </a>
      <a href="#" className="menu-item"> <i className="fa fa-heart"></i> </a>
      <a href="#" className="menu-item"> <i className="fa fa-envelope"></i> </a>
    </nav>
  );
}

function Filters() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <filter id="shadowed-goo">
          <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
          <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
          <feColorMatrix in="shadow" mode="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2" result="shadow" />
          <feOffset in="shadow" dx="1" dy="1" result="shadow" />
          <feComposite in2="shadow" in="goo" result="goo" />
          <feComposite in2="goo" in="SourceGraphic" result="mix" />
        </filter>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
          <feComposite in2="goo" in="SourceGraphic" result="mix" />
        </filter>
      </defs>
    </svg>
  );
}

export default function NavigationMenu() {
  return (
    <div>
      <Navigation />
      <Filters />
    </div>
  );
}