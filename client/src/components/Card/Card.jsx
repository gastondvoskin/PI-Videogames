import { Link, NavLink } from "react-router-dom";
import styles from "./Card.module.css";
import noImage from "../../assets/noImage.png";

const Card = ({ id, name, background_image, genres, rating }) => {
  return (
    <NavLink
      to={`/detail/${id}`}
      className={styles.NavLink}
      /* className={({ isActive }) => (isActive ? styles.activeLink : styles.normalLink)} */
    >
      <div className={styles.mainContainer}>
        {/* IMAGE */}
        <img
          className={styles.image}
          src={background_image ? background_image : noImage}
          alt="Videogame"
        />

        {/* NAME */}
        {!name ? (
          <h3 className={styles.title}>No name provided</h3>
        ) : (
          <h3 className={styles.title}>{name}</h3>
        )}

        {/* RATING */}
        <p className={styles.rating}>{`☆ ${rating}`}</p>

        {/* GENRES */}
        <p className={styles.genres}>
          {!genres?.length ? (
            <span>No genres provided</span>
          ) : (
            genres.map((genre, index) => {
              return genres.length - 1 === index ? (
                <span key={index}>{genre}</span>
              ) : (
                <span key={index}>{`${genre} - `}</span>
              );
            })
          )}
        </p>
      </div>
    </NavLink>
  );
};

export default Card;
