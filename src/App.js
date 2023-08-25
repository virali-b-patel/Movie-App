import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Explore from "./Components/Explore/Explore";
import MoviePage from "./Components/MoviePage/MoviePage";

function App() {

  const [searchTerm, setSearchTerm] = useState('')

  const onSearch = (e) => setSearchTerm(e.currentTarget.value)

  return (
    <div className="App">
      <Router>
        <Navbar onSearch={onSearch} searchTerm={searchTerm}/>
        <Routes>
          <Route path="/movie/:movieId" element={<MoviePage />} />
          <Route path="/explore" element={<Explore searchTerm={searchTerm}/>} />
          <Route path="/" element={<Home searchTerm={searchTerm}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
