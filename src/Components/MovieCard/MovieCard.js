import React from "react";
import styles from "./MovieCard.module.css";
import { Link } from "react-router-dom";

const imagePrefixUrl = "http://image.tmdb.org/t/p/w500";

function MovieCard(props) {
  const movie = props?.movie;
  
  return (
    <Link
      to={`/movie/${movie.id}`}
      target="_blank"
      className={styles.container}
      title={movie?.title}
    >
      <img src={`${imagePrefixUrl}${movie?.poster_path}`} alt={movie?.title} />
      <p>{movie?.title}</p>
    </Link>
  );
}

export default MovieCard;
// "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg"
