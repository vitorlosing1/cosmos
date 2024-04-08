import "./styles/App.scss";
import Footer from "./components/Footer";
import NavBar from "./components/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
