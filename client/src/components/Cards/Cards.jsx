import Card from "../Card/Card.jsx";
import Loading from "../Loading/Loading.jsx";
import styles from "./Cards.module.css";
import { hardcodedObject, secondHardcodedObject, dbHardcodedObject, hardcodedArray } from "../../hardcodedVideogames";
import { useSelector } from 'react-redux';
import { useEffect } from "react";



// copy loading, validations and errors from Detail.jsx

const Cards = () => {
    const currentVg = useSelector(state => state.currentVg);
    console.log('currentVg in Cards: ', currentVg);
    
    return (
        <div className={styles.mainContainer}>   
            {
                !currentVg.length ? 
                <Loading />
                : currentVg.map((element, index) => {
                    return (
                        <Card 
                            key={index}
                            id={element.id}
                            name={element.name}
                            background_image={element.background_image}
                            genres={element.genres}
                        />        
                    )
                })
            }
        </div>
    );
};

export default Cards; 