import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.scss";
import ptbr from "date-fns/locale/pt-BR";

registerLocale("ptbr", ptbr);

function Teste() {
  const apiSecret = import.meta.env.VITE_API_KEY;
  const [fotoDoDia, setFotoDoDia] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const buscarFotoDoDia = async (date) => {
    try {
      const formattedDate = date.toISOString().split("T")[0];
      const url = `https://api.nasa.gov/planetary/apod?api_key=${apiSecret}&date=${formattedDate}`;
      const respostaAPI = await axios.get(url);
      setFotoDoDia(respostaAPI.data);
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

  if (!fotoDoDia) return <div />;
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
          <h1>{fotoDoDia.title}</h1>
          <p className="description">{fotoDoDia.explanation}</p>
        </div>
        <img className="picture" src={fotoDoDia.url} alt={fotoDoDia.title} />
      </div>
    </main>
  );
}

export default Teste;
