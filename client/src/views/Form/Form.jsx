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
            /* setVg(emptyVg);
            setGenresBoxes(emptyGenresBoxes); */
        };
    };

    const handleAutocomplete = (event) => {
        const autocompletedVg = {name: 'Name', image: 'https://media.rawg.io/media/screenshots/5c4/5c41cb3b0d15ef0974f930898cedbc6c.jpg', description: 'Description', released: '2000-11-11', rating: '2', platforms: ['Mac'], genres: ['Action']};
        setVg(autocompletedVg);

        const updatedGenresBoxes = [...genresBoxes];
        updatedGenresBoxes[3] = true;
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
                    Name: *{' '} 
                    <input 
                        className={styles.input}
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
                    Image: *{' '} 
                    <input 
                        className={styles.input}
                        name="image"
                        value={vg.image}
                        onChange={handleChange}
                        placeholder='Include https://'
                    />
                    {errors.image && <p className={styles.errorMessage}>{errors.image}</p>}
                </label>

                {/* DESCRIPTION */}
                <label className={styles.label}>
                    Description: *{' '} 
                    <textarea 
                        className={styles.input}
                        name="description"
                        value={vg.description}
                        onChange={handleChange}
                        placeholder='Max 1000 characters'
                    />
                    {errors.description && <p className={styles.errorMessage}>{errors.description}</p>}
                </label>

                {/* RELEASED */}
                <label className={styles.label}>
                    Date of release: *{' '} 
                    <input 
                        type="date"  /* date format depends on OS settings */
                        name="released"
                        className={styles.input}
                        value={vg.released}
                        onChange={handleChange}
                        max="9999-12-31"
                    />
                    {errors.released && <p className={styles.errorMessage}>{errors.released}</p>}
                </label>

                {/* RATING */}
                <label className={styles.label}>
                    Rating: *{' '} 
                    <input 
                        type="number"
                        className={styles.input}
                        name="rating"
                        value={vg.rating}
                        onChange={handleChange}
                        placeholder='1.00 - 5.00'
                        step="0.1"
                    />
                    {errors.rating && <p className={styles.errorMessage}>{errors.rating}</p>}
                </label>


                {/* PLATFORMS */}
                <fieldset className={styles.platformsContainer}>
                    <legend>Platforms: *{' '} </legend>
                    {vg.platforms?.map((platform, index) => {
                        return (
                            <div className={styles.platformsSubContainer} key={index}>
                                <input 
                                    className={styles.platformInput}
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
                            </div>
                        )
                    })}

                    <button 
                        className={styles.addPlatformButton} 
                        type="button" 
                        onClick={handleAddPlatform}
                    >
                        + Add platform
                    </button>
                    {errors.platforms && <p className={styles.errorMessage}>{errors.platforms}</p>}

                </fieldset>


                {/* GENRES */}
                <fieldset className={styles.checkboxContainer}>
                    <legend>Genres: *{' '}</legend>
                    <div className={styles.checkboxSubcontainer}>
                        {allGenres.map((genre, index) => {
                            return (
                                <div className={styles.checkboxSubSubContainer} key={index}>
                                    <label>
                                        {genre}
                                        <input 
                                            type="checkbox"
                                            id={index}
                                            name={genre}
                                            checked={genresBoxes[index]}
                                            onChange={handleGenresChange}
                                        />
                                    </label>
                                </div>
                            )
                        })}
                    </div>
                    {errors.genres && <p className={styles.errorGenreMessage}>{errors.genres}</p>}
                </fieldset>


                {/* SUBMIT */}
                <button type="submit" className={styles.submitButton}>✓ Create videogame</button>

                {/* AUTOCOMPLETE DEV */}
                <button type="button" onClick={handleAutocomplete}>Dev: Autocomplete example</button>

            </form>


            {/* PREVIEW */}
            <div className={styles.preview}>
                <h1>Image preview</h1>
                {
                    vg.image && <img className={styles.imagePreview} src={vg.image} alt={"Videogame"}/>
                }
            </div>

        </div>
    );
};

export default Form; 

