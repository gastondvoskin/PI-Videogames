const {
    getAllVg,
    getVgByName,
    getVgById,
    getGenres,
    postVg
} = require('../controllers/controllers.js');


const handleGetVg = (req, res) => {
    try {
        const { name } = req.query;
        const vg = name ? getVgByName(name) : getAllVg();
        res.status(200).send(vg);   
    } catch (error) {
        console.log('catch de handleGetVg');
    };
};

const handleGetVgById = (req, res) => {
    try {
        const id = req.params.idVideogame;
        const vg = getVgById(id);
        res.status(200).send(vg);   
    } catch (error) {
        console.log('catch de handleGetVgById');        
    };
};

const handleGetGenres = (req, res) => {
    try {
        const genres = getGenres();
        res.status(200).send(genres);   
    } catch (error) {
        console.log('catch de handleGetGenres');
    };
};

const handlePostVg = (req, res) => {
    try {
        const { name, background_image, platforms, released, rating, description } = req.body;
        const newVg = postVg(name, background_image, platforms, released, rating, description);
        res.status(200).send(newVg);   
    } catch (error) {
        console.log('catch de handlePostVg');        
    }
};

module.exports = {
    handleGetVg,
    handleGetVgById, 
    handleGetGenres,
    handlePostVg 
};