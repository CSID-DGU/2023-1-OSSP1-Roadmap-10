import React from "react";
import { Link } from "react-router-dom";
import Logo from "./ROADMAP_4.png"
const NavBar = () => {

  const toggleMenu = () => {
    const dropDownMenu = document.querySelector('.dropdown_menu');
    const toggleBtnIcon = document.querySelector('.toggle_btn i');
    dropDownMenu.classList.toggle('open');
    const isOpen = dropDownMenu.classList.contains('open');
    toggleBtnIcon.classList = isOpen
      ? 'fa-solid fa-xmark'
      : 'fa-solid fa-list';
  };

  return (
    <header>
      <div class="navbar">
        <div class="logo"><img src ={Logo}></img></div>

        <div class="links">
          <li><a href="./mainPage">HOME</a></li>
          <li><a href="./convenient">CONVENIENT</a></li>
          <li><a href="./map">PATH</a></li>
        </div>
        <div class="toggle_btn" onClick={toggleMenu}>
          <i class="fa-solid fa-list"></i>
        </div>
      </div>
      <div>
        <div class="dropdown_menu">
          <li><a href="./mainPage">HOME</a></li>
          <li><a href="./convenient">CONVENIENT</a></li>
          <li><a href="./map">PATH</a></li>
        </div>
      </div>
    </header>

  );
};

export default NavBar;