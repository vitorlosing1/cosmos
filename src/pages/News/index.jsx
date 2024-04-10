import React, { useState, useEffect } from "react";
import "./styles.scss";
import { fetchAndSaveNews } from "../../api/newsApi";

function News() {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 20;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const fetchedNews = await fetchAndSaveNews();
        const startIndex = (currentPage - 1) * newsPerPage;
        const endIndex = startIndex + newsPerPage;
        const newNews = fetchedNews.slice(startIndex, endIndex);
        if (currentPage === 1) {
          setNews(newNews);
        } else {
          setNews((prevNews) => [...prevNews, ...newNews]);
        }
      } catch (error) {
        console.error("Erro ao buscar notícias:", error);
      }
    };

    fetchNews();
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;
      nextPage();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const openArticle = (link) => {
    window.open(link, "_blank");
  };

  return (
    <main className="news-container">
      {news.map((item, index) => (
        <div className="news-box" key={index}>
          <div className="news-item">
            <img className="news-img" src={item.image} alt={item.title} />
            <div className="news-content">
              <small className="date">{item.publishedAt}</small>
              <h4 className="news-title">{item.title}</h4>
              <p>{item.content}</p>
              <small className="source">Fonte: {item.sourceName}</small>
              <button
                className="read-article"
                onClick={() => openArticle(item.link)}
              >
                Ler artigo completo
              </button>
            </div>
          </div>
          <hr />
        </div>
      ))}
    </main>
  );
}

export default News;
