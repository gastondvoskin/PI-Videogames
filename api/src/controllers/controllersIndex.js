const getAllVg = require('./getAllVgController.js');
const getVgByName = require('./getVgByNameController.js');
const getVgById = require('./getVgByIdController.js');
const getGenres = require('./getGenresController.js');
const postVg = require('./postVgController.js');

module.exports = {
    getAllVg,
    getVgByName,
    getVgById,
    getGenres,
    postVg
};