import React, { useState, useEffect } from "react";
import axios from "axios";

const Mars = () => {
  const apiNasa = import.meta.env.VITE_API_NASA;
  const [roverPhotos, setRoverPhotos] = useState([]);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchRoverPhotos = async () => {
      try {
        // Busca os dados do Mars Rover
        const response = await axios.get(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=${apiNasa}`
        );

        // Extrai as últimas fotos de cada câmera
        const latestPhotos = response.data.latest_photos;

        // Filtra para pegar apenas as últimas 5 fotos de cada câmera
        const lastFivePhotos = latestPhotos.reduce((acc, photo) => {
          if (!acc[photo.camera.full_name]) {
            acc[photo.camera.full_name] = [];
          }
          if (acc[photo.camera.full_name].length < 5) {
            acc[photo.camera.full_name].push(photo);
          }
          return acc;
        }, {});

        // Converte o objeto em um array plano
        const flatArray = Object.values(lastFivePhotos).flat();

        setRoverPhotos(flatArray);
      } catch (error) {
        console.error("Error fetching Mars Rover photos:", error);
      }
    };

    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          "https://mars.nasa.gov/rss/api/?feed=weather&category=insight_temperature&feedtype=json&ver=1.0"
        );
        const data = await response.json();
        if (data && data.sol_keys && data.sol_keys.length > 0) {
          const latestSol = data.sol_keys[data.sol_keys.length - 1];
          const latestData = data[latestSol];
          setWeatherData(latestData);
        } else {
          throw new Error("No weather data available");
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchRoverPhotos();
    fetchWeatherData();
  }, []);

  return (
    <main className="mars-container">
      <h1>Mars Weather Report</h1>
      {weatherData ? (
        <div className="weather-info">
          <p>Sol: {weatherData.First_UTC}</p>
          <p>Season: {weatherData.Season}</p>
          <p>
            Minimum Temperature: {weatherData.AT ? weatherData.AT.mn : "N/A"} °C
          </p>
          <p>
            Maximum Temperature: {weatherData.AT ? weatherData.AT.mx : "N/A"} °C
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <h1>Mars Page</h1>
      <h2>Mars Rover Photos</h2>
      <div>
        {roverPhotos.map((photo) => (
          <div key={photo.id}>
            <img
              src={photo.img_src}
              alt="Mars Rover"
              style={{ width: "300px", height: "auto", margin: "5px" }}
            />
            <p>
              {photo.camera.full_name} ({photo.camera.name})
            </p>
            <p>{photo.earth_date}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Mars;
