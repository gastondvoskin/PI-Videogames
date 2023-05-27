import { GET_ALL_VG, SEARCH_BY_NAME, RESET_FILTERS, FILTER_BY_CREATOR, FILTER_BY_GENRE, SORT_BY_ALPHABET, SORT_BY_RATING, UPDATE_PAGE_NUMBER, GET_GENRES, UPDATE_VG} from "./actions-types"; 
// import { hardcodedArray, bigHardcodedArray, hardcodedSmallArray } from "../hardcodedVideogames";

const initialState = {
    allVg: [],
    filteredByCreator: [],
    filteredByGenre: [],
    currentVg: [],
    pageNumber: 1,
    genres: []
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
                filteredByGenre: [...allVg],
                currentVg: [...allVg]
                // allVg: [...hardcodedSmallArray],
                // currentVg: [...hardcodedSmallArray]
            };
        };

        case SEARCH_BY_NAME: {
            // console.log('inside SEARCH_BY_NAME case');
            const filteredByName = action.payload;
            // console.log('filteredByName: ', filteredByName);
            return {
                ...state,
                currentVg: filteredByName
            };
        };

        case RESET_FILTERS: {
            const currentVg = state.allVg;
            return {
                ...state,
                currentVg
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

            let currentVg = [...filteredByCreator].filter(vg => {
                return state.filteredByGenre.includes(vg)
            });

            // console.log('delayed state.filteredByCreator.length', state.filteredByCreator.length);
            // new
            if (!currentVg.length) {
                currentVg = "No videogames were found with the provided filters."
            };


            return {
                ...state,
                filteredByCreator: filteredByCreator,
                currentVg: currentVg        
            };
        };


        case FILTER_BY_GENRE: {
            // console.log('inside FILTER_BY_GENRE case');
            const genre = action.payload;
            console.log('genre in FILTER_BY_GENRE: ', genre);

            let filteredByGenre;

            if (genre === 'allGenres') {
                filteredByGenre = [...state.allVg];
            } else {
                filteredByGenre = [...state.allVg].filter(vg => {
                    console.log('vg.genres: ', vg.genres);
                    return vg.genres.includes(genre);
                })
            }; 

            let currentVg = [...filteredByGenre].filter(vg => {
                return state.filteredByCreator.includes(vg)
            });

            // new
            if (!currentVg.length) {
                currentVg = "No videogames were found with the provided filters."
            };

            return {
                ...state,
                filteredByGenre: filteredByGenre,
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
            };
        };


        case UPDATE_PAGE_NUMBER: {
            const pageNumber = action.payload;
            return {
                ...state,
                pageNumber
            };
        };


        case GET_GENRES: {
            const genres = action.payload;
            return {
                ...state,
                genres
            };
        };


        case UPDATE_VG: {
            const newVg = action.payload;
            const allVg = [newVg, ...state.allVg];

            return {
                ...state,
                allVg,
                filteredByCreator: allVg,
                filteredByGenre: allVg,
                currentVg: allVg
            };
        };


        default: 
            return {
                ...state
            };
    };
};

export default rootReducer;