import React, { useState, useEffect } from "react";
import "./styles.scss";
import { fetchAndSaveNews } from "../../api/newsApi";
import { DarkIcon } from "../../assets/svg/DarkIcon";

function News() {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const [hasMoreNews, setHasMoreNews] = useState(true); // Estado para controlar se há mais notícias para carregar
  const newsPerPage = 20;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const fetchedNews = await fetchAndSaveNews();
        const startIndex = (currentPage - 1) * newsPerPage;
        const endIndex = startIndex + newsPerPage;
        const newNews = fetchedNews.slice(startIndex, endIndex);
        if (currentPage === 1) {
          setNews(fetchedNews.slice(0, newsPerPage));
        } else {
          setNews((prevNews) => [...prevNews, ...newNews]);
        }
        setLoading(false); // Atualizar o estado para indicar que o carregamento terminou

        // Verificar se há mais notícias disponíveis
        if (fetchedNews.length <= endIndex) {
          setHasMoreNews(false);
        }
      } catch (error) {
        console.error("Erro ao buscar notícias:", error);
      }
    };

    fetchNews();
  }, [currentPage]);

  const loadMoreNews = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const openArticle = (link) => {
    window.open(link, "_blank");
  };

  return (
    <main className="news-container">
      {loading ? ( // Verificar se o carregamento está em andamento
        <div className="loading">
          <DarkIcon />
        </div>
      ) : (
        <>
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
                    className="read-article-btn"
                    onClick={() => openArticle(item.link)}
                  >
                    Ler artigo completo em {item.sourceName}
                  </button>
                </div>
              </div>
              <hr />
            </div>
          ))}
          {hasMoreNews && (
            <button className="load-more-btn" onClick={loadMoreNews}>
              Carregar mais notícias
            </button>
          )}
        </>
      )}
    </main>
  );
}

export default News;
