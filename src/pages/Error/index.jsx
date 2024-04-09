import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import { ErrorIcon } from "./ErrorIcon";

function ErrorPage() {
  return (
    <main className="error-container">
      <h1>Oooops!</h1>
      <span>Erro 404 - Página não encontrada</span>
      <ErrorIcon />
      <Link to="/">
        <button className="return">Voltar para a página inicial</button>
      </Link>
    </main>
  );
}

export default ErrorPage;
