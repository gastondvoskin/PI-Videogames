const { Videogame, Genre } = require('../db.js');
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Op } = require("sequelize");

const getVgByName = async (name) => {
    // data from db
    const dbData = await Videogame.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`     
            }
        },
        include: [{
            model: Genre,
            attributes: ['name'],           // ['name'] to get only 'name' from Genres table (exclude id).
            through: {attributes: []}       // [] to exclude junction table. See eager loading. 
        }]
    });

    // may be modularized with a cleaner function
    const dbVgByNameClean = dbData.map((vg) => {
        const { id, name, background_image, platforms, released, rating, Genres } = vg;
        console.log('Genres: ', Genres);

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

    // data from rawg
    const API_URL = `https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`;
    const apiData = await axios.get(API_URL);
    const apiVgByNameRawFirstFilt = apiData.data.results;

    // second filter to unify criteria with db search
    const apiVgByNameRawSecondFilt = apiVgByNameRawFirstFilt.filter(vg => { 
        return vg.name.toLowerCase().includes(name.toLowerCase());
    });
    // in case rawg doesn't find any videogame with the provided name, apiVgByNameRaw will be []
    // what happens if name, background_image, etc are empty for a rawg mistake? Should I verify?
    const apiVgByNameClean = apiVgByNameRawSecondFilt.map((vg) => {                         // changed
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

    // concat db with rawg
    const allVgByName = [...dbVgByNameClean, ...apiVgByNameClean];

    // slice up to 15 videogames
    const numberOfResults = 15; 
    const fifteenVgByNameSlice = allVgByName.slice(0,numberOfResults); 

    // return 15 videogames or return a message in case the array is empty. 
    return fifteenVgByNameSlice.length ? 
    fifteenVgByNameSlice 
    : `No videogames were found with the name ${name}`;
};


module.exports = getVgByName;