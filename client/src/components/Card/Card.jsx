import { Link } from "react-router-dom";
import styles from "./Card.module.css";

const Card = ({id, name, background_image, genres}) => {

    return (
        <div className={styles.mainContainer}>
            <h3>{name}</h3>
            <img className={styles.image} src={background_image} />
            <h5>
                {genres.map((genre, index) => <li key={index}>{genre}</li>)}
            </h5>
            <Link to={`/detail/${id}`}>
                <button>See more</button>
            </Link>
        </div>
    );
};

export default Card; 