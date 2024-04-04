import axios from "axios";
import { useState } from "react";
import { translateApi } from "./translateApi";

export const picDayNasaApi = () => {
  const apiNasa = import.meta.env.VITE_API_NASA;
  const { translateText } = translateApi();
  const [picDay, setPicDay] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [previousPics, setPreviousPics] = useState([]);

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
          ); // Tradução da descrição
          const translatedTitle = await translateText(response.data.title); // Tradução do título
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
      const previousDates = [];
      let additionalDays = 20; // Número de dias adicionais se o dia atual retornar erro 404

      let i = 0;
      while (additionalDays > 0) {
        const previousDate = new Date(today);
        previousDate.setDate(today.getDate() - i);
        previousDates.push(previousDate);

        const formattedDate = previousDate.toISOString().split("T")[0];
        const cachedPreviousPic = JSON.parse(
          localStorage.getItem(`cachedPreviousPic_${formattedDate}`)
        );

        if (!cachedPreviousPic) {
          const url = `https://api.nasa.gov/planetary/apod?api_key=${apiNasa}&date=${formattedDate}`;
          try {
            const response = await axios.get(url);
            if (response.data.media_type === "image") {
              const picData = {
                url: response.data.url,
                date: formattedDate,
              };
              localStorage.setItem(
                `cachedPreviousPic_${formattedDate}`,
                JSON.stringify(picData)
              );
            } else {
              previousDates.pop(); // Remove a última data se a imagem não for do tipo "image"
              additionalDays++; // Não conta este dia se a imagem não for do tipo "image"
            }
          } catch (error) {
            if (error.response && error.response.status === 404) {
              // Se o erro for 404, aumente additionalDays
              additionalDays++;
            }
          }
        }
        i++;
        additionalDays--; // Reduz additionalDays para sair do loop quando necessário
      }

      const previousPicsPromises = previousDates.map(async (date) => {
        const formattedDate = date.toISOString().split("T")[0];
        return JSON.parse(
          localStorage.getItem(`cachedPreviousPic_${formattedDate}`)
        );
      });

      const previousPicsData = await Promise.all(previousPicsPromises);
      const filteredPreviousPics = previousPicsData.filter(
        (data) => data !== null && data.media_type !== "video" && !data.error
      );
      setPreviousPics(filteredPreviousPics);
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
