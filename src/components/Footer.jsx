import React from "react";
import "./styles/Footer.css";
import { LogoIcon } from "../assets/svg/LogoIcon";
import ReloadPage from "./ReloadPage";

function Footer() {
  return (
    <footer>
      <div className="logo" onClick={ReloadPage}>
        <LogoIcon />
        COSMOS
      </div>
      <hr />
      <div className="sections">
        <ul>
          <li onClick={ReloadPage}>HOME</li>
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
