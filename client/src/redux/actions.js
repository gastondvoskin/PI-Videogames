import { GET_ALL_VG, SEARCH_BY_NAME, RESET_FILTERS, FILTER_BY_CREATOR, FILTER_BY_GENRE, SORT_BY_ALPHABET, SORT_BY_RATING } from "./actions-types"; 
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

export const searchByName = (vgName) => {
    const API_URL = `http://localhost:3001/videogames?name=${vgName}`;
    return async (dispatch) => {
        try {
            const response = await axios.get(API_URL);
            const vgByName = response.data;
            // console.log('vgByName: ', vgByName);
            dispatch({
                type: SEARCH_BY_NAME,
                payload: vgByName
            });
        } catch (error) {
            alert(error.message);
        }
    };
};

export const resetFilters = () => {
    return {
        type: RESET_FILTERS
    };
};

export const filterByCreator = (creator) => {
    // console.log('inside filterByCreator action');
    return {
        type: FILTER_BY_CREATOR,
        payload: creator
    };
};

export const filterByGenre = (genres) => {
    // console.log('in filterByGenre action');
    return {
        type: FILTER_BY_GENRE,
        payload: genres
    };
};

export const sortByAlphabet = (order) => {
    return {
        type: SORT_BY_ALPHABET,
        payload: order
    };
};

export const sortByRating = (order) => {
    // console.log('in sortByRating action');
    return {
        type: SORT_BY_RATING,
        payload: order
    };
};

