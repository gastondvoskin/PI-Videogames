// To reduce the requests, set const numberOfResultsExpected = to 40 instead of 150 (line 42). 


const { Videogame, Genre } = require('../db.js');
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;


const getAllVg = async () => {
    // data from DB
    const dbData = await Videogame.findAll({
        include: [{
            model: Genre,
            attributes: ['name'],           // ['name'] to get only 'name' from Genres table (exclude id).
            through: {attributes: []}       // [] to exclude junction table. See eager loading. 
        }]
    });

    // may be modularized with a cleaner function
    const dbVideogames = dbData.map((vg) => { 
        /* The Home component does not require the inclusion of platform information or release dates */ 
        /* id is required to go to the Detail view. */
        const { id, name, background_image, platforms, released, rating, Genres } = vg;
        return {
            id, 
            name, 
            background_image, 
            /* platforms, */
            /* released, */ 
            rating,
            genres: Genres.map(genre => genre.name)
        }
    }); 
    // console.log('dbVideogames.length: ', dbVideogames.length);


    // data from rawg
    const BASE_API_URL = `https://api.rawg.io/api/games?key=${API_KEY}`;
    const numberOfResultsPerPage = 40;            // number of results from rawg
    const numberOfResultsExpected = 40;           // 150
    const numberOfRequestsRequired = Math.ceil(numberOfResultsExpected/numberOfResultsPerPage);        // Math.ceil(150/40) // 4

    // requests to rawg will be saved in apiPromises
    const apiPromises = [];
    for (let page = 1; page <= numberOfRequestsRequired; page++) {
        // console.log('page: ', page);
        apiPromises.push(axios.get(`${BASE_API_URL}&page_size=${numberOfResultsPerPage}&page=${page}`)); 
        // axios.get(`${BASE_API_URL}&page_size=${numberOfResultsPerPage}&page=${page}` is a Promise which will resolve in an OBJECT to push into apiPromises.  
        // { data: { results: [ { id: 1, name: 'example' }, { id: 2, name: 'example 2' } ] } }
        // less eficient way: declaring apiVideogamesClean = [] outside the for loop and pushing the clean results of each promise as follows: 
        // let result = await axios.get(`${BASE_API_URL}&page_size=${numberOfResultsPerPage}&page=${page}`); 
        // result = result.data.results;
        // const resultClean = result.map((vg) => {
        //     return {id: vg.id, name: vg.name, background_image: vg.background_image, rating: vg.rating, genres: vg.genres.map(genre => genre.name)}
        // });
        // apiVideogamesClean.push(resultClean);
    };
    // console.log('apiPromises.length: ', apiPromises.length);      // 4
    // console.log('apiPromises: ', apiPromises);                    // array of Promises

    // The result of the promises will be saved in promisesResults. After that, the result will be mapped to get all the data of each videogame. 
    const promisesResults = await Promise.all(apiPromises);        
    const apiVgUnflattened = promisesResults.map(apiResponse => apiResponse.data.results);   
    // console.log('apiVgUnflattened.length: ', apiVgUnflattened.length);
                // apiVgUnflattened = [ [ { id: 1, name: 'example' }, { id: 2, name: 'example 2' } ], [{ id: 41, name: 'example 41' }] ]
    const apiVgRaw = apiVgUnflattened.flat(1); 
    // console.log('apiVgRaw.length: ', apiVgRaw.length);
                // apiVgRaw = [ { id: 1, name: 'example' }, { id: 2, name: 'example 2' }, { id: 41, name: 'example 41' } ]

    // apiVideogamesClean will be the final information of each videogame. 
    let apiVideogamesClean = apiVgRaw.map((vg) => {
        const { id, name, background_image, /* parent_platforms,  */released, rating, genres } = vg;
        return {
            id, 
            name, 
            background_image, 
            /* platforms: parent_platforms.map(parent_platform => parent_platform.platform.name), */
            /* released, */ 
            rating,
            genres: genres.map(genre => genre.name),
        };
    });

    // Slice to get exactly 150 result instead of 160
    apiVideogamesClean = apiVideogamesClean.slice(0, numberOfResultsExpected);

    // // Code to check there are no duplicates in the final result (only to debug). 
    // const arrayOfIds = apiVideogamesClean.map((el) => el.id);
    // const setFromArrayOfIds = new Set(arrayOfIds);
    // console.log('setFromArrayOfIds.size: ', setFromArrayOfIds.size);
    // const duplicatedElements = arrayOfIds.length !== setFromArrayOfIds.size;
    // console.log('There are duplicated elements in the array: ', duplicatedElements);

    // Code to compare one element from dbVideogame with ome element from apiVideogamesClean
    // console.log ('[dbVideogames[1], apiVideogamesClean[150]] : ', [dbVideogames[0], apiVideogamesClean[150]]); 

    // db and rawg
    const allVg = [...dbVideogames, ...apiVideogamesClean];
    // console.log('allVg.length: ', allVg.length);

    // to debug, comment the retur line to see the logs in the console. 
    return allVg;
};


module.exports = getAllVg;


