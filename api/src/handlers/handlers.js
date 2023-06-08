// REQUIRE: controllers
const {
    getAllVg,
    getVgByName,
    getVgById,
    getGenres,
    postVg
} = require('../controllers/controllersIndex.js');


// handleGetVg
const handleGetVg = async (req, res) => {
    // getVgByName for searchBar. 
    // getAllVg to load the videogames in the reducer when entering to Home. 
    try {
        const { name } = req.query;
        const vg = name ? await getVgByName(name) : await getAllVg();
        // res.status(200).send('ok');
        res.status(200).send(vg);   
        console.log('vg.length: ', vg.length);
    } catch (error) {
        console.log('catch inside of handleGetVg');
        res.status(500).send({error: error.message});   /* 500 for internal server errors */
    };
};


// handleGetVgById
const handleGetVgById = async (req, res) => {
    // getBgById to load a videogame in the Detail view. 
    try {
        let id = req.params.idVideogame;
        const vg = await getVgById(id);
        res.status(200).send(vg);   
    } catch (error) {
        console.log('catch inside of handleGetVgById'); 
        res.status(404).send({error: error.message});       /* 404: not found */
    };
};


// handleGetGenres
const handleGetGenres = async (req, res) => {
    try {
        const genres = await getGenres();
        res.status(200).send(genres);   
    } catch (error) {
        console.log('catch inside of handleGetGenres');
        res.status(500).send({error: error.message});     /* 500 for internal server errors */
    };
};


// handlePostVg
const handlePostVg = async (req, res) => {
    // postVg to add a vg to the DB when submittin correctly the form.  
    try {
        const { name, background_image, platforms, released, rating, description, genres } = req.body;
        const vgCreated = await postVg(name, background_image, platforms, released, rating, description, genres);
        res.status(201).send(vgCreated); 
        // res.status(201).send("Videogame added to database.");
    } catch (error) {
        console.log('catch inside of handlePostVg');
        res.status(400).send({error: error.message});           /* 400 for client errors such as invalid inputs */
    };
};


// module.exports 
module.exports = {
    handleGetVg,
    handleGetVgById, 
    handleGetGenres,
    handlePostVg 
};