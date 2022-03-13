import styles from "./MovieDetails.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { get } from "../utils/httpCliente";
import { Spinner } from "../components/Spinner";
import { getMovieImg } from "../utils/getMovieImg";

export function MovieDetails() {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    let isMounted = true;

    get("/movie/" + movieId).then((data) => {
      if (isMounted) {
        setMovie(data);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [movieId]);

  if (isLoading) {
    return <Spinner />;
  }

  const imageUrl = getMovieImg(movie.poster_path, 500);
  return (
    <div className={styles.detailsContainer}>
      <img
        className={`${styles.col} ${styles.movieImage}`}
        src={imageUrl}
        alt={movie.title}
      />
      <div className={`${styles.col} ${styles.MovieDetails}`}>
        <p className={styles.firstItem}>
          <strong>Title: </strong>
          {movie.title}
        </p>
        <p>
          <strong>Genres:</strong>{" "}
          {movie.genres.map((genre) => genre.name).join(", ")}
        </p>
        <p>
          <strong>Description: </strong>
          {movie.overview}
        </p>
      </div>
    </div>
  );
}
