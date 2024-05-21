import axios from "axios";
import { useState } from "react";
import { translateApi } from "./translateApi";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

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

export const picDayNasaApi = () => {
  const { translateText } = translateApi();
  const [picDay, setPicDay] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [previousPics, setPreviousPics] = useState([]);

  const savePicToFirebase = async (date, picData) => {
    try {
      const db = getDatabase(firebaseApp);
      const picRef = ref(db, `pics/${date}`);
      await set(picRef, picData);
    } catch (error) {
      console.error("Erro ao salvar imagem no Firebase:", error);
    }
  };

  const searchPicDay = async (date) => {
    try {
      const newDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      const formattedDate = newDate.toISOString().split("T")[0];
      const cachedPicDay = JSON.parse(localStorage.getItem("cachedPicDay"));
      if (cachedPicDay && cachedPicDay.date === formattedDate) {
        setPicDay(cachedPicDay.data);
      } else {
        const url = `https://api.nasa.gov/planetary/apod?api_key=${apiNasa}&date=${formattedDate}`;
        const response = await axios.get(url);

        if (response.data.media_type === "image") {
          const translatedDescription = await translateText(
            response.data.explanation
          );
          const translatedTitle = await translateText(response.data.title);
          const translatedPic = {
            ...response.data,
            title: translatedTitle,
            explanation: translatedDescription,
          };

          setPicDay(translatedPic);
          localStorage.setItem(
            "cachedPicDay",
            JSON.stringify({ date: formattedDate, data: translatedPic })
          );

          // Salvar a foto no Firebase
          savePicToFirebase(formattedDate, translatedPic);
        } else {
          setSelectedDate(null);
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setSelectedDate(null);
      } else {
        console.log("Não foi possível carregar os dados: " + error);
      }
    }
  };

  const searchLatestPics = async () => {
    try {
      const today = new Date();
      const previousPicsData = [];
      let additionalDays = 20; // Número de dias adicionais se o dia atual retornar erro 404

      let i = 0;
      while (previousPicsData.length < 20) {
        const previousDate = new Date(today);
        previousDate.setDate(today.getDate() - i);
        const formattedDate = previousDate.toISOString().split("T")[0];
        const cachedPreviousPic = JSON.parse(
          localStorage.getItem(`cachedPreviousPic_${formattedDate}`)
        );

        if (!cachedPreviousPic) {
          const url = `https://api.nasa.gov/planetary/apod?api_key=${apiNasa}&date=${formattedDate}`;
          try {
            const response = await axios.get(url);
            if (response.data.media_type === "image") {
              const translatedTitle = await translateText(response.data.title);
              const picData = {
                url: response.data.url,
                date: formattedDate,
                title: translatedTitle,
              };
              localStorage.setItem(
                `cachedPreviousPic_${formattedDate}`,
                JSON.stringify(picData)
              );

              // Salvar a foto no Firebase
              savePicToFirebase(formattedDate, picData);

              previousPicsData.push(picData);
            }
          } catch (error) {
            if (error.response && error.response.status === 404) {
              // Se o erro for 404, não faz nada
            } else {
              console.log("Erro ao buscar dados: " + error);
            }
          }
        } else {
          previousPicsData.push(cachedPreviousPic);
        }

        i++;
      }

      setPreviousPics(previousPicsData);
    } catch (error) {
      console.log("Não foi possível carregar os dados: " + error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return {
    searchPicDay,
    searchLatestPics,
    picDay,
    previousPics,
    selectedDate,
    handleDateChange,
  };
};
