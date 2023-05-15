import { GET_ALL_VG } from "./actions-types"; 
import { hardcodedArray, bigHardcodedArray } from "../hardcodedVideogames";

const initialState = {
    allVg: [],
    currentVg: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_VG: {
            return {
                ...state, 
                allVg: action.payload,
                currentVg: action.payload
            }
        }
        default: 
            return state;
    }
};

export default rootReducer;