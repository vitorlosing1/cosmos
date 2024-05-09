import React from "react";
import "./styles/Header.scss";
import { LogoIcon } from "../assets/svg/LogoIcon";
import { SearchIcon } from "../assets/svg/SearchIcon";
import ReloadPage from "./ReloadPage";
import { Link } from "react-router-dom";

function NavBar() {
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

        <nav className="menu-mobile"></nav>
      </div>
    </header>
  );
}

export default NavBar;
