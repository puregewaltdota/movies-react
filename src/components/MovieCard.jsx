import { Link } from "react-router-dom";
import styles from "./MovieCard.module.css";
import { getMovieImg } from "../utils/getMovieImg";

export function MovieCard({ movie }) {
  const imageUrl = getMovieImg(movie.poster_path, 300);
  return (
    <li className={styles.movieCard}>
      <Link to={"/movies/" + movie.id}>
        <img
          className={styles.movieImage}
          src={imageUrl}
          alt={movie.title}
          width={230}
          height={345}
        />
      </Link>
      <div>{movie.title}</div>
    </li>
  );
}
