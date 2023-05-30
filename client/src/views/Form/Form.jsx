import styles from "./Form.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "../../redux/actions";
import axios from "axios";
import { updateWithNewVg } from "../../redux/actions";
import validationFunctions, { validateGenres, validatePlatforms, validateSubmit } from "./validateFunctions";
// import { hardcodedSmallArray } from "../../hardcodedResources/hardcodedVideogames.js";
// import hardcodedGenres from "../../hardcodedResources/hardcodedGenres.js";
// import hardcodedPlatforms from "../../hardcodedResources/hardcodedPlatforms";

const Form = () => {

    // *** ALLGENRES ***
    const dispatch = useDispatch();
    const allGenres = useSelector(state => state.genres);
    useEffect(() => {
        // in case the user types by hand the "/form" route 
        if (!allGenres.length) dispatch(getGenres());
    }, [dispatch, allGenres]);


    // *** LOCAL STATE ***
    const emptyVg = {name: '', image: '', description: '', released: '', rating: '', platforms: [''], genres: []};
    const emptyErrors = {name: '', image: '', description: '', released: '', rating: '', platforms: '', genres: ''};
    const emptyGenresBoxes = allGenres.map(genre => false);

    const [ vg, setVg ] = useState(emptyVg);
    const [ errors, setErrors ] = useState(emptyErrors);
    let [ genresBoxes, setGenresBoxes ] = useState(emptyGenresBoxes); 

    // console.log('genresBoxes: ', genresBoxes);
    // console.log('vg.genres: ', vg.genres);


    // *** HANDLECHANGE ***
    const handleChange = (event) => {
        // console.log('validationFunctions: ', validationFunctions);
        const { value } = event.target;       // name: name, image, description...
        const property = event.target.name;
        // console.log('validationFunctions[name]: ', validationFunctions[name]);
        setVg({...vg, [property]: value}); 
        const errorMessage = validationFunctions[property](value);
        setErrors({...errors, [property]: errorMessage});
    };


    // *** PLATFORMS ***
    const handlePlatformsChange = (event) => {
        const { value } = event.target;
        const index = Number(event.target.id);
        const firsPartOfPlatforms = vg.platforms.slice(0, index);     // array
        // console.log('firsPartOfPlatforms: ', firsPartOfPlatforms);
        const lastPartOfPlatforms = vg.platforms.slice(index + 1);
        // console.log('lastPartOfPlatforms: ', lastPartOfPlatforms);
        const platforms = [...firsPartOfPlatforms, value, ...lastPartOfPlatforms];
        setVg({...vg, platforms});
        const errorMessage = validatePlatforms(platforms);
        setErrors({...errors, platforms: errorMessage});
    };

    const handleAddPlatform = (event) => { 
        setVg({...vg, platforms: [...vg.platforms, '']});
    };

    const handleDeletePlatform = (event) => {
        const index = Number(event.target.id);
        const platforms = vg.platforms.filter((_platform, i) => i !== index);
        setVg({...vg, platforms: vg.platforms.filter((_platform, i) => i !== index)});
        const errorMessage = validatePlatforms(platforms);
        setErrors({...errors, platforms: errorMessage});
    };


    // *** GENRES ***
    const handleGenresChange = (event) => {
        const index = event.target.id; 
        const genreName = event.target.name;
        const oldValue = genresBoxes[index];
        const genres = oldValue === false 
        ? [...vg.genres, genreName] 
        : [...vg.genres.filter(genre => genre !== genreName)];

        setVg({...vg, genres});
        const errorMessage = validateGenres(genres);
        setErrors({...errors, genres: errorMessage});

        const updatedGenresBoxes = [...genresBoxes];
        updatedGenresBoxes[index] = !oldValue;
        setGenresBoxes(updatedGenresBoxes);
    };


    // *** SUBMIT ***
    const handleSubmit = (event) => {
        event.preventDefault();
        const errorMessage = validateSubmit(vg, errors); // '' or "Please... "
        if (errorMessage) {
            window.alert(errorMessage);  
        } else {
            const newVg = {...vg, background_image: vg.image}
            const API_URL = "http://localhost:3001/videogames"
            axios.post(API_URL, newVg)
                .then((response) => {console.log(response)})
                .catch((error) => {console.log(error)})
            dispatch(updateWithNewVg(newVg));
            window.alert("Videogame added to the Database");
            setVg(emptyVg);
            setGenresBoxes(emptyGenresBoxes);
        };
    };

    // *** AUTOCOMPLETE ***
    const handleAutocomplete = (event) => {

        const autocompletedVg = {
            name: "Example name to autocomplete", 
            image: "https://media.rawg.io/media/screenshots/5c4/5c41cb3b0d15ef0974f930898cedbc6c.jpg", 
            description: "This is an example description to autocomplete.", 
            released: "2000-11-11", 
            rating: "2.57", 
            platforms: ["Mac", "PlayStation", "My own platform"], 
            genres: ["Action", "Simulation", "Family"]
        };
        setVg(autocompletedVg);

        const updatedGenresBoxes = [...genresBoxes];
        updatedGenresBoxes[2] = true;
        updatedGenresBoxes[5] = true;
        updatedGenresBoxes[14] = true;
        setGenresBoxes(updatedGenresBoxes);
    };


    // *** RETURN ***
    return (
        !allGenres.length ? <p>Loading...</p>
        : <div className={styles.mainContainer}>
            {/* FORM */}
            <form 
                className={styles.formContainer}
                onSubmit={handleSubmit}
            >
                
                {/* NAME */}
                <label className={styles.label}>
                   NAME *{' '} 
                    <input 
                        className={`${styles.input} ${styles.nameInput}`}
                        name="name"
                        value={vg.name}
                        onChange={handleChange}
                        placeholder='Max 250 characters'
                        autoFocus={true}
                    />
                    {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
                </label>

                {/* IMAGE */}
                <label className={styles.label}>
                    IMAGE *{' '} 
                    <textarea 
                        className={styles.input}
                        name="image"
                        value={vg.image}
                        onChange={handleChange}
                        placeholder='Include https://'
                        rows="3"
                    />
                    {errors.image && <p className={styles.errorMessage}>{errors.image}</p>}
                </label>

                {/* DESCRIPTION */}
                <label className={styles.label}>
                    DESCRIPTION *{' '} 
                    <textarea 
                        className={styles.input}
                        name="description"
                        value={vg.description}
                        onChange={handleChange}
                        placeholder='Max 1000 characters'
                        rows="8"
                    />
                    {errors.description && <p className={styles.errorMessage}>{errors.description}</p>}
                </label>

                {/* RELEASED */}
                <label className={styles.label}>
                    DATE OF RELEASE *{' '} 
                    <input 
                        type="date"  /* date format depends on OS settings */
                        name="released"
                        className={`${styles.input} ${styles.dateInput}`}
                        value={vg.released}
                        onChange={handleChange}
                        max="9999-12-31"
                    />
                    {errors.released && <p className={styles.errorMessage}>{errors.released}</p>}
                </label>

                {/* RATING */}
                <label className={styles.label}>
                    RATING *{' '} 
                    <input 
                        type="number"
                        className={`${styles.input} ${styles.ratingInput}`}
                        name="rating"
                        value={vg.rating}
                        onChange={handleChange}
                        placeholder='1.00-5.00'
                        step="0.1"
                    />
                    {errors.rating && <p className={styles.errorMessage}>{errors.rating}</p>}
                </label>


                {/* PLATFORMS */}
                <fieldset className={styles.platformsContainer}>
                    <legend>PLATFORMS *{' '} </legend>
                    {vg.platforms?.map((platform, index) => {
                        return (
                            <div className={styles.platformsSubContainer} key={index}>
                                <input 
                                    /* className={styles.platformInput} */
                                    className={`${styles.input} ${styles.platformInput}`}
                                    id={index}
                                    type="text"
                                    value={platform}
                                    onChange={handlePlatformsChange}
                                    placeholder={`Platform ${index + 1}...`}
                                />
                                <button 
                                    id={index}
                                    className={styles.deletePlatformButton} 
                                    type="button" 
                                    onClick={handleDeletePlatform}
                                    >
                                    -
                                </button>
                                <button 
                                    className={styles.addPlatformButton} 
                                    type="button" 
                                    onClick={handleAddPlatform}
                                    >
                                    +
                                </button>
                            </div>
                        )
                    })}
                    {errors.platforms && <p className={styles.errorMessage}>{errors.platforms}</p>}

                </fieldset>


                {/* GENRES */}
                <fieldset className={styles.checkboxContainer}>
                    <legend>GENRES *{' '}</legend>
                    <div className={styles.checkboxSubcontainer}>
                        {allGenres.map((genre, index) => {
                            return (
                                <label className={styles.genreLabel} key={index}>
                                    {genre}
                                    <input className={styles.genreInput}
                                        type="checkbox"
                                        id={index}
                                        name={genre}
                                        checked={genresBoxes[index]}
                                        onChange={handleGenresChange}
                                    />
                                </label>
                            )
                        })}
                    </div>
                    {errors.genres && <p className={styles.errorMessage}>{errors.genres}</p>}
                </fieldset>


                {/* SUBMIT */}
                <button type="submit" className={styles.submitButton}>✓ ADD TO DATABASE</button>

                {/* AUTOCOMPLETE DEV */}
                <button className={styles.autocompleteButton} type="button" onClick={handleAutocomplete}>Autocomplete example (dev)</button>

            </form>


            {/* PREVIEW */}
            <div className={styles.preview}>
                <h2>PREVIEW</h2>
                <p>Name: {errors.name ? errors.name : vg.name}</p>
                {errors.image ? <p>{errors.image}</p> : <img className={styles.imagePreview} src={vg.image} alt="Videogame not found"/>}
                <p>Description: {errors.description ? errors.description : vg.description}</p>
                <p>Released: {errors.released ? errors.released : vg.released}</p>
                <p>Rating: {errors.rating ? errors.rating : vg.rating}</p>
                
                <p>Platforms: {''}
                    {errors.platforms 
                        ? <p>{errors.image}</p> 
                        : vg.platforms.map((plaftorm, index) => {
                            return(
                                vg.platforms.length - 1 === index ?
                                <span key={index}>{plaftorm}</span>
                                : <span key={index}>{`${plaftorm} | `}</span>
                            ) 
                        })
                    }
                </p>
                
                <p>Genres: {''}
                    {errors.genres 
                        ? <p>{errors.genres}</p> 
                        : vg.genres.map((genre, index) => {
                            return(
                                vg.genres.length - 1 === index ?
                                <span key={index}>{genre}</span>
                                : <span key={index}>{`${genre} | `}</span>
                            ) 
                        })
                    }                
                </p>
            </div>

        </div>
    );
};

export default Form; 

