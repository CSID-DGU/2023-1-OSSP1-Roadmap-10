import React from "react";
import Logo from "./ROADMAP_6.png"
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
        <div class="logo">
          <a href= "./">
            <img src={Logo}></img>
          </a>
        </div>

        <div class="links">
          <li><a href="./buildinginfo">INFO</a></li>
          <li><a href="./convenient">CONVENIENT</a></li>
          <li><a href="./map">PATH</a></li>
        </div>
        <div class="toggle_btn" onClick={toggleMenu}>
          <i class="fa-solid fa-list"></i>
        </div>
      </div>
      <div>
        <div class="dropdown_menu">
          <li><a href="./buildinginfo">INFO</a></li>
          <li><a href="./convenient">CONVENIENT</a></li>
          <li><a href="./map">PATH</a></li>
        </div>
      </div>
    </header>

  );
};

export default NavBar;