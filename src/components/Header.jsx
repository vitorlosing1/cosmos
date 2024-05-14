import React, { useState } from "react";
import "./styles/Header.scss";
import { LogoIcon } from "../assets/svg/LogoIcon";
import { MenuIcon } from "../assets/svg/MenuIcon";
import ReloadPage from "./ReloadPage";
import { Link } from "react-router-dom";

function NavBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <header>
      <div className="logo-container">
        <Link to={"/"}>
          <div className="logo" onClick={ReloadPage}>
            <LogoIcon />
            <span>COSMOS</span>
          </div>
        </Link>
      </div>
      <div className="nav-bar">
        <nav className="menu-desktop">
          <Link to={"/foto-do-dia"}>
            <span>FOTO DO DIA</span>
          </Link>
          <Link to={"/noticias"}>
            <span>NOTÍCIAS</span>
          </Link>
          <Link to={"/marte"}>
            <span>MARTE</span>
          </Link>
        </nav>

        <button className="menu-mobile" onClick={toggleModal}>
          <MenuIcon />
          {isModalOpen && (
            <nav className="mobile-container">
              <Link to={"/"} onClick={ReloadPage}>
                <span>INÍCIO</span>
              </Link>
              <Link to={"/foto-do-dia"}>
                <span>FOTO DO DIA</span>
              </Link>
              <Link to={"/noticias"}>
                <span>NOTÍCIAS</span>
              </Link>
              <Link to={"/marte"}>
                <span>MARTE</span>
              </Link>
            </nav>
          )}
        </button>
      </div>
    </header>
  );
}

export default NavBar;
