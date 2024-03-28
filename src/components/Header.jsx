import React from "react";
import "./styles/Header.scss";
import { LogoIcon } from "../assets/svg/LogoIcon";
import { SearchIcon } from "../assets/svg/SearchIcon";
import ReloadPage from "./ReloadPage";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <header>
      <div className="left-bar">
        <Link to={"/"}>
          <div className="logo" onClick={ReloadPage}>
            <LogoIcon />
            <span>COSMOS</span>
          </div>
        </Link>
      </div>
      <div className="mid-bar">
        <nav className="menu-desktop">
          <Link to={"/foto-do-dia"}>
            <span>FOTO DO DIA</span>
          </Link>
          <span>PAGE</span>
          <span>PAGE</span>
          <span>PAGE</span>
        </nav>

        <nav className="menu-mobile"></nav>
      </div>
      <div className="right-bar">
        <div className="search">
          <input autoComplete="off" id="search" placeholder="Pesquisar..." />
          <button title="Pesquisar">
            <SearchIcon />
          </button>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
