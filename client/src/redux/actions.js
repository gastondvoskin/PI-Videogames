import { GET_ALL_VG, SEARCH_BY_NAME, RESET_FILTERS, FILTER_BY_CREATOR, FILTER_BY_GENRE, SORT_BY_ALPHABET, SORT_BY_RATING, UPDATE_PAGE_NUMBER, GET_GENRES, UPDATE_VG } from "./actions-types"; 
import axios from 'axios';


export const getAllVg = () => {
    const API_URL = '/videogames'; 
    return async (dispatch) => {
        try {
            const response = await axios.get(API_URL); 
            const allVg = response.data;
            dispatch({ 
                type: GET_ALL_VG, 
                payload: allVg 
            });
        } catch (error) {
            alert(error.message);
        };
    };
};

export const searchByName = (vgName) => {
    const API_URL = `/videogames?name=${vgName}`; 

    return async (dispatch) => {
        try {
            const response = await axios.get(API_URL);
            const vgByName = response.data;
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
    return {
        type: FILTER_BY_CREATOR,
        payload: creator
    };
};

export const filterByGenre = (genres) => {
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
    return {
        type: SORT_BY_RATING,
        payload: order
    };
};

export const updatePageNumber = (page) => {
    return {
        type: UPDATE_PAGE_NUMBER,
        payload: page
    };
};

export const getGenres = () => {
    return async (dispatch) => {
        const API_URL = '/genres'; 
        const response = await axios.get(API_URL);
        const genres = response.data;
        dispatch({
            type: GET_GENRES,
            payload: genres
        });
    };
};

export const updateWithNewVg = (newVg) => {
    return {
        type: UPDATE_VG,
        payload: newVg
    }
}