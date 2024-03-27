import axios from "axios";

export const translateApi = () => {
  const apiGoogle = import.meta.env.VITE_API_GOOGLE;

  const translateText = async (texto) => {
    try {
      const response = await axios.post(
        "https://translation.googleapis.com/language/translate/v2",
        {},
        {
          params: {
            q: texto,
            target: "pt",
            key: apiGoogle,
          },
        }
      );
      return response.data.data.translations[0].translatedText;
    } catch (error) {
      console.log("Não foi possível traduzir o texto: " + error);
      return texto;
    }
  };

  return { translateText };
};
