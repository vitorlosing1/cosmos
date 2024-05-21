import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.scss";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ptbr from "date-fns/locale/pt-BR";
import { CustomDatePickerInput } from "../../components/CustomDatePickerInput";
import { DarkIcon } from "../../assets/svg/DarkIcon";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get } from "firebase/database";

registerLocale("ptbr", ptbr);

const apiNasa = import.meta.env.VITE_API_NASA;
const apiFirebase = import.meta.env.VITE_API_FIREBASE;

const firebaseConfig = {
  apiKey: `${apiFirebase}`,
  authDomain: "cosmos-16b3c.firebaseapp.com",
  databaseURL: "https://cosmos-16b3c-default-rtdb.firebaseio.com",
  projectId: "cosmos-16b3c",
  storageBucket: "cosmos-16b3c.appspot.com",
  messagingSenderId: "749524648802",
  appId: "1:749524648802:web:2f6671aebc7ed5c2a0223b",
};

const firebaseApp = initializeApp(firebaseConfig);

const savePhotosToFirebase = async (date, photos) => {
  try {
    const db = getDatabase(firebaseApp);
    const photosRef = ref(db, `photos/${date}`);
    await set(photosRef, photos);
  } catch (error) {
    console.error("Erro ao salvar fotos no Firebase:", error);
  }
};

const fetchPhotosFromFirebase = async (date) => {
  try {
    const db = getDatabase(firebaseApp);
    const photosRef = ref(db, `photos/${date}`);
    const snapshot = await get(photosRef);
    return snapshot.exists() ? snapshot.val() : [];
  } catch (error) {
    console.error("Erro ao buscar fotos do Firebase:", error);
    return [];
  }
};

const Mars = () => {
  const [roverPhotos, setRoverPhotos] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date("2023-11-31"));
  const [loading, setLoading] = useState(false);
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
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        if (isNaN(selectedDate.getTime())) {
          throw new Error("Data inválida selecionada");
        }
        const formattedDate = selectedDate.toISOString().split("T")[0];
        const photosFromFirebase = await fetchPhotosFromFirebase(formattedDate);

        if (photosFromFirebase.length > 0) {
          setRoverPhotos(photosFromFirebase);
          setError("");
        } else {
          const response = await axios.get(
            `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${formattedDate}&api_key=${apiNasa}`
          );

          const photos = response.data.photos;
          setRoverPhotos(photos);
          setError("");

          savePhotosToFirebase(formattedDate, photos);
        }
      } catch (error) {
        console.error("Error fetching Mars Rover photos:", error);
        setError("Não há fotos disponíveis para a data selecionada.");
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [selectedDate]);

  const handleDateChange = (date) => {
    if (isNaN(date.getTime())) {
      console.error("Data inválida selecionada:", date);
      setError("Data inválida selecionada.");
      return;
    }
    setSelectedDate(date);
  };

  const dateOptions = availableDates
    .filter((date) => roverPhotos.some((photo) => photo.earth_date === date))
    .map((date) => new Date(date));

  return (
    <main className="mars-container">
      <h1>Fotos do Rover de Marte</h1>
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
          maxDate={new Date("2023-11-31")}
          minDate={new Date("2012-08-06")}
          excludeDates={dateOptions.filter(
            (date) => date.getTime() !== selectedDate.getTime()
          )}
        />
      </div>
      {loading && (
        <div className="loading">
          <DarkIcon />
        </div>
      )}
      {error && <p className="error">{error}</p>}
      {!loading && !error && roverPhotos.length === 0 && (
        <p>Não há fotos disponíveis para a data selecionada.</p>
      )}
      {!loading && roverPhotos.length > 0 && (
        <div className="photos-container">
          {roverPhotos.map((photo) => (
            <div className="photo" key={photo.id}>
              <p className="camera">{`${photo.camera.full_name} (${photo.camera.name})`}</p>
              <img className="image" src={photo.img_src} alt="Mars Rover" />
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Mars;
