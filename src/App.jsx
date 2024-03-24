import "./App.css";
import Footer from "./components/Footer";
import NavBar from "./components/Header";
import { Outlet } from "react-router-dom";

function App() {
  console.log(import.meta.env.VITE_API_KEY);
  return (
    <div className="container">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
