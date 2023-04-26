import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Landing from "./views/LandingPage/LandingPage";
import Home from "./views/Home/Home";
import Detail from "./views/Detail/Detail";
import Form from "./views/Form/Form";
import NavBar from "./components/NavBar/NavBar";
import NotFound  from "./components/NotFound/NotFound";
import axios from "axios";
// axios.defaults.baseURL = "http://localhost:3001";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar />}

      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/countries/:id" element={<Detail />} />
        <Route exact path="/form" element={<Form/>} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
