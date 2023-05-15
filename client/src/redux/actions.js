import { GET_ALL_VG } from "./actions-types"; 
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