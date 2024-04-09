import axios from "axios";
import { translateApi } from "./translateApi";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { format } from "date-fns";

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
    const response = await axios.get(
      `https://api.spaceflightnewsapi.net/v4/articles/?limit=20`
    );

    const translatedNews = await Promise.all(
      response.data.results.map(async (article) => {
        const translatedTitle = await translateApi().translateText(
          article.title
        );
        const translatedContent = await translateApi().translateText(
          article.summary
        );
        const formattedDate = format(
          new Date(article.published_at),
          "dd/MM/yyyy 'às' HH:mm"
        ); // Formata a data de publicação
        return {
          title: translatedTitle,
          image: article.image_url,
          content: translatedContent,
          publishedAt: formattedDate,
        };
      })
    );
    saveNewsToFirebase(translatedNews); // Salva as notícias no Firebase
    return translatedNews; // Retorna as notícias filtradas e traduzidas
  } catch (error) {
    console.error("Erro ao buscar e salvar notícias:", error);
    throw error; // Lança o erro para que seja tratado no componente Home
  }
};

export { fetchAndSaveNews };
