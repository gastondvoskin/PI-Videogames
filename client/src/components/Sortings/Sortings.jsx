import { sortByAlphabet, sortByRating } from "../../redux/actions";
import { useDispatch } from 'react-redux'; 
import { useState } from "react";

const Sortings = () => {
    const [ order, setOrder ] = useState('');

    const dispatch = useDispatch();
    
    const handleSort = (event) => {
        const order = event.target.value;
        /* setOrder takes some time */
        setOrder(order); 
        console.log('event.target.value in Sorting: ', event.target.value);
        // console.log("order === 'a_z' : ", order === 'a_z');
        // console.log("order === 'z_a' : ", order === 'z_a');
        // console.log("order === 'ratingAsc' : ", order === 'ratingAsc');
        // console.log("order === 'ratingDesc' : ", order === 'ratingDesc');

        /* order refers to the updated value inside handleSort, not to the localState */
        if (order === 'a_z' || order === 'z_a') {
            dispatch(sortByAlphabet(order));
        } else if (order === 'ratingAsc' || order === 'ratingDesc') {
            dispatch(sortByRating(order));
        }
    };

    return (
        <div>
            <span>Sort by alphabet or rating {' '}</span>
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
        </div>
    );
};

export default Sortings; 



// OLD
{/* <select name="sortByRating">
    <option disabled>Sort by rating </option>
    <option value="Hardcoded value 2">Highest first</option>
    <option value="Hardcoded value 2">Lowest first</option>
</select>  */}
// ↑↑ ↓↓    {'\u2192'}

