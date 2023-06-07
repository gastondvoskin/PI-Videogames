// REQUIRE: ROUTER from express AND HANDLERS
const { Router } = require('express');
const {
    handleGetVg,
    handleGetVgById, 
    handleGetGenres,
    handlePostVg 
} = require('../handlers/handlers.js');


// ROUTER()
const router = Router();


// ROUTES
// To add many more routes, modularize: create new routes files and replace rouse.get or router.post for router.use. 
router.get('/videogames/:idVideogame', handleGetVgById);
router.get('/videogames', handleGetVg);
router.get('/genres', handleGetGenres);
router.post('/videogames', handlePostVg);


// EXPORTS
module.exports = router;


