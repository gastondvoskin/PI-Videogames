import Card from "../Card/Card.jsx";
import Loading from "../Loading/Loading.jsx";
import styles from "./Cards.module.css";
import { hardcodedObject, secondHardcodedObject, dbHardcodedObject, hardcodedArray } from "../../hardcodedVideogames";
import { useSelector } from 'react-redux';
import { useEffect } from "react";



// copy loading, validations and errors from Detail.jsx

const Cards = (props) => {
    const { VG_PER_PAGE } = props;

    const currentVg = useSelector(state => state.currentVg);
    // console.log('currentVg in Cards: ', currentVg);
    const pageNumber = useSelector(state => state.pageNumber);
    // console.log('pageNumber: ', pageNumber);
    const firstVgRenderedIndex = (pageNumber - 1) * VG_PER_PAGE;  // eg. 0, 15, 30, 45
    // console.log('firstVgRenderedIndex: ', firstVgRenderedIndex);
    const lastVgRenderedIndex = firstVgRenderedIndex + VG_PER_PAGE - 1 // eg. 14, 29, 44
    // console.log('lastVgRenderedIndex: ', lastVgRenderedIndex);
    const renderedVg = currentVg.slice(firstVgRenderedIndex, lastVgRenderedIndex + 1);  
    // eg [slice(0, 15)], slice(15, 29)
    // console.log('renderedVg: ', renderedVg);

    return (
        typeof currentVg === 'string' 
        ? <h1 className={styles.notFoundText}>{currentVg}</h1> 
        : <div className={styles.mainContainer}>   
            {
                !currentVg.length ? 
                <Loading />
                : renderedVg.map((vg, index) => {
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