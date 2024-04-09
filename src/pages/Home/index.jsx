import React, { useEffect, useState } from "react";
import "./styles.scss";
import Slider from "./slider/Slider";
import { fetchAndSaveNews } from "../../api/newsApi";
import { Link } from "react-router-dom";

function Home() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedNews = await fetchAndSaveNews();
        setNews(fetchedNews.slice(0, 8)); // Exibir apenas as primeiras 8 notícias
      } catch (error) {
        console.error("Erro ao buscar notícias:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="home">
      <Slider />
      <div className="content-container">
        <div className="latest-news-content">
          <h2>Últimas notícias</h2>
          <div className="latest-news">
            {Array.isArray(news) &&
              news.map((item, index) => (
                <div className="items" key={index}>
                  <div className="news-item">
                    <img
                      className="news-img"
                      src={item.image}
                      alt={item.title}
                    />
                    <small className="date">{item.publishedAt}</small>
                  </div>
                  <h4 className="news-title">{item.title}</h4>
                </div>
              ))}
          </div>
          <Link to="/noticias">
            <button className="more-news">MAIS NOTÍCIAS</button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Home;
