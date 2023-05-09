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
    //         platforms: platforms.map(platform => platform.platform.name),
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


const getVgById = async (id) => {
    // 'NIY: Esta ruta obtiene el detalle de un videojuego específico. Es decir que devuelve un objeto con la información pedida en el detalle de un videojuego. El videojuego es recibido por parámetro (ID).   Tiene que incluir los datos del género del videojuego al que está asociado.    Debe funcionar tanto para los videojuegos de la API como para los de la base de datos.'

    // console.log('id: ', id);
    // console.log('isNaN(id): ', isNaN(id))
    
    const source = isNaN(id) ? 'db' : 'rawg';
    // console.log('source: ', source);
    if (source === 'db') {
        // add genres
        const dbDataRaw = await Videogame.findByPk(id, {
            include: [{
                model: Genre,
                attributes: ['name'],           // ['name'] to get only 'name' from Genres table (exclude id).
                through: {attributes: []}       // [] to exclude junction table. See eager loading. 
            }]
        });
        if (!dbDataRaw) throw Error(`Request failed with status code 404. There is no videogame with the id ${id}`);
        const { name, background_image, platforms, released, rating, Genres, description } = dbDataRaw;
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
    // validate all the required data to create a videogame was received.
    if (!name) throw Error('The request is missing the name field');
    if (!background_image) throw Error('The request is missing the background_image field');
    if (!platforms.length) throw Error('The videogame must have at least one platform');
    if (!released) throw Error('The request is missing the released field');
    if (!rating) throw Error('The request is missing the name rating');
    if (!description) throw Error('The request is missing the description field');
    if (!genres.length) throw Error('The videogame must have at least one genre');

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