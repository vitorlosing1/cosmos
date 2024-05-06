import React, { useState, useEffect } from "react";
import axios from "axios";

const Mars = () => {
  const apiNasa = import.meta.env.VITE_API_NASA;
  const [roverPhotos, setRoverPhotos] = useState([]);

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

    fetchRoverPhotos();
  }, []);

  return (
    <main className="mars-container">
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
