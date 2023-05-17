import { searchByName, resetFilters } from "../../redux/actions";
import { filterByCreator, filterByGenre } from "../../redux/actions";
import { sortByAlphabet, sortByRating } from "../../redux/actions";
import { useDispatch } from 'react-redux'; 
import { useState } from "react";
import styles from "./Filters.module.css";
import hardcodedGenres from "../../hardcodedGenres";

const Filters = () => {
    const [ vgName, setVgName ] = useState('');
    const [ creator, setCreator ] = useState('');
    const [ genre, setGenre ] = useState('');
    const [ order, setOrder ] = useState('');

    const dispatch = useDispatch();

    // add searchbar input and button handlers. 
    const handleSearchInput = (event) => {
        const inputValue = event.target.value;
        setVgName(inputValue);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        dispatch(searchByName(vgName));
        setCreator('');
        setGenre('');
        setOrder(''); 
    };

    const handleResetFilters = (event) => {
        event.preventDefault();
        dispatch(resetFilters());
        setVgName('');
        setCreator('');
        setGenre('');
        setOrder(''); 
    };

    
    const handleFilterByCreator = (event) => {
        // console.log('inside handleFilterByCreator handler');
        const creator = event.target.value;
        // setCreator takes some time
        setCreator(creator);
        // creator refers to the updated value inside handleFilterByCreator, not to the localState 
        dispatch(filterByCreator(creator));
        setOrder('');
    };

    const handleFilterByGenre = (event) => {
        // console.log('inside handleFilterByCreator handler');
        const genre = event.target.value;
        setGenre(genre);
        dispatch(filterByGenre(genre));
        setOrder('');
    };

    const handleSort = (event) => {
        const order = event.target.value;
        setOrder(order); 
        if (order === 'a_z' || order === 'z_a') {
            dispatch(sortByAlphabet(order));
        } else if (order === 'ratingAsc' || order === 'ratingDesc') {
            dispatch(sortByRating(order));
        }
    };


    return (
        <div className={styles.mainContainer}>

            <div className={styles.formAndResetContainer}>
                <form 
                    className={styles.searchBar}
                    onSubmit={handleSearchSubmit}
                >
                    <input 
                        className={styles.searchInput}
                        type="text"
                        placeholder="Search by name..."
                        value={vgName}
                        onChange={handleSearchInput}
                    />

                    <button 
                        className={styles.searchSubmitButton}
                        type="submit"
                        >
                        🔍
                    </button>
                </form>

                <button
                    className={styles.resetButton}
                    onClick={handleResetFilters}
                >
                    Reset filters
                </button>
            </div>

            <div className={styles.filters}>
                <span>Filter by {' '}</span>

                <select 
                    className={styles.creatorSelect}
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
                    className={styles.genreSelect}
                    name="filterByGenre"
                    value={genre}
                    onChange={handleFilterByGenre}
                >
                    <option disabled value="">Genre</option>
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
                </select> 
            </div>

            <div className={styles.sortings}>
                <span>Sort by {' '}</span>
                <select 
                    className={styles.sortSelect}
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
            </div>                
            
        </div>
    );
};

export default Filters; 
