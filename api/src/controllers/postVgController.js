const { Videogame, Genre } = require('../db.js');


const postVg = async (name, background_image, platforms, released, rating, description, genres) => {

    // simple validatations. There are more validations in the front-end before submitting the Form. 
    if (!name) throw Error('The request is missing the name field');
    // The result of adding a validation that does not exist in the front-end is that the window.alert says "Videogame added to DB" and the videogame will appear in Home.jsx if not refreshing, but the videogame was not actually added to the DB but to the currentVg property in redux. Then, when refreshing, the videogame will not be rendered.
    // if (name.length > 4) throw Error('The name cannot have more than 4 characters');        
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
    console.log('vgInstance: ', vgInstance);
    // const vgCreated = {name, background_image, platforms, released, rating, description, genres};
    // return vgCreated;
    return vgInstance;
};


module.exports = postVg;