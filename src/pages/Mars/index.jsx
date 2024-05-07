import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.scss";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ptbr from "date-fns/locale/pt-BR";
import { CustomDatePickerInput } from "../../components/CustomDatePickerInput";

registerLocale("ptbr", ptbr);

const Mars = () => {
  const apiNasa = import.meta.env.VITE_API_NASA;
  const [roverPhotos, setRoverPhotos] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAvailableDates = async () => {
      try {
        const response = await axios.get(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=${apiNasa}`
        );
        const datesWithPhotos = response.data.photos.map(
          (photo) => new Date(photo.earth_date).toISOString().split("T")[0]
        );
        const uniqueDates = Array.from(new Set(datesWithPhotos));
        setAvailableDates(uniqueDates);
      } catch (error) {
        console.error("Error fetching available dates:", error);
      }
    };

    fetchAvailableDates();
  }, []);

  useEffect(() => {
    const fetchRoverPhotos = async () => {
      try {
        const formattedDate = selectedDate.toISOString().split("T")[0];
        const response = await axios.get(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${formattedDate}&api_key=${apiNasa}`
        );

        const photos = response.data.photos;
        setRoverPhotos(photos);
        setError(""); // Reset error message on successful fetch
      } catch (error) {
        console.error("Error fetching Mars Rover photos:", error);
        setError("Não há fotos disponíveis para a data selecionada.");
      }
    };

    fetchRoverPhotos();
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const dateOptions = availableDates
    .filter((date) => roverPhotos.some((photo) => photo.earth_date === date))
    .map((date) => new Date(date));

  return (
    <main className="mars-container">
      <h1>Fotos do Rover de Marte</h1>
      {error && <p className="error">{error}</p>}
      <div className="date-selector">
        <p>Selecione a data:</p>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          className="datepicker"
          calendarClassName="calendar"
          customInput={<CustomDatePickerInput />}
          locale={ptbr}
          maxDate={new Date()}
          minDate={new Date("2012-08-06")} // Data do primeiro dia em que o rover Curiosity pousou em Marte
          excludeDates={dateOptions.filter(
            (date) => date.getTime() !== selectedDate.getTime()
          )}
        />
      </div>
      {!error && roverPhotos.length === 0 && (
        <p>Não há fotos disponíveis para a data selecionada.</p>
      )}
      <div className="photos-container">
        {roverPhotos.map((photo) => (
          <div className="photo" key={photo.id}>
            <p className="camera">{`${photo.camera.full_name} (${photo.camera.name})`}</p>
            <img className="image" src={photo.img_src} alt="Mars Rover" />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Mars;
