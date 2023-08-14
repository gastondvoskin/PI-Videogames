import styles from "./Create.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "../../redux/actions";
import axios from "axios";
import { updateWithNewVg } from "../../redux/actions";
import validationFunctions, { validateGenres, validatePlatforms, validateSubmit } from "./validateFunctions";
// import { hardcodedSmallArray } from "../../hardcodedResources/hardcodedVideogames.js";
// import hardcodedGenres from "../../hardcodedResources/hardcodedGenres.js";
// import hardcodedPlatforms from "../../hardcodedResources/hardcodedPlatforms";

const Create = () => {

    // *** ALL GENRES -> useSelector and useEffect (dispatch(getGenres()) ***
    const allGenres = useSelector(state => state.genres);       // before dispatch(getGenres()) -> []; after dispatch -> ['Indie', "Strategy'...]
    // console.log('allGenres: ', allGenres);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!allGenres.length) {
            dispatch(getGenres());
        } 
    }, [dispatch, allGenres]);

    // *** LOCAL STATE ***
    const emptyVg = {name: '', image: '', description: '', released: '', rating: '', platforms: [''], genres: []};
    const emptyErrors = {name: '', image: '', description: '', released: '', rating: '', platforms: '', genres: ''};
    const emptyArray = [];
    const [ newVg, setNewVg ] = useState(emptyVg);
    const [ errors, setErrors ] = useState(emptyErrors);
    const [ genresBoxes, setGenresBoxes ] = useState(emptyArray);   // before useEffect(setGenresBoxes(emptyGenresBoxes)) with arrDependencies[allGenres] -> []; after useEffect -> [false, false...]

    useEffect(() => {
        if (allGenres.length) {
            const emptyGenresBoxes = allGenres.map(genre => false);
            setGenresBoxes(emptyGenresBoxes);
        }
    }, [allGenres]);


    // *** HANDLECHANGE ***
    const handleChange = (event) => {
        const { value } = event.target; 
        const property = event.target.name;
        setNewVg({...newVg, [property]: value}); 
        const errorMessage = validationFunctions[property](value);
        setErrors({...errors, [property]: errorMessage});
    };


    // *** PLATFORMS ***
    const handlePlatformsChange = (event) => {
        const { value } = event.target;
        const index = Number(event.target.id);
        const firsPartOfPlatforms = newVg.platforms.slice(0, index);     // array
        const lastPartOfPlatforms = newVg.platforms.slice(index + 1);
        const platforms = [...firsPartOfPlatforms, value, ...lastPartOfPlatforms];
        setNewVg({...newVg, platforms});
        const errorMessage = validatePlatforms(platforms);
        setErrors({...errors, platforms: errorMessage});
    };

    const handleAddPlatform = (event) => { 
        setNewVg({...newVg, platforms: [...newVg.platforms, '']});
    };

    const handleDeletePlatform = (event) => {
        const index = Number(event.target.id);
        const platforms = newVg.platforms.filter((_platform, i) => i !== index);
        setNewVg({...newVg, platforms: newVg.platforms.filter((_platform, i) => i !== index)});
        const errorMessage = validatePlatforms(platforms);
        setErrors({...errors, platforms: errorMessage});
    };


    // *** GENRES ***
    const handleGenresChange = (event) => {
        const index = event.target.id; 
        const genreName = event.target.name;
        const oldValue = genresBoxes[index];
        const genres = !oldValue        /* oldValue is undefined at the beggining. Then it is true or false */        
            ? [...newVg.genres, genreName] 
            : [...newVg.genres.filter(genre => genre !== genreName)];

        setNewVg({...newVg, genres});
        const errorMessage = validateGenres(genres);
        setErrors({...errors, genres: errorMessage});

        const updatedGenresBoxes = [...genresBoxes];
        updatedGenresBoxes[index] = !oldValue;
        setGenresBoxes(updatedGenresBoxes);
    };


    // *** SUBMIT ***
    const handleSubmit = (event) => {
        event.preventDefault();
        const errorMessage = validateSubmit(newVg, errors); // null or "Please..."
        if (errorMessage) {
            window.alert(errorMessage);  
        } else {
            /* NIY: replace for action */
            const newVgToSubmit = {...newVg, background_image: newVg.image}; 
            /* const API_URL = "http://localhost:3001/videogames"; */ /* old */
            const API_URL = "/videogames"; /* new */
            axios
                .post(API_URL, newVgToSubmit)
                .then((response) => {
                    const newVgWithId = {id: response.data.id, ...newVgToSubmit};
                    dispatch(updateWithNewVg(newVgWithId));
                    window.alert("Videogame added to the Database");
                    setNewVg(emptyVg);
                    const emptyGenresBoxes = allGenres.map(genre => false);
                    setGenresBoxes(emptyGenresBoxes);
                })
                .catch((error) => {console.log(error)})
        };
    };


    // *** RESET ***
    const handleReset = (event) => {
        setNewVg(emptyVg);
        setErrors(emptyErrors);
        const emptyGenresBoxes = allGenres.map(genre => false);
        setGenresBoxes(emptyGenresBoxes);
    };

    // *** AUTOCOMPLETE ***
    const handleAutocomplete1 = (event) => {
        const autocompletedVg = {
            name: "Example name to autocomplete", 
            image: "https://media.rawg.io/media/screenshots/5c4/5c41cb3b0d15ef0974f930898cedbc6c.jpg", 
            description: "This is an example description to autocomplete.", 
            released: "2000-11-11", 
            rating: "2.57", 
            platforms: ["Mac", "PlayStation", "My own platform"], 
            genres: [allGenres[12], allGenres[16]]
        };
        setNewVg(autocompletedVg);

        let updatedGenresBoxes = allGenres.map(genre => false);
        updatedGenresBoxes[12] = true;
        updatedGenresBoxes[16] = true;
        setGenresBoxes(updatedGenresBoxes);
    };

    const handleAutocomplete2 = (event) => {
        const autocompletedVg = {
            name: "Other EXAMPLE", 
            image: "https://media.rawg.io/media/games/562/562553814dd54e001a541e4ee83a591c.jpg", 
            description: "Unleash your inner hero in an expansive open world filled with breathtaking landscapes, epic battles, and captivating quests. Customize your character, master unique abilities, and forge alliances in a rich, immersive storyline. Experience the thrill of intense combat, unravel deep mysteries, and shape your destiny in this unforgettable action-adventure RPG set in a stunningly detailed and dynamic world.", 
            released: "2013-01-01", 
            rating: "4.05", 
            platforms: ["Mac", "Linux"], 
            genres: [allGenres[3]]
        };
        setNewVg(autocompletedVg);

        let updatedGenresBoxes = allGenres.map(genre => false);
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
                {/* NAME, RELEASED AND RATING */}
                <div className={styles.nameAndReleasedAndRatingContainer}>
                    {/* NAME */}
                    <label className={styles.label}>
                        NAME *{' '} 
                        <input 
                            className={`${styles.input} ${styles.nameInput}`}
                            name="name"
                            value={newVg.name}
                            onChange={handleChange}
                            placeholder='Name...'
                            autoFocus={true}
                        />
                        {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
                    </label>

                    {/* RELEASED */}
                    <label className={styles.label}>
                        RELEASED *{' '} 
                        <input 
                            className={`${styles.input} ${styles.dateInput}`}
                            type="date"  /* date format depends on OS settings */
                            name="released"
                            value={newVg.released}
                            onChange={handleChange}
                            max="9999-12-31"
                        />
                        {errors.released && <p className={styles.errorMessage}>{errors.released}</p>}
                    </label>

                    {/* RATING */}
                    <label className={styles.label}>
                        RATING *{' '} 
                        <input 
                            className={`${styles.input} ${styles.ratingInput}`}
                            type="number"
                            name="rating"
                            value={newVg.rating}
                            onChange={handleChange}
                            placeholder='1.00-5.00'
                            step="0.1"
                        />
                        {errors.rating && <p className={styles.errorMessage}>{errors.rating}</p>}
                    </label>
                </div>


                {/* IMAGE */}
                <label className={styles.label}>
                    IMAGE *{' '} 
                    <textarea 
                        className={styles.input}
                        name="image"
                        value={newVg.image}
                        onChange={handleChange}
                        placeholder='https://...'
                        rows="1"
                    />
                    {errors.image && <p className={styles.errorMessage}>{errors.image}</p>}
                </label>

                {/* DESCRIPTION */}
                <label className={styles.label}>
                    DESCRIPTION *{' '} 
                    <textarea 
                        className={styles.input}
                        name="description"
                        value={newVg.description}
                        onChange={handleChange}
                        placeholder='Max 1000 characters'
                        rows="5"
                    />
                    {errors.description && <p className={styles.errorMessage}>{errors.description}</p>}
                </label>

                {/* PLATFORMS */}
                <legend>PLATFORMS *{' '} </legend>
                <div className={styles.platformsContainer}>
                    {newVg.platforms?.map((platform, index) => {
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
                                {index !== 0 && <button 
                                    id={index}
                                    className={styles.deletePlatformButton} 
                                    type="button" 
                                    onClick={handleDeletePlatform}
                                    >
                                    -
                                </button>
                                }
                                
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
                </div>


                {/* GENRES */}
                <label className={styles.label}>GENRES *{' '}
                    <div className={styles.checkboxContainer}>
                        <div className={styles.checkboxSubcontainer}>
                            {allGenres.map((genre, index) => {
                                return (
                                    <label className={styles.genreLabel} key={index}>
                                        {genre}
                                        <input 
                                            className={styles.genreInput}
                                            type="checkbox"
                                            id={index}
                                            name={genre}
                                            checked={genresBoxes[index] || false}   /* || false to avoid initialization with undefined  */
                                            onChange={handleGenresChange}
                                            >
                                        </input>
                                    </label>
                                )
                            })}
                        </div>
                        {errors.genres && <p className={styles.errorMessage}>{errors.genres}</p>}
                    </div>
                </label>


                <div className={styles.buttonsContainer}>
                    {/* SUBMIT */}
                    <button type="submit" className={styles.submitButton}>✓</button>

                    {/* RESET */}
                    <button className={styles.resetButton} type="button" onClick={handleReset}>X</button>


                    {/* AUTOCOMPLETE DEV 1 */}
                    <button className={styles.autocompleteButton} type="button" onClick={handleAutocomplete1}>↴1</button>

                    {/* AUTOCOMPLETE DEV 2 */}
                    {/* <button className={styles.autocompleteButton} type="button" onClick={handleAutocomplete2}>↴2</button> */}
                    
                </div>

            </form>


            {/* PREVIEW */}
            <div className={styles.preview}>
                <h2>PREVIEW</h2>
                <p>Name: {errors.name ? errors.name : newVg.name}</p>
                {errors.image ? <p>{errors.image}</p> : <img className={styles.imagePreview} src={newVg.image} alt="Videogame not found"/>}
                <p>Description: {errors.description ? errors.description : newVg.description}</p>
                <p>Released: {errors.released ? errors.released : newVg.released}</p>
                <p>Rating: {errors.rating ? errors.rating : newVg.rating}</p>
                
                <p>Platforms: {''}
                    {errors.platforms 
                        ? <p>{errors.image}</p> 
                        : newVg.platforms.map((plaftorm, index) => {
                            return(
                                newVg.platforms.length - 1 === index ?
                                <span key={index}>{plaftorm}</span>
                                : <span key={index}>{`${plaftorm} | `}</span>
                            ) 
                        })
                    }
                </p>
                
                <p>Genres: {''}
                    {errors.genres 
                        ? <p>{errors.genres}</p> 
                        : newVg.genres.map((genre, index) => {
                            return(
                                newVg.genres.length - 1 === index ?
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

export default Create; 

