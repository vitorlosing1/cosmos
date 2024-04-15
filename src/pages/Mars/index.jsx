import React, { useState, useEffect } from "react";
import axios from "axios";

const Mars = () => {
  const apiNasa = import.meta.env.VITE_API_NASA;
  const [insightData, setInsightData] = useState(null);
  const [roverPhotos, setRoverPhotos] = useState([]);

  useEffect(() => {
    // Função para buscar dados do InSight
    const fetchInsightData = async () => {
      try {
        const response = await axios.get(
          `https://api.nasa.gov/insight_weather/?api_key=${apiNasa}`
        );
        setInsightData(response.data);
      } catch (error) {
        console.error("Error fetching InSight data:", error);
      }
    };

    // Função para buscar fotos do Mars Rover
    const fetchRoverPhotos = async () => {
      try {
        const response = await axios.get(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiNasa}`
        );
        setRoverPhotos(response.data.photos);
      } catch (error) {
        console.error("Error fetching Mars Rover photos:", error);
      }
    };

    // Chama as funções de busca quando o componente monta
    fetchInsightData();
    fetchRoverPhotos();
  }, []);

  return (
    <main className="mars-container">
      <h1>Mars Page</h1>
      <h2>InSight Weather</h2>
      {insightData && (
        <div>
          <p>Sol: {insightData.sol}</p>
          <p>Temperature: {insightData.temperature}</p>
          <p>Wind Speed: {insightData.wind_speed}</p>
        </div>
      )}

      <h2>Mars Rover Photos</h2>
      <div>
        {roverPhotos.map((photo) => (
          <img
            key={photo.id}
            src={photo.img_src}
            alt="Mars Rover"
            style={{ width: "300px", height: "auto", margin: "5px" }}
          />
        ))}
      </div>
    </main>
  );
};

export default Mars;
