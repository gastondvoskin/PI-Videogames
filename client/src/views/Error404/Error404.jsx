import { Link } from "react-router-dom";
import styles from "./Error404.module.css";
// import pacman from "../../assets/errorGifs/pacman.gif";
import labyrinth from "../../assets/errorGifs/labyrinth.gif";
import maze from "../../assets/errorGifs/maze.gif";

const Error404 = () => {
  return (
    <div className={styles.mainContainer}>
      {/* TEXTS */}
      <h2 className={styles.errorCode}>Error 404</h2>
      <h1 className={styles.errorMessage}>Page not found</h1>

      {/* GIF */}
      {/* <img className={styles.gif} src={pacman} alt="Page not found" /> */}
      {/* <img className={styles.gif} src={labyrinth} alt="Page not found" /> */}
      <img className={styles.gif} src={maze} alt="Page not found" />

      {/* GOBACK BUTTON */}
      <Link to={`/home`}>
        <button className={styles.goBackButton}>Go back home</button>
      </Link>
    </div>
  );
};

export default Error404;
