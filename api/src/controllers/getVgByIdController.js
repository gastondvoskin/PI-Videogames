const { Videogame, Genre } = require('../db.js');
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;


const getVgById = async (id) => {
    // 'NIY: Esta ruta obtiene el detalle de un videojuego específico. Es decir que devuelve un objeto con la información pedida en el detalle de un videojuego. El videojuego es recibido por parámetro (ID).   Tiene que incluir los datos del género del videojuego al que está asociado.    Debe funcionar tanto para los videojuegos de la API como para los de la base de datos.'

    // console.log('id: ', id);
    // console.log('isNaN(id): ', isNaN(id))
    
    const source = isNaN(id) ? 'db' : 'rawg';
    // console.log('source: ', source);
    if (source === 'db') {
        // add genres
        const dbData = await Videogame.findByPk(id, {
            include: [{
                model: Genre,
                attributes: ['name'],           // ['name'] to get only 'name' from Genres table (exclude id).
                through: {attributes: []}       // [] to exclude junction table. See eager loading. 
            }]
        });
        if (!dbData) throw Error(`Request failed with status code 404. There is no videogame with the id ${id}`);
        const { name, background_image, platforms, released, rating, Genres, description } = dbData;
        const vgByIdClean = {
            id, 
            name, 
            background_image, 
            platforms,
            released, 
            rating,
            genres: Genres.map(genre => genre.name),
            description
        }
        return vgByIdClean;    
    }; 

    if (source === 'rawg') {
        const API_URL = `https://api.rawg.io/api/games/${id}?key=${API_KEY}`;
        const apiData = await axios.get(API_URL);
        const vgByIdRaw = apiData.data;
        // what happens if name, background_image, etc are empty for a rawg mistake? Should I verify?
        const { name, background_image, platforms, released, rating, genres, description } = vgByIdRaw;
        const vgByIdClean = {
            id, 
            name, 
            background_image, 
            platforms: platforms.map(platform => platform.platform.name),
            released, 
            rating,
            genres: genres.map(genre => genre.name),
            description
        };
        return vgByIdClean;
    };

};



module.exports = getVgById;