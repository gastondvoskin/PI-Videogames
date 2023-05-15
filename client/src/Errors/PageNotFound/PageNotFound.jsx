import { Link } from "react-router-dom";
import styles from "./PageNotFound.module.css";
import labyrinth from "../../assets/labyrinth.gif"

const PageNotFound = () => {
    return (
        <div className={styles.mainContainer}>
            <h2 className={styles.errorCode}>Error 404</h2>
            <h1 className={styles.errorMessage}>Page not found</h1>
            <Link to={`/home`}>
                <button className={styles.goBackButton}>Go back home</button>
            </Link>
            <img className={styles.gif} src={labyrinth} alt="Page not found" />
        </div>
    )
};

export default PageNotFound;