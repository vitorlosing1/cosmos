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
        setNews(fetchedNews.slice(startIndex, endIndex));
      } catch (error) {
        console.error("Erro ao buscar notícias:", error);
      }
    };

    fetchNews();
  }, [currentPage]);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <main className="news-container">
      {news.map((item, index) => (
        <div className="news-item" key={index}>
          <img className="news-img" src={item.image} alt={item.title} />
          <div className="news-content">
            <small className="date">{item.publishedAt}</small>
            <h4 className="news-title">{item.title}</h4>
            <p>{item.content}</p>
            <button className="read-article">Ler artigo completo</button>
          </div>
        </div>
      ))}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>{currentPage}</span>
        <button onClick={nextPage}>Próxima</button>
      </div>
    </main>
  );
}

export default News;
