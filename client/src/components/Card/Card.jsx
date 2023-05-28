import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import noImage from "../../assets/noImage.png";

const Card = ({id, name, background_image, genres, rating}) => {

    return (
        <div className={styles.mainContainer}>
            {
                !name 
                ? <h3>No name provided</h3>
                : <h3>{name}</h3>
            }

            <img 
                className={styles.image} 
                src={background_image ? background_image : noImage} 
                alt="Videogame" 
            />               

            <p> Genres:{" "}
                {
                    !genres?.length
                    ? <span>No genres provided</span>
                    : genres.map((genre, index) => {
                        return(
                            genres.length - 1 === index ?
                            <span key={index}>{genre}</span>
                            : <span key={index}>{`${genre} | `}</span>
                        ) 
                    })
                }
            </p>

            <p>{`★ ${rating}`}</p>

            <Link to={`/detail/${id}`}>
                <button className={styles.seeMoreButton}>See more</button>
            </Link>
        </div>
    );
};

export default Card; 