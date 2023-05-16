import { sortByAlphabet } from "../../redux/actions";
import { useDispatch } from 'react-redux'; 
import { useState } from "react";

const Filters = () => {
    const [ order, setOrder ] = useState('')
    const dispatch = useDispatch();
    
    const handleSortByAlphabet = (event) => {
        setOrder(event.target.value); 
        console.log('event.target.value in Sorting: ', event.target.value);
        dispatch(sortByAlphabet(order));
    };
    // ↑↑     {'\u2192'}
    return (
        <div>
            <select name="sortByAlphabet" value={order} onChange={handleSortByAlphabet}>
                <option disabled value="">A-Z / Z-A</option>
                <option value="A-Z">{'\u2191'}</option> 
                <option value="Z-A">{'\u2193'}</option>
            </select>


            {/* <select name="filterByGenres">
                <option disabled>Genres </option>
                <option value="Hardcoded value 2">All genres</option>
                <option value="Hardcoded value 2">Action</option>
                <option value="Hardcoded value 2">Indie</option>
                <option value="Hardcoded value 2">Etc. Hardcoded</option>
            </select>
            
            <select name="filterByCreator">
                <option disabled>Creator </option>
                <option value="Hardcoded value 2">API</option>
                <option value="Hardcoded value 2">Client</option>
            </select> */}


            {/* <select name="sortByRating">
                <option disabled>Sort by rating </option>
                <option value="Hardcoded value 2">Highest first</option>
                <option value="Hardcoded value 2">Lowest first</option>
            </select> */}

        </div>
    );
};

export default Filters; 