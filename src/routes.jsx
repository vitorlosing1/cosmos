import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home/index";
import PicDay from "./pages/PicDay";
import ErrorPage from "./pages/Error";
import News from "./pages/News";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "foto-do-dia",
        element: <PicDay />,
      },
      {
        path: "noticias",
        element: <News />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

export default routes;
