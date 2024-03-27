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
            COSMOS
          </div>
        </Link>
      </div>
      <div className="mid-bar">
        <Link to={"/foto-do-dia"}>
          <span>FOTO DO DIA</span>
        </Link>
        <span>PAGE</span>
        <span>PAGE</span>
        <span>PAGE</span>
      </div>
      <div className="right-bar">
        <input id="search" placeholder="PESQUISAR" />
        <button>
          <SearchIcon />
        </button>
      </div>
    </header>
  );
}

export default NavBar;
