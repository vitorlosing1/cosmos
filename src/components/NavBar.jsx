import React from "react";
import "./NavBar.css";
import { LogoIcon } from "../assets/svg/LogoIcon";
import { SearchIcon } from "../assets/svg/SearchIcon";

function NavBar() {
  return (
    <header>
      <div className="left-bar">
        <div className="logo">
          <LogoIcon />
          COSMOS
        </div>
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
