import axios from "axios";
import { translateApi } from "./translateApi";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child, push } from "firebase/database";
import { format } from "date-fns";
import { decode } from "html-entities";

const apiFirebase = import.meta.env.VITE_API_FIREBASE;
const firebaseConfig = {
  apiKey: `${apiFirebase}`,
  authDomain: "cosmos-16b3c.firebaseapp.com",
  databaseURL: "https://cosmos-16b3c-default-rtdb.firebaseio.com",
  projectId: "cosmos-16b3c",
  storageBucket: "cosmos-16b3c.appspot.com",
  messagingSenderId: "749524648802",
  appId: "1:749524648802:web:2f6671aebc7ed5c2a0223b",
};

const firebaseApp = initializeApp(firebaseConfig);

const saveNewsToFirebase = async (news) => {
  try {
    const db = getDatabase(firebaseApp);
    const newsRef = ref(db, "news");
    set(newsRef, news);
  } catch (error) {
    console.error("Erro ao salvar notícias no Firebase:", error);
  }
};

const fetchAndSaveNews = async () => {
  try {
    // Recupera as notícias salvas no Firebase
    const db = getDatabase(firebaseApp);
    const newsRef = ref(db, "news");
    const snapshot = await get(child(newsRef, "/"));
    const firebaseNews = snapshot.val() || [];

    // Faz a requisição para obter as notícias mais recentes
    const response = await axios.get(
      `https://api.spaceflightnewsapi.net/v4/articles/?limit=100`
    );

    const apiNews = response.data.results;

    // Verifica se há notícias com IDs diferentes das notícias já salvas
    const newNews = apiNews.filter((apiArticle) => {
      return !firebaseNews.some((firebaseArticle) => {
        return firebaseArticle.link === apiArticle.url;
      });
    });

    // Se houver notícias novas, atualiza as notícias no Firebase
    if (newNews.length > 0) {
      const translatedNews = await Promise.all(
        newNews.map(async (article) => {
          const translatedTitle = await translateApi().translateText(
            article.title
          );
          const translatedContent = await translateApi().translateText(
            article.summary
          );

          // arruma os caracteres especiais
          const decodedTitle = decode(translatedTitle);
          const decodedContent = decode(translatedContent);
          let truncatedContent = decodedContent.substring(0, 280); // Limita o conteúdo a 200 caracteres
          if (decodedContent.length > 280) {
            truncatedContent += "..."; // Adiciona "..." ao final se o conteúdo exceder 200 caracteres
          }
          const formattedDate = format(
            new Date(article.published_at),
            "dd/MM/yyyy 'às' HH:mm"
          ); // Formata a data de publicação
          return {
            title: decodedTitle,
            image: article.image_url,
            content: truncatedContent,
            publishedAt: formattedDate,
            sourceName: article.news_site,
            link: article.url,
          };
        })
      );

      // Atualiza as notícias no Firebase apenas se houver notícias novas na request
      if (translatedNews.length > 0) {
        const mergedNews = [...translatedNews, ...firebaseNews];
        saveNewsToFirebase(mergedNews);
      }
    }

    // Retorna as notícias da request API
    return firebaseNews;
  } catch (error) {
    console.error("Erro ao buscar e salvar notícias:", error);
    throw error; // Lança o erro para que seja tratado no componente Home
  }
};

export { fetchAndSaveNews };
