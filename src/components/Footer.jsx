import React from "react";
import "./styles/Footer.css";
import { LogoIcon } from "../assets/svg/LogoIcon";
import ReloadPage from "./ReloadPage";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <Link to={"/"}>
        <div className="logo" onClick={ReloadPage}>
          <LogoIcon />
          COSMOS
        </div>
      </Link>
      <hr />
      <div className="sections">
        <ul>
          <Link to={"/"}>
            <li onClick={ReloadPage}>HOME</li>
          </Link>
          <li>PAGE</li>
        </ul>
        <ul>
          <li>PAGE</li>
          <li>PAGE</li>
        </ul>
        <ul>
          <li>PAGE</li>
          <li>PAGE</li>
        </ul>
        <ul>
          <li>PAGE</li>
          <li>PAGE</li>
        </ul>
      </div>
      <hr />
      <small>©COSMOS 2024</small>
    </footer>
  );
}

export default Footer;
