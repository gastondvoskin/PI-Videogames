const {
    handleGetVg,
    handleGetVgById, 
    handleGetGenres,
    handlePostVg 
} = require('../handlers/handlers.js');

const { Router } = require('express');
// Importar todos los routers;

const router = Router();

// in the case I got more routes, create new routes files and replace rouse.get or router.post for router.use to modularize. 
router.get('/videogames/:idVideogame', handleGetVgById);
router.get('/videogames', handleGetVg);
router.get('/genres', handleGetGenres);
router.post('/videogames', handlePostVg);

module.exports = router;


