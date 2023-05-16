import { filterByCreator } from "../../redux/actions";
import { useDispatch } from 'react-redux'; 
import { useState } from "react";
import hardcodedGenres from "../../hardcodedGenres";
import styles from "./Filters.module.css";

const Filters = () => {
    const [ creator, setCreator ] = useState('');
    const [ genres, setgenres ] = useState('');

    const dispatch = useDispatch();
    
    const handleFilterByCreator = (event) => {
        // console.log('inside handleFilterByCreator handler');
        const creator = event.target.value;
        setCreator(creator);
        // console.log('creator: ', creator);
        // creator refers to the updated value inside handleFilterByCreator, not to the localState 
        dispatch(filterByCreator(creator));
    };

    return (
        <div className={styles.mainContainer}>
            
            <span>Filter by {' '}</span>
            <select 
                name="filterByCreator"
                value={creator}
                onChange={handleFilterByCreator}
            >
                <option disabled value="">Creator</option>
                <option value="all">All</option>
                <option value="client">Client</option>
                <option value="api">API</option>
            </select> 

            <select 
                name="filterByGenres"
                value={genres}
                /* onChange={handleFilterByGenres} */
            >
                <option disabled value="">Genres</option>
                <option value="allGenres">All genres</option>
                {/* replace hardcoded array */}
                {
                    hardcodedGenres.map((genre, index) => {
                        return (
                            <option 
                                key={index}
                                value={genre}                                
                            >{genre}
                            </option>
                        );
                    })
                }
                
                <option value="client">Client</option>
            </select> 
        </div>
    );
};

export default Filters; 
