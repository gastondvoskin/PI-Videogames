import { Link } from "react-router-dom";
import styles from "./NetworkError.module.css";

const NetworkError = () => {
    return (
        <div className={styles.mainContainer}>
            <h2 className={styles.errorCode}>Error 404</h2>
            <h1 className={styles.errorMessage}>Not connected to server</h1>
            <Link to={`/home`}>
                <button className={styles.goBackButton}>Go back home</button>
            </Link>

        </div>
    )
};

export default NetworkError;