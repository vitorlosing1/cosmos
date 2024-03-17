import "./App.css";
import Footer from "./components/Footer";
import NavBar from "./components/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <main>
      <NavBar />
      <Outlet />
      <Footer />
    </main>
  );
}

export default App;
