import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.scss";
import ptbr from "date-fns/locale/pt-BR";
import { CustomDatePickerInput } from "../../components/pic-day/CustomDatePickerInput";
import { picDayNasaApi } from "../../api/picDayNasaApi";

registerLocale("ptbr", ptbr);

function PicDay() {
  const {
    searchPicDay,
    searchLatestPics,
    picDay,
    previousPics,
    selectedDate,
    handleDateChange,
  } = picDayNasaApi();

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
