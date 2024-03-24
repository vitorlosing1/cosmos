import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.scss";
import ptbr from "date-fns/locale/pt-BR";

registerLocale("ptbr", ptbr);

function Teste() {
  const apiNasa = import.meta.env.VITE_NASA_KEY;
  const apiGoogle = import.meta.env.VITE_GOOGLE_KEY;
  const [picDay, setPicDay] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const translateText = async (texto) => {
    const response = await axios.post(
      "https://translation.googleapis.com/language/translate/v2",
      {},
      {
        params: {
          q: texto,
          target: "pt",
          key: `${apiGoogle}`,
        },
      }
    );
    return response.data.data.translations[0].translatedText;
  };

  const buscarFotoDoDia = async (date) => {
    try {
      const formattedDate = date.toISOString().split("T")[0];
      const url = `https://api.nasa.gov/planetary/apod?api_key=${apiNasa}&date=${formattedDate}`;
      const response = await axios.get(url);

      // Traduzindo a explicação para o português
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
    } catch (error) {
      console.log("Não foi possível carregar os dados: " + error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    buscarFotoDoDia(selectedDate);
  }, [selectedDate]);

  if (!picDay) return <div />;
  return (
    <main className="pictures-container">
      <div className="search-day">
        Selecione a data:
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          className="datepicker"
          calendarClassName="calendar"
          maxDate={new Date()}
          locale={ptbr}
        ></DatePicker>
      </div>
      <div className="picture-content">
        <div className="picture-text">
          <h1>{picDay.title}</h1>
          <p className="description">{picDay.explanation}</p>
        </div>
        <img className="picture" src={picDay.url} alt={picDay.title} />
      </div>
    </main>
  );
}

export default Teste;
