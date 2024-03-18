import React from "react";
import "./styles/Header.css";
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
        <span>PAGE</span>
        <span>PAGE</span>
        <span>PAGE</span>
        <span>PAGE</span>
      </div>
      <div className="right-bar">
        <input placeholder="PESQUISAR" />
        <button>
          <SearchIcon />
        </button>
      </div>
    </header>
  );
}

export default NavBar;
