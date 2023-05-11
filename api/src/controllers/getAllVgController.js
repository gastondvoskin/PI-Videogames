const { Videogame, Genre } = require('../db.js');
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;


const getAllVg = async () => {
    
    // 'NIY: Obtiene un arreglo de objetos, donde cada objeto es un videojuego con su información'

    // data from DB
    const dbData = await Videogame.findAll({
        include: [{
            model: Genre,
            attributes: ['name'],           // ['name'] to get only 'name' from Genres table (exclude id).
            through: {attributes: []}       // [] to exclude junction table. See eager loading. 
        }]
    });

    const dbVideogames = dbData.map((vg) => {
        const { id, name, background_image, platforms, released, rating, Genres } = vg;
        return {
            id, 
            name, 
            background_image, 
            platforms,
            released, 
            rating,
            genres: Genres.map(genre => genre.name)
        }
    }); 
    console.log('dbVideogames.length: ', dbVideogames.length);

    // data from rawg
    const BASE_API_URL = `https://api.rawg.io/api/games?key=${API_KEY}`;
    const numberOfResultsPerPage = 40;            // number of results from rawg
    const numberOfResultsExpected = 150; 
    const numberOfRequestsRequired = Math.ceil(numberOfResultsExpected/numberOfResultsPerPage);        // Math.ceil(150/40) // 4


    const apiResponses = [];
    for (let page = 1; page <= numberOfRequestsRequired; page++) {
        const apiResponse = await axios.get(`${BASE_API_URL}&page_size=${numberOfResultsPerPage}&page=${page}`); 
                // apiResponse = { data: { results: [ { id: 1, name: 'example' }, { id: 2, name: 'example 2' } ] } }
        console.log('page: ', page);
        // console.log('typeof apiResponse: ', typeof apiResponse);
        apiResponses.push(apiResponse); 
    };
    console.log('apiResponses.length: ', apiResponses.length); 
    

    const apiVgUnflattened = apiResponses.map(apiResponse => apiResponse.data.results);   
    console.log('apiVgUnflattened.length: ', apiVgUnflattened.length);
                // apiVgUnflattened = [ [ { id: 1, name: 'example' }, { id: 2, name: 'example 2' } ], [{ id: 41, name: 'example 41' }] ]
    const apiVgRaw = apiVgUnflattened.flat(1); 
    // console.log(apiVgRaw);
                // apiVgRaw = [ { id: 1, name: 'example' }, { id: 2, name: 'example 2' }, { id: 41, name: 'example 41' } ]
    console.log('apiVgRaw.length: ', apiVgRaw.length);
                                //!!!!!!!!!! check if there are duplicated elements after cleaning the array with another method to compare objects
    
    const apiVideogamesClean = apiVgRaw.map((vg) => {
        const { id, name, background_image, platforms, released, rating, genres } = vg;
        return {
            id, 
            name, 
            background_image, 
            platforms: platforms.map(platform => platform.platform.name),
            released, 
            rating,
            genres: genres.map(genre => genre.name),
        }
    });

    const arrayOfIds = apiVideogamesClean.map((el) => el.id);
    // console.log('arrayOfIds: ', arrayOfIds); 

    const setFromArrayOfIds = new Set(arrayOfIds);
    console.log('setFromArrayOfIds.size: ', setFromArrayOfIds.size);
    const duplicatedElements = arrayOfIds.length !== setFromArrayOfIds.size;
    console.log('There are duplicated elements in the array: ', duplicatedElements);

    // return apiVideogamesClean;           // only to debug

    
    // db and rawg
    const allVg = [...dbVideogames, ...apiVideogamesClean];
    console.log('allVg.length: ', allVg.length);

    return allVg;
};


module.exports = getAllVg;

