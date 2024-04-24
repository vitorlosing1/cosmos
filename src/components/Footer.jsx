import React from "react";
import "./styles/Footer.scss";
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
          <li>
            <Link onClick={ReloadPage} to={"/"}>
              HOME
            </Link>
          </li>
          <li>
            <Link to={"/foto-do-dia"}>FOTO DO DIA</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to={"/noticias"}>NOTÍCIAS</Link>
          </li>
          <li>
            <Link to={"/marte"}>MARTE</Link>
          </li>
        </ul>
      </div>
      <hr />
      <small>©COSMOS 2024</small>
    </footer>
  );
}

export default Footer;
