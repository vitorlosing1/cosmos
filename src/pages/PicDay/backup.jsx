import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.scss";
import ptbr from "date-fns/locale/pt-BR";
import { CustomDatePickerInput } from "../../components/pic-day/CustomDatePickerInput";

registerLocale("ptbr", ptbr);

function PicDay() {
  const apiNasa = import.meta.env.VITE_API_NASA_KEY;
  const apiGoogle = import.meta.env.VITE_API_GOOGLE_KEY;
  const [picDay, setPicDay] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [previousPics, setPreviousPics] = useState([]);

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
        } else {
          setSelectedDate(null);
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        const yesterday = new Date(date);
        yesterday.setDate(date.getDate() - 1);
        await searchPicDay(yesterday);
      } else {
        console.log("Não foi possível carregar os dados: " + error);
      }
    }
  };

  const searchLatestPics = async () => {
    try {
      const today = new Date();
      const previousDates = [];
      for (let i = 0; i <= 20; i++) {
        const previousDate = new Date(today);
        previousDate.setDate(today.getDate() - i);
        previousDates.push(previousDate);
      }

      const previousPicsPromises = previousDates.map(async (date) => {
        const formattedDate = date.toISOString().split("T")[0];
        const cachedPreviousPic = JSON.parse(
          localStorage.getItem(`cachedPreviousPic_${formattedDate}`)
        );
        if (cachedPreviousPic) {
          return cachedPreviousPic;
        } else {
          const url = `https://api.nasa.gov/planetary/apod?api_key=${apiNasa}&date=${formattedDate}`;
          try {
            const response = await axios.get(url);
            if (response.data.media_type === "image") {
              const picData = { url: response.data.url, date: formattedDate };
              localStorage.setItem(
                `cachedPreviousPic_${formattedDate}`,
                JSON.stringify(picData)
              );
              return picData;
            } else {
              return null;
            }
          } catch (error) {
            if (error.response && error.response.status === 404) {
              const yesterday = new Date(date);
              yesterday.setDate(date.getDate() - 1);
              const formattedDate = date.toISOString().split("T")[0];
              const url = `https://api.nasa.gov/planetary/apod?api_key=${apiNasa}&date=${formattedDate}`;
              const response = await axios.get(url);
              const picData = { url: response.data.url, date: formattedDate };
              localStorage.setItem(
                `cachedPreviousPic_${formattedDate}`,
                JSON.stringify(picData)
              );
              return picData;
            } else {
              throw error;
            }
          }
        }
      });

      const previousPicsData = await Promise.all(previousPicsPromises);
      const filteredPreviousPics = previousPicsData.filter(
        (data) => data !== null && data.media_type !== "video"
      );
      setPreviousPics(filteredPreviousPics);
    } catch (error) {
      console.log("Não foi possível carregar os dados: " + error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    searchPicDay(selectedDate);
    searchLatestPics();
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
          maxDate={
            !picDay
              ? new Date(new Date().setDate(new Date().getDate() - 1))
              : new Date()
          }
          minDate={
            new Date(new Date().setFullYear(new Date().getFullYear() - 1))
          }
          locale={ptbr}
          customInput={<CustomDatePickerInput />}
          filterDate={(date) => {
            const isBeforeTwentyDays =
              date < new Date().setDate(new Date().getDate() - 20);
            const formattedDate = date.toISOString().split("T")[0];
            return previousPics.some(
              (data) => data.date === formattedDate || isBeforeTwentyDays
            );
          }}
        />
      </div>
      <div className="picture-content">
        <div className="picture-text">
          <h1>{picDay.title}</h1>
          <p className="description">{picDay.explanation}</p>
        </div>
        <img className="picture" src={picDay.url} alt={picDay.title} />
      </div>
      <div className="previous-pics">
        <h2>Últimas 20 fotos</h2>
        <div className="pics">
          {previousPics.map((data, index) => {
            const currentDate = new Date(
              new Date().setDate(new Date(data.date).getDate() + 1)
            );
            const formattedDate = currentDate.toLocaleDateString("pt-BR");

            return (
              <div className="date" key={index}>
                <h4>{formattedDate}</h4>
                <img
                  key={index}
                  className="previous-pic"
                  src={data.url}
                  alt={`Foto anterior ${index + 1}`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default PicDay;
