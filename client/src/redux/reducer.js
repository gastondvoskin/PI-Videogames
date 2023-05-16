import { GET_ALL_VG, SORT_BY_ALPHABET, SORT_BY_RATING, FILTER_BY_CREATOR} from "./actions-types"; 
import { hardcodedArray, bigHardcodedArray, hardcodedSmallArray } from "../hardcodedVideogames";

const initialState = {
    allVg: [],
    filteredByCreator: [],
    filteredByGenres: [],
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
                filteredByCreator: [...allVg],
                filteredByGenres: [...allVg],
                currentVg: [...allVg]
                // allVg: [...hardcodedSmallArray],
                // currentVg: [...hardcodedSmallArray]
            };
        };

        

        case FILTER_BY_CREATOR: {
            // console.log('in FILTER_BY_CREATOR case');
            const creator = action.payload;
            // console.log('creator in FILTER_BY_CREATOR case: ', creator);

            // console.log('delayed state.filteredByCreator.length', state.filteredByCreator.length);

            let filteredByCreator;

            if (creator === 'all') {
                filteredByCreator = [...state.allVg];
            } else if (creator === 'client') {
                filteredByCreator = [...state.allVg].filter(vg => {
                    return isNaN(vg.id)
                })
            } else if (creator === 'api') {
                filteredByCreator = [...state.allVg].filter(vg => {
                    return !isNaN(vg.id)
                })
            };

            const currentVg = filteredByCreator.filter(vg => {
                return state.filteredByGenres.includes(vg)
            });

            // console.log('delayed state.filteredByCreator.length', state.filteredByCreator.length);

            return {
                ...state,
                filteredByCreator: filteredByCreator,
                currentVg: currentVg        
            };
        };




        case SORT_BY_ALPHABET: {
            // console.log('here in SORT_BY_ALPHABET case')
            // console.log('state 1: ', state)
            const order = action.payload;       // 'a_z' or 'z_a'
            const compareFunction = ((a, b) => {
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
            });

            // sort changes the array in place. Then we make a copy of state.currentVg
            const sortedAz = [...state.currentVg].sort(compareFunction);
            // console.log('sortedAz: ', sortedAz);
            // console.log('state 2: ', state);
            // console.log('order in reducer: ', order);
            const sortedVg = order === 'a_z' ? sortedAz : [...sortedAz].reverse();
            // console.log('sortedVg: ', sortedVg);

            return {
                ...state,
                currentVg: sortedVg
            };
        };


        case SORT_BY_RATING: {
            // console.log('here in SORT_BY_RATING case');
            const order = action.payload;       // 'ratingAsc' or 'ratingDesc'
            const compareFunction = ((a, b) => {
                return a.rating - b.rating;
            });

            const sortedAsc = [...state.currentVg].sort(compareFunction);
            const sortedVg = order === 'ratingAsc' ? sortedAsc : [...sortedAsc].reverse();

            return {
                ...state,
                currentVg: sortedVg
            }
        };


        default: 
            return {...state};
    };
};

export default rootReducer;