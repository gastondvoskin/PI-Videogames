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

    // add logic to render the slice of currentVg according to the page. Replace currentVg.map in the render for renderedVg.map. 
    
    // const renderedVg
    
    return (
        typeof currentVg === 'string' 
        ? <h1 className={styles.notFoundText}>{currentVg}</h1> 
        : <div className={styles.mainContainer}>   
            {
                !currentVg.length ? 
                <Loading />
                : currentVg.map((vg, index) => {
                    return (
                        <Card 
                            key={index}
                            id={vg.id}
                            name={vg.name}
                            background_image={vg.background_image}
                            genres={vg.genres}
                            rating={vg.rating}
                        />        
                    )
                })
            }
        </div>
    );
};

export default Cards; 