const { Videogame, Genre } = require('../db.js');
const axios = require('axios');
require('dotenv').config();

const { API_KEY } = process.env;


const getAllVg = async () => {
    // 'NIY: Obtiene un arreglo de objetos, donde cada objeto es un videojuego con su información'
    // hardcoded
    const allVg = ['hola'];
    
    // data from rawg
    // const API_URL = `https://api.rawg.io/api/games?key=${API_KEY}`;
    // const apiData = await axios.get(API_URL);
    // const allVgRaw = apiData.data.results;
    // const allVgClean = allVgRaw.map((vg) => {
    //     const { id, name, background_image, platforms, released, rating } = vg;
    //     return {
    //         id, 
    //         name, 
    //         background_image, 
    //         platforms: platforms.map((platform) => platform.platform.name),
    //         released, 
    //         rating
    //     }
    // });

    // data from DB
    const dbData = await Videogame.findAll();
    console.log(dbData);
    return dbData;
    // return allVg;
};

const getVgByName = (name) => {
    return 'NIY: Esta ruta debe obtener los primeros 15 videojuegos que se encuentren con la palabra recibida por query. Debe poder buscarlo independientemente de mayúsculas o minúsculas. Si no existe el videojuego, debe mostrar un mensaje adecuado. Debe buscar tanto los de la API como los de la base de datos.'
};

const getVgById = (id) => {
    return 'NIY: Esta ruta obtiene el detalle de un videojuego específico. Es decir que devuelve un objeto con la información pedida en el detalle de un videojuego. El videojuego es recibido por parámetro (ID).   Tiene que incluir los datos del género del videojuego al que está asociado.    Debe funcionar tanto para los videojuegos de la API como para los de la base de datos.'
};



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
        return genresClean;    
    };

};

const postVg = async (name, background_image, platforms, released, rating, description, genres) => {
    // 'NIY: Esta ruta recibirá todos los datos necesarios para crear un videojuego y relacionarlo con sus géneros solicitados. Toda la información debe ser recibida por body. Debe crear un videojuego en la base de datos, y este debe estar relacionado con sus géneros indicados (al menos uno).'
    const vgInstance = await Videogame.create({
        name, background_image, platforms, released, rating, description
    });
    const genresFromDb = await Genre.findAll({where: {name: genres}});
    await vgInstance.addGenres(genresFromDb);
    const vgCreated = {name, background_image, platforms, released, rating, description, genres};
    return vgCreated;
};

module.exports = {
    getAllVg,
    getVgByName,
    getVgById,
    getGenres,
    postVg
};