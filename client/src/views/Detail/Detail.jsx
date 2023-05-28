import { Link, useParams } from "react-router-dom";
import styles from "./Detail.module.css";
import axios from 'axios';
import { useState, useEffect } from "react";
import PageNotFound from "../../Errors/PageNotFound/PageNotFound";
import NetworkError from "../../Errors/NetworkError/NetworkError.jsx";
import Loading from "../../components/Loading/Loading";
import noImage from "../../assets/noImage.png";
// import { hardcodedObject, secondHardcodedObject, dbHardcodedObject, hardcodedArray } from "../../hardcodedResources/hardcodedVideogames";


const Detail = () => {
    const { id } = useParams();
    // NIY: refactor vgDetail to initialize with empty properties, so I will need less validations. 
    const [ vgDetail, setVgDetail ] = useState({});     // {} instead of null to validate object properties
    const [ errorState, setErrorState ] = useState('');

    useEffect(() => {
        /* setVgDetail(dbHardcodedObject); */
        axios.get(`http://localhost:3001/videogames/${id}`)
        .then(response => response.data)
        .then(data => {
            setVgDetail(data); 
        })
        .catch(error => {
            // console.log(error);
            setErrorState(error.code); 
        })

        return () => {
            setVgDetail({});
        }
    }, [id]);

    // console.log(vgDetail.name)
    // console.log(Object.keys(vgDetail).length)
    // console.log('errorState: ', errorState);

    const { name, background_image, platforms, released, rating, genres, description } = vgDetail;

    return (
        errorState 
            ? errorState === 'ERR_BAD_REQUEST' 
                ? <PageNotFound />
                : <NetworkError />
            : !Object.keys(vgDetail).length  
                ? <Loading />
                : <div className={styles.mainContainer}>

                    <div className={styles.leftContainer}>

                        <img 
                            className={styles.image} 
                            src={background_image ? background_image : noImage} 
                            alt="Videogame" 
                        />               

                        <p className={styles.id}>{`Id: ${id}`}</p>

                        <p>
                            👉 Rating:{" "} 
                                {
                                    rating === undefined 
                                    ? <span>No rating provided</span>
                                    : <span>{rating}</span>
                                }
                        </p> 

                        <p>
                            👉 Released:{" "} 
                                {
                                    !released 
                                    ? <span>No date released provided</span>
                                    : <span>{released}</span>
                                }
                        </p> 


                        <p>👉 Genres:{" "}
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

                        <p>👉 Platforms:{" "}
                            {
                                !platforms?.length
                                ? <span>No platforms provided</span>
                                : platforms.map((plaftorm, index) => {
                                    return(
                                        platforms.length - 1 === index ?
                                        <span key={index}>{plaftorm}</span>
                                        : <span key={index}>{`${plaftorm} | `}</span>
                                    ) 
                                })
                            }
                        </p>

                        <br /> 

                        {/* <Link to={`/home`}>
                            <button className={styles.goBackButton}>Go back home</button>
                        </Link> */}


                    </div>


                    <div className={styles.rightContainer}>

                        {
                            !name 
                            ? <h1>No name provided</h1>
                            : <h1>{`🔥🎮 ${name} 🎮🔥`}</h1>
                        }
                        
                        {
                            !description 
                            ? <div className={styles.description}>No description provided</div>
                            : <div
                                className={styles.description} 
                                dangerouslySetInnerHTML={{__html: description}}
                            >
                        </div>
                        }

                    </div>

                </div>
    );
};

export default Detail; 
