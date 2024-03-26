import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home/index";
import PicDay from "./pages/PicDay";

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
    ],
  },
]);

export default routes;
