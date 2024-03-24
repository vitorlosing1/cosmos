import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styles.scss";

function Teste() {
  const apiSecret = import.meta.env.VITE_API_KEY;
  const [fotoDoDia, setFotoDoDia] = useState(null);
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiSecret}`;

  const buscarFotoDoDia = async () => {
    try {
      const respostaAPI = await axios.get(url);
      setFotoDoDia(respostaAPI.data); // Ajuste aqui
    } catch (error) {
      console.log("Não foi possível carregar os dados: " + error);
    }
  };

  buscarFotoDoDia.setHeader(
    "Cache-Control",
    "s-maxage=86399, stale-while-revalidate"
  );

  useEffect(() => {
    buscarFotoDoDia(); // Remova os parênteses aqui
  }, []); // Adicione uma matriz de dependências vazia para garantir que o useEffect seja executado apenas uma vez

  if (!fotoDoDia) return <div />;
  return (
    <main className="pictures-container">
      <div className="search-day">galo</div>
      <div className="picture-content">
        <div className="picture-text">
          <h1>{fotoDoDia.title}</h1>
          <p className="description">{fotoDoDia.explanation}</p>
        </div>
        <img className="picture" src={fotoDoDia.url}></img>
      </div>
    </main>
  );
}

export default Teste;
