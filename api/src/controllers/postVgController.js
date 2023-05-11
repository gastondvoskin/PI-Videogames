const { Videogame, Genre } = require('../db.js');


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


module.exports = postVg;