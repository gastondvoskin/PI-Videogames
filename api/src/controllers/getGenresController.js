const { Genre } = require('../db.js');
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;


let genresAreLoaded = false;

const getGenres = async () => {
    if (genresAreLoaded) {
        // search in DB (after first time)
        const genresRaw = await Genre.findAll();
        const genresClean = genresRaw.map(genre => genre.name);
        return genresClean;
    } else {
        // search in rawg (only the first time)
        const API_URL = `https://api.rawg.io/api/genres?key=${API_KEY}`;
        const apiData = await axios.get(API_URL);
        const genresRaw = apiData.data.results;
        const genresClean = genresRaw.map((genre) => genre.name);
        // create rows in Genres table
        const promises = genresClean.map((genre) => {
            return Genre.findOrCreate({
                where: {name: genre}
            });
        });
        await Promise.all(promises);
        // a less efficient way would be replacing promises... and Pormise.all with the following code: 
        // await genresClean.forEach(genre => {
        //     Genre.findOrCreate({
        //         where: {name: genre}
        //     })
        // });
        
        genresAreLoaded = true; 
        return genresClean;    
    };

};

module.exports = getGenres;