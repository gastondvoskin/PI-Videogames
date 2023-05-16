// import { sortByAlphabet, sortByRating } from "../../redux/actions";
import { useDispatch } from 'react-redux'; 
import { useState } from "react";
import hardcodedGenres from "../../hardcodedGenres";
import styles from "./Filters.module.css";

const Filters = () => {
    // const [ order, setOrder ] = useState('');
    const [ creator, setCreator ] = useState('');
    const [ genres, setgenres ] = useState('');

    const dispatch = useDispatch();
    
    // const handleSort = (event) => {
    //     const order = event.target.value;
    //     /* setOrder takes some time */
    //     setOrder(order); 
    //     console.log('event.target.value in Sorting: ', event.target.value);
    //     // console.log("order === 'a_z' : ", order === 'a_z');
    //     // console.log("order === 'z_a' : ", order === 'z_a');
    //     // console.log("order === 'ratingAsc' : ", order === 'ratingAsc');
    //     // console.log("order === 'ratingDesc' : ", order === 'ratingDesc');

    //     /* order refers to the updated value inside handleSort, not to the localState */
    //     if (order === 'a_z' || order === 'z_a') {
    //         dispatch(sortByAlphabet(order));
    //     } else if (order === 'ratingAsc' || order === 'ratingDesc') {
    //         dispatch(sortByRating(order));
    //     }
    // };
    // ↑↑ ↓↓    {'\u2192'}
    return (
        <div className={styles.mainContainer}>
            {/* <span>Sort by alphabet or rating {' '}</span>
            <select 
                name="Sort" 
                value={order} 
                onChange={handleSort}
            >
                <option disabled value="">Sort</option>
                <option value="a_z">A-Z</option> 
                <option value="z_a">Z-A</option> 
                <option value="ratingAsc">Rating ↑</option> 
                <option value="ratingDesc">Rating ↓</option> 
            </select>
            <br /> */}

            {/* <select name="filterByGenres">
                <option disabled>Genres </option>
                <option value="Hardcoded value 2">All genres</option>
                <option value="Hardcoded value 2">Action</option>
                <option value="Hardcoded value 2">Indie</option>
                <option value="Hardcoded value 2">Etc. Hardcoded</option>
            </select> */}
            
            <span>Filter by {' '}</span>
            <select 
                name="filterByCreator"
                value={creator}
                /* onChange={handleFilterByCreator} */
            >
                <option disabled value="">Creator</option>
                <option value="all">All</option>
                <option value="client">Client</option>
                <option value="api">API</option>
            </select> 
            <br />

            <span>Filter by {' '}</span>
            <select 
                name="filterByGenres"
                value={genres}
                /* onChange={handleFilterByGenres} */
            >
                <option disabled value="">Genres</option>
                {/* map genres and display an option for each */}
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



// OLD
{/* <select name="sortByRating">
    <option disabled>Sort by rating </option>
    <option value="Hardcoded value 2">Highest first</option>
    <option value="Hardcoded value 2">Lowest first</option>
</select>  */}
