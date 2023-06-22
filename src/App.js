import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Explore from "./Components/Explore/Explore";
import MoviePage from "./Components/MoviePage/MoviePage";

function App() {
  console.log(window.location);

  return (
    <div className="App">
      <Router>
        {window.location.pathname !== "/explore" && <Navbar />}

        <Routes>
          <Route path="/movie/:movieId" element={<MoviePage />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
