import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"

const NavBar = () => {
    return (
      <div>
        <div className = "Navbar">
          <Link className = "NavbarMenu" to="/mainPage">HOME</Link>
          <Link className = "NavbarMenu" to="/convenient">편의시설</Link>
          <Link className = "NavbarMenu" to="/map">교내 경로</Link>
        </div>
      </div>
    );
  };
  
  export default NavBar;