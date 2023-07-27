require('dotenv').config();
const { Sequelize } = require('sequelize');
const VideogameModel = require("./models/Videogame.js");    // function
const GenreModel = require("./models/Genre.js");            // function


// NEW SEQUELIZE()
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, 
  {logging: false}
);


VideogameModel(sequelize);
GenreModel(sequelize);


// ASSOCIATIONS
const { Videogame, Genre } = sequelize.models;            // actual models
const JUNCTION_TABLE = 'Videogame_Genres';
Videogame.belongsToMany(Genre, {through: JUNCTION_TABLE});
Genre.belongsToMany(Videogame, {through: JUNCTION_TABLE});


// EXPORTS
module.exports = {
  sequelize, 
  ...sequelize.models
};
