const { Videogame, Genre } = require('../db.js');
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;

const getVgByName = (name) => {
    return 'NIY: Esta ruta debe obtener los primeros 15 videojuegos que se encuentren con la palabra recibida por query. Debe poder buscarlo independientemente de mayúsculas o minúsculas. Si no existe el videojuego, debe mostrar un mensaje adecuado. Debe buscar tanto los de la API como los de la base de datos.'
};


module.exports = getVgByName;