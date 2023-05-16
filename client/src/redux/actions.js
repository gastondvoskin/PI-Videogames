import { GET_ALL_VG, SORT_BY_ALPHABET, SORT_BY_RATING } from "./actions-types"; 
import { hardcodedArray } from "../hardcodedVideogames";
import axios from 'axios';

// change it to return an action which makes a request
export const getAllVg = () => {
    // replace this code for a request to the server
    const API_URL = 'http://localhost:3001/videogames';
    return async (dispatch) => {
        try {
            const response = await axios.get(API_URL);
            const allVg = response.data;
            dispatch({ 
                type: GET_ALL_VG, 
                payload: allVg 
            });
        } catch (error) {
            console.log(error);
            alert(error.message);
        };
    };
};

export const sortByAlphabet = (order) => {
    return {
        type: SORT_BY_ALPHABET,
        payload: order
    }
};

export const sortByRating = (order) => {
    console.log('action sortByRating');
    return {
        type: SORT_BY_RATING,
        payload: order
    }
};
