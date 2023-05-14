import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
    return (
        <div className={styles.mainContainer}>
            <h2 className={styles.errorCode}>Error 404</h2>
            <h1 className={styles.errorMessage}>Videogame not found</h1>
            <Link to={`/home`}>
                <button className={styles.goBackButton}>Go back home</button>
            </Link>
        </div>
    )
};

export default NotFound;