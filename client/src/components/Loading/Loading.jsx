import styles from "./Loading.module.css";
import loadingGif from "../../assets/loading.gif"; 

const Loading = () => {
    return (
        <div className={styles.mainContainer}>
            <h1 className={styles.text}>Loading...</h1> 
            <img className={styles.gif} src={loadingGif} alt="Loading" />
        </div>
    );
};

export default Loading;
