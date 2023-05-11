const {
    getAllVg,
    getVgByName,
    getVgById,
    getGenres,
    postVg
} = require('../controllers/controllersIndex.js');


const handleGetVg = async (req, res) => {
    try {
        const { name } = req.query;
        const vg = name ? getVgByName(name) : await getAllVg();
        console.log(vg);
        res.status(200).send(vg);   
    } catch (error) {
        console.log('catch de handleGetVg');
        res.status(400).send({error: error.message})      // 400? 
    };
};

const handleGetVgById = async (req, res) => {
    try {
        let id = req.params.idVideogame;
        const vg = await getVgById(id);
        res.status(200).send(vg);   
    } catch (error) {
        console.log('catch de handleGetVgById'); 
        res.status(404).send({error: error.message})  
    };
};

const handleGetGenres = async (req, res) => {
    try {
        const genres = await getGenres();
        res.status(200).send(genres);   
    } catch (error) {
        console.log('catch de handleGetGenres');
        res.status(400).send({error: error.message})      // 400? 
    };
};

const handlePostVg = async (req, res) => {
    try {
        const { name, background_image, platforms, released, rating, description, genres } = req.body;
        const vgCreated = await postVg(name, background_image, platforms, released, rating, description, genres);
        res.status(201).send(vgCreated);   
    } catch (error) {
        console.log('catch de handlePostVg');
        res.status(400).send({error: error.message})      // 400? 
    }
};

module.exports = {
    handleGetVg,
    handleGetVgById, 
    handleGetGenres,
    handlePostVg 
};