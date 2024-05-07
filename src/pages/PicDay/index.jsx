import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.scss";
import ptbr from "date-fns/locale/pt-BR";
import { CustomDatePickerInput } from "../../components/CustomDatePickerInput";
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
      const dateToFetch =
        selectedDate || new Date(new Date().setDate(new Date().getDate() - 1));
      await Promise.all([
        searchPicDay(dateToFetch).then(() => setIsLoadingPicDay(false)),
        searchLatestPics().then(() => setIsLoadingLatestPics(false)),
      ]);
    };
    fetchData();
  }, [selectedDate]);

  const defaultDate =
    selectedDate || new Date(new Date().setDate(new Date().getDate() - 1));

  const previousPicsToShow = previousPics || [
    new Date(new Date().setDate(new Date().getDate() - 1)),
  ];

  return (
    <main className="pictures-container">
      <h1>NASA Astronomy Picture of the Day (APOD)</h1>
      <div className="search-day">
        <p>Selecione a data:</p>
        <DatePicker
          selected={defaultDate}
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
            const formattedDate = date.toISOString().split("T")[0];
            const today = new Date();
            const twentyDaysAgo = new Date();
            twentyDaysAgo.setDate(today.getDate() - 20);
            return previousPics.some(
              (data) => data.date === formattedDate || date <= twentyDaysAgo
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
            <h1>{picDay?.title}</h1>
            <p className="description-desktop">{picDay?.explanation}</p>
          </div>
          <img className="picture" src={picDay?.url} alt={picDay?.title} />
          <p className="description-mobile">{picDay?.explanation}</p>
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
            {previousPicsToShow.map((data, index) => {
              const formattedDate = new Date(
                new Date(data.date).setDate(new Date(data.date).getDate() + 1)
              ).toLocaleDateString("pt-BR");

              return (
                <div className="date" key={index}>
                  <h4>{formattedDate}</h4>
                  <img
                    key={index}
                    className="previous-pic"
                    src={data.url}
                    alt={data.title}
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
