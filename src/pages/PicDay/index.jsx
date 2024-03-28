import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.scss";
import ptbr from "date-fns/locale/pt-BR";
import { CustomDatePickerInput } from "../../components/pic-day/CustomDatePickerInput";
import { picDayNasaApi } from "../../api/picDayNasaApi";
import { DarkIcon } from "../../assets/svg/DarkIcon";

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

  const [isLoadingPicDay, setIsLoadingPicDay] = useState(true);
  const [isLoadingLatestPics, setIsLoadingLatestPics] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingPicDay(true);
      setIsLoadingLatestPics(true);
      await Promise.all([
        searchPicDay(selectedDate).then(() => setIsLoadingPicDay(false)),
        searchLatestPics().then(() => setIsLoadingLatestPics(false)),
      ]);
    };
    fetchData();
  }, [selectedDate]);

  return (
    <main className="pictures-container">
      <h1>NASA Astronomy Picture of the Day (APOD)</h1>
      <div className="search-day">
        <p>Selecione a data:</p>
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

      {isLoadingPicDay ? (
        <div className="loading">
          <DarkIcon />
        </div>
      ) : (
        <div className="picture-content">
          <div className="picture-text">
            <h1>{picDay.title}</h1>
            <p className="description-desktop">{picDay.explanation}</p>
          </div>
          <img className="picture" src={picDay.url} alt={picDay.title} />
          <p className="description-mobile">{picDay.explanation}</p>
        </div>
      )}

      {isLoadingLatestPics ? (
        <div className="loading">
          <DarkIcon />
        </div>
      ) : (
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
      )}
    </main>
  );
}

export default PicDay;
