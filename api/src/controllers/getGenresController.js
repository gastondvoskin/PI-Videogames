const { Genre } = require('../db.js');
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;


let genresAreLoaded = false;

const getGenres = async () => {
    // 'NIY: Obtiene un arreglo con todos los géneros existentes de la API.  En una primera instancia, cuando la base de datos este vacía, deberás guardar todos los géneros que encuentres en la API. Estos deben ser obtenidos de la API (se evaluará que no haya hardcodeo). Luego de obtenerlos de la API, deben ser guardados en la base de datos para su posterior consumo desde allí.'

    // const hardCodedGenres = ["Action","Indie","Adventure","RPG","Strategy","Shooter","Casual","Simulation","Puzzle","Arcade","Platformer","Massively Multiplayer","Racing","Sports","Fighting","Family","Board Games","Educational","Card"];

    if (genresAreLoaded) {
        // search in DB (after first time)
        console.log('genresAreLoaded: ', genresAreLoaded);
        const genresRaw = await Genre.findAll();
        const genresCleam = genresRaw.map(genre => genre.name);
        return genresCleam;
    } else {
        // search in rawg (only the first time)
        console.log('genresAreLoaded: ', genresAreLoaded);
        const API_URL = `https://api.rawg.io/api/genres?key=${API_KEY}`;
        const apiData = await axios.get(API_URL);
        const genresRaw = apiData.data.results;
        const genresClean = genresRaw.map((genre) => genre.name);
        const promises = genresClean.map((genre) => {
            return Genre.findOrCreate({
                where: {name: genre}
            });
        });
        await Promise.all(promises);
        genresAreLoaded = true; 
        console.log('genresClean.length: ', genresClean.length);
        return genresClean;    
    };

};

module.exports = getGenres;