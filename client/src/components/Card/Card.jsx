import { Link } from "react-router-dom";
import styles from "./Card.module.css";

const Card = ({id, name, background_image, genres}) => {

    return (
        <div className={styles.mainContainer}>
            <h3>{`${name} 🔥`}</h3>

            <img className={styles.image} src={background_image} alt="Videogame"/>

            <p> Genres:{" "}
                {genres.map((genre, index) => {
                    return(
                        genres.length - 1 === index ?
                        <span key={index}>{genre}</span>
                        : <span key={index}>{`${genre} | `}</span>
                    ) 
                })}
            </p>

            <Link to={`/detail/${id}`}>
                <button className={styles.seeMoreButton}>See more</button>
            </Link>
        </div>
    );
};

export default Card; 