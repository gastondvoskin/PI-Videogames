import { GET_ALL_VG, SORT_BY_ALPHABET } from "./actions-types"; 
import { hardcodedArray, bigHardcodedArray, hardcodedSmallArray } from "../hardcodedVideogames";

const initialState = {
    allVg: [],
    currentVg: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_VG: {
            // console.log('state: ', state)
            const allVg = action.payload;
            return {
                ...state, 
                allVg: [...allVg],
                currentVg: [...allVg]
                // allVg: [...hardcodedSmallArray],
                // currentVg: [...hardcodedSmallArray]
            };
        };

        case SORT_BY_ALPHABET: {
            // console.log('state 1: ', state)
            const order = action.payload;       // 'A -Z' or 'Z - A'
            const compareFunction = ((a, b) => {
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();
                if (nameA > nameB) return -1;
                if (nameA < nameB) return 1;
                return 0;
            });

            // sort changes the array in place. Then we make a copy of state.currentVg
            const sortedAz = [...state.currentVg].sort(compareFunction);
            console.log('sortedAz: ', sortedAz);
            // console.log('state 2: ', state);
            console.log('order in reducer: ', order);
            const sortedVg = order === 'A-Z' ? sortedAz : [...sortedAz].reverse();
            console.log('sortedVg: ', sortedVg);

            return {
                ...state,
                currentVg: sortedVg
            };
        };

        default: 
            return state;
    };
};

export default rootReducer;