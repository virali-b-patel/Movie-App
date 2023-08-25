import React, { useEffect, useState } from "react";
import styles from "./Explore.module.css";
import { getGenre, getMoviesWithGenreId } from "../../api/movies";
import Paginate from "../Paginate/Paginate";
import MovieCard from "../MovieCard/MovieCard";
import Navbar from "../Navbar/Navbar";

function Explore({searchTerm}) {
  const [allGenres, setAllGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isMoreMoviesLoading, setIsMoreMoviesLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isNearEnd, setIsNearEnd] = useState(false);

  const fetchAllGenres = () => {
    getGenre().then((res) => {
      if (!res) return;
      setAllGenres(res.genres);
      setSelectedGenres(res.genres[0]);
    });
  };

  const fetchMovies = (page) => {
    if (selectedGenres.length === 0) return;
    const ids = selectedGenres.id

    setIsMoreMoviesLoading(true);
    getMoviesWithGenreId(ids, page).then((res) => {
      setIsMoreMoviesLoading(false);
      if (!res) return;
      if (page === 1) {
        setTotalPages(res.total_pages);
        setMovies(res.results);
      } else {
        setMovies((prev) => [...prev, ...res?.results]);
      }
      setCurrentPage(res?.page);
    });
  };

  const searchResults = () => {
     const newMovies = movies.filter(data => data.title.toLowerCase().includes(searchTerm.toLowerCase()))
     setMovies(newMovies)
  }

  const handleGenreClick = (genre) => {
    setSelectedGenres(genre);
  };

  const handlePaginate = () => {
    if (isMoreMoviesLoading || currentPage >= totalPages) return;
    fetchMovies(currentPage + 1);
  };

  useEffect(() => {
    if (searchTerm.length > 0) return;
    fetchAllGenres()
  }, []);

  useEffect(() => {
    if(searchTerm.length > 0) return;
    if(selectedGenres.length === 0) return;
    if(isNearEnd) handlePaginate();
  }, [isNearEnd, selectedGenres.length > 0]);

  useEffect(() => {
    if(searchTerm.length > 0) return
    if(selectedGenres.length === 0) return;
    setCurrentPage(1)
    fetchMovies(1)
  }, [selectedGenres,searchTerm]);

  useEffect(() => {
    searchTerm.length > 2 && searchResults()
  },[searchTerm])

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          {allGenres.map((item) => {
            return (
              <div
                key={item.id}
                className={`${styles.chip} ${
                  selectedGenres.id === item.id ? styles.activeChip : ""
                    ? styles.activeChip
                    : ""
                }`}
                onClick={() => handleGenreClick(item)}
              >
                {item.name}
              </div>
            );
          })}
        </div>

        <p className={styles.title}>Explore Movies</p>
        <Paginate onIntersection={(isNearEnd) => setIsNearEnd(isNearEnd)}>
          <div className={styles.body}>
            {movies.map((item, index) => (
              <MovieCard movie={item} key={item.id + index + ""} />
            ))}
            {isMoreMoviesLoading && <b>Loading...</b>}
          </div>
        </Paginate>
      </div>
    </>
  );
}

export default Explore;
