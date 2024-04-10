import React, { useEffect, useState } from "react";
import "./styles.scss";
import Slider from "./slider/Slider";
import { fetchAndSaveNews } from "../../api/newsApi";
import { Link } from "react-router-dom";
import { DarkIcon } from "../../assets/svg/DarkIcon";

function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedNews = await fetchAndSaveNews();
        setNews(fetchedNews.slice(0, 8)); // Exibir apenas as primeiras 8 notícias
        setLoading(false); // Atualizar o estado para indicar que o carregamento terminou
      } catch (error) {
        console.error("Erro ao buscar notícias:", error);
      }
    };

    fetchData();
  }, []);

  const openArticle = (link) => {
    window.open(link, "_blank");
  };

  return (
    <main className="home">
      <Slider />
      <div className="content-container">
        <div className="latest-news-content">
          <h2>Últimas notícias</h2>
          {loading ? (
            <div className="loading">
              <DarkIcon />
            </div>
          ) : (
            <div className="latest-news">
              {Array.isArray(news) &&
                news.map((item, index) => (
                  <div
                    className="items"
                    onClick={() => openArticle(item.link)}
                    key={index}
                  >
                    <div className="news-item">
                      <img
                        className="news-img"
                        src={item.image}
                        alt={item.title}
                      />
                      <div className="info">
                        <small>{item.sourceName}</small>
                        <small>{item.publishedAt}</small>
                      </div>
                    </div>
                    <h4 className="news-title">{item.title}</h4>
                  </div>
                ))}
            </div>
          )}
          <Link to="/noticias">
            <button className="more-news">MAIS NOTÍCIAS</button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Home;
