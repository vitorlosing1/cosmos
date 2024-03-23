import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styles.css";

function Teste() {
  const [fotoDoDia, setFotoDoDia] = useState(null);
  const url = 'https://api.nasa.gov/planetary/apod?api_key=ZS20fIadnlJGsUtPf7qDc1BzA3yy0whmACy1mdL1';

  const buscarFotoDoDia = async () => {
    try {
      const respostaAPI = await axios.get(url);
      setFotoDoDia(respostaAPI.data); // Ajuste aqui
    } catch (error) {
      console.log('Não foi possível carregar os dados: ' + error);
    }
  };

  useEffect(() => {
    buscarFotoDoDia(); // Remova os parênteses aqui
  }, []); // Adicione uma matriz de dependências vazia para garantir que o useEffect seja executado apenas uma vez

  if (!fotoDoDia) return <div />;
  return (
    <main>
      <div className="principal">
        <h1>Titulo: {fotoDoDia.title}</h1>
        <p>Descrição: {fotoDoDia.explanation}</p>
        <div className="foto">
          <img src={fotoDoDia.url} ></img>
        </div>

      </div>

    </main>
  );
}

export default Teste;
