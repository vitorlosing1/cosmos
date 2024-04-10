import axios from "axios";
import { translateApi } from "./translateApi";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database";
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

    // Retorna as notícias salvas no Firebase instantaneamente
    // Se houver notícias no Firebase, retorna essas notícias
    if (firebaseNews.length > 0) {
      return firebaseNews;
    }

    // Se não houver notícias no Firebase, faz a requisição para obter as notícias mais recentes
    const response = await axios.get(
      `https://api.spaceflightnewsapi.net/v4/articles/?limit=100`
    );

    const translatedNews = await Promise.all(
      response.data.results.map(async (article) => {
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
      saveNewsToFirebase(translatedNews);
    }

    // Retorna as notícias da request API
    return translatedNews;
  } catch (error) {
    console.error("Erro ao buscar e salvar notícias:", error);
    throw error; // Lança o erro para que seja tratado no componente Home
  }
};

export { fetchAndSaveNews };
