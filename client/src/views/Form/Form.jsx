import styles from "./Form.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "../../redux/actions";
import { Link } from "react-router-dom";
import { hardcodedSmallArray } from "../../hardcodedVideogames.js";
import hardcodedGenres from "../../hardcodedGenres.js";
import axios from "axios";
import { updateWithNewVg } from "../../redux/actions";


const Form = () => {
    const dispatch = useDispatch();

    // allGenres from redux
    // UNCOMMENT to replace hardcodedGenres for allGenres
    // const allGenres = useSelector(state => state.genres);
    // useEffect(() => {
    //     // in case the user types by hand the "/form" route 
    //     if (!allGenres.length) dispatch(getGenres());
    // }, [dispatch, allGenres]);

    // localState
    const emptyVg = {
        name: '',
        image: '',
        description: '',
        released: '',
        rating: '',
        platforms: [''], 
        genres: []
    };

    const emptyForm = {
        name: '',
        image: '',
        description: '',
        released: '',
        rating: '',
        platforms: '', 
        genres: ''
    };
    

    const [ vg, setVg ] = useState(emptyVg);
    const [ errors, setErrors ] = useState(emptyForm);
    // replace hardcodedGenres for allGenres
    const [ genresCheckboxs, setGenresCheckboxs ] = useState(
        new Array(hardcodedGenres.length).fill(false)
    );

    const [ completeError, setCompleteError ] = useState('');
    const [ fixError, setFixError ] = useState('');


    // name validation and changeHandler
    const validateName = (name) => {
        if (name === '') {
            setErrors({...errors, name: "Required field"});
        } else if (name.length > 5) {
            setErrors({...errors, name: "Max 250 characters"});
        } else {
            setErrors({...errors, name: ''});
        };
    };

    const handleNameChange = (event) => {
        const name = event.target.value;
        setVg({...vg, name});
        validateName(name);
    };

    // image validation and changeHandler
    const urlRegex = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/i
    
    const validateImage = (image) => {
        if (image === '') {
            setErrors({...errors, image: "Required field"});
        } else if (!urlRegex.test(image)) {
            setErrors({...errors, image: "Invalid URL"});
        } else {
            setErrors({...errors, image: ''});
        };
    };
    
    const handleImageChange = (event) => {
        const image = event.target.value;
        setVg({...vg, image});
        validateImage(image);
    };

    // description validation and changeHandler
    const validateDescription = (description) => {
        if (description === '') {
            setErrors({...errors, description: "Required field"});
        } else if (description.length > 5) {
            setErrors({...errors, description: "Max 1000 characters"});
        } else {
            setErrors({...errors, description: ''});
        };
    };
    
    const handleDescriptionChange = (event) => {
        const description = event.target.value;
        setVg({...vg, description});
        validateDescription(description);
    };
    
    // released validation and changeHandler
    const validateReleased = (released) => {
        // console.log('released: ', released);
        const dateEntered = new Date(released);
        // console.log('dateEntered: ', dateEntered);      // dateEntered:  Wed Jan 10 0001 20:06:12 GMT-0353 (hora estándar de Argentina) (Object)
        const yearEntered = dateEntered.getFullYear();
        // console.log('yearEntered: ', yearEntered);        // 2020 (number)

        const minYear = 1950;
        const maxYear = new Date().getFullYear();
        // const todayString = new Date().toLocaleDateString('en-ca'); 
        // console.log('todayString: ', todayString);    // 2023-05-23 (string)
        // const todayObject = new Date(todayString);
        // console.log('todayObject: ', todayObject);
        // console.log('dateEntered === todayObject: ', JSON.stringify(dateEntered) > JSON.stringify(todayObject));
        if (!released) {
            setErrors({...errors, released: "Required field"});
        } else if (yearEntered < minYear) {
            setErrors({...errors, released: "The year can't be earlier than 1950"});
        } else if (yearEntered > maxYear) {
            setErrors({...errors, released: "The year can't be greater than the current year"});
        } else {
            setErrors({...errors, released: ''});
        };
    };
    
    const handleReleasedChange = (event) => {
        const released = event.target.value;
        setVg({...vg, released});
        validateReleased(released);
    };

    // rating validation and changeHandler
    const validateRating = (rating) => {
        // console.log('typeof rating: ', typeof rating);   // string
        const decimal = rating.split(".")[1];
        // console.log('decimal: ', decimal);
        const decimalCount = decimal ? decimal.length : 0; 
        // console.log('decimalCount: ', decimalCount);
        const ratingParsed = Number(rating);

        if (rating === '') {
            setErrors({...errors, rating: "Required field"});
        } else if (ratingParsed < 1) {
            setErrors({...errors, rating: "Min value: 1"});
        } else if (ratingParsed > 5) {
            setErrors({...errors, rating: "Max value: 5"});
        } else if (decimalCount > 2) {
            setErrors({...errors, rating: "Max 2 decimals"});
        }else {
            setErrors({...errors, rating: ''});
        };
    };
    
    const handleRatingChange = (event) => {
        const rating = event.target.value;
        setVg({...vg, rating});
        validateRating(rating);
    };

    // platforms validation, changeHandler and handleAddPlatform and handleDeletePlatform
    const validatePlatforms = (platforms) => {
        const emptyFields = platforms.includes('');
        const exceededCharacters = platforms.some(platform => platform.length > 100);
        if (platforms[0] === '') {
            setErrors({...errors, platforms: "The first platform can't be empty."});
        } else if (emptyFields) {
            setErrors({...errors, platforms: "The platform fields cannot be empty. If needed, delete the platform."});
        } else if (exceededCharacters) {
            setErrors({...errors, platforms: "Max 100 characters for each platform"});
        } else {
            setErrors({...errors, platforms: ''});
        };
    };

    const handlePlatformsChange = (event) => {
        const platformValue = event.target.value;
        const platformId = Number(event.target.id);
        // console.log('platformId: ', platformId);
        // console.log('platformValue) : ', platformValue);
        const firsPartOfPlatforms = vg.platforms.slice(0, platformId);     // array
        // console.log('firsPartOfPlatforms: ', firsPartOfPlatforms);
        const lastPartOfPlatforms = vg.platforms.slice(platformId + 1);
        // console.log('lastPartOfPlatforms: ', lastPartOfPlatforms);
        const platforms = [...firsPartOfPlatforms, platformValue, ...lastPartOfPlatforms];
        setVg({...vg, platforms});
        validatePlatforms(platforms);
    };

    const handleAddPlatform = (event) => {          /* for UX handleAddPlatform doesn't validate. So I will need to validate again when submitting */
        setVg({
            ...vg,
            platforms: [...vg.platforms, '']
        });
    };

    const handleDeletePlatform = (event) => {
        const platformId = Number(event.target.id);
        const firsPartOfPlatforms = vg.platforms.slice(0, platformId); 
        const lastPartOfPlatforms = vg.platforms.slice(platformId + 1);

        const platforms = [...firsPartOfPlatforms, ...lastPartOfPlatforms];
        setVg({...vg, platforms});
        validatePlatforms(platforms);
    };

    // genres validation and changeHandler
    const validateGenres = (updatedGenres) => {
        // console.log(updatedGenres);
        if (!updatedGenres.length) {
            setErrors({...errors, genres: "Chose at least one genre."});
        } else {
            setErrors({...errors, genres: ""});
        };
    };

    const handleGenresChange = (event) => {
        const index = event.target.id;     // 0, 1, 2, 3, 4 ... 
        // console.log(index);
        const genreName = event.target.name;
        // console.log(genreName);
        // console.log(genresCheckboxs[index])  // false or true
        const updatedValue = !genresCheckboxs[index]; 
        
        let updatedGenres = []
        if (updatedValue) {
            updatedGenres = [...vg.genres, genreName];
            setVg({...vg, genres: updatedGenres});
            validateGenres(updatedGenres);
        } else{
            updatedGenres = [...vg.genres.filter(genre => genre !== genreName)];
            setVg({...vg, genres: updatedGenres});
            validateGenres(updatedGenres);
        };
        
        const updatedGenresCheckboxs = [...genresCheckboxs];
        updatedGenresCheckboxs[index] = updatedValue;
        setGenresCheckboxs(updatedGenresCheckboxs);
    };

    // const [ completeError, setCompleteError ] = useState('Complete all the fields.');
    // const [ fixError, setFixError ] = useState('Fix the errors.');

    // validateSubmit and submitHandler
    const validateSubmit = (vg) => {
        // const noEmptyFields = vg.name !== '' && vg.image !== '' && vg.description !== '' && vg.released !== '' && vg.rating !== '' && vg.platforms[0] !== '' && vg.genres.length !== 0;
        // const noErrors = Object.values(errors).every(error => error === '');
        // return noEmptyFields && noErrors    // true or false
        let noEmptyFields = false;
        let noErrors = false;
        if (vg.name === '' || vg.image === '' || vg.description === '' || vg.released === '' || vg.rating === '' || vg.platforms[0] === '' || vg.genres.length === 0) {
            noEmptyFields = false;
            setCompleteError("Submit again after completing all the fields.");
        } else {
            noEmptyFields = true;
            setCompleteError("");// when there is no error, we get an empty string in the state 
        };
        if (Object.values(errors).some(error => error !== '')) {
            noErrors = false;
            setFixError("Submit again after fixing the errors.");
        } else {
            noErrors = true;
            setFixError(""); // when there is no error, we get an empty string in the state
        };
        return noEmptyFields && noErrors; 
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validated = validateSubmit(vg); 
        console.log("validated: ", validated); // true or false

        if (validated) {
            const newVg = {...vg, background_image: vg.image}
            const API_URL = "http://localhost:3001/videogames"
            axios.post(API_URL, newVg)
                .then((response) => {console.log(response)})
                .catch((error) => {console.log(error)})
            dispatch(updateWithNewVg(newVg));
            window.alert("Videogame added to the Database");
            setVg(emptyVg);
        } else {
            console.log('in the else')
            // controlled by validateSubmit
        };
    };




    // return
    return (
        <div className={styles.mainContainer}>
            <form 
                className={styles.formContainer}
                onSubmit={handleSubmit}
            >
                <label className={styles.label}>
                    Name: *{' '} 
                    <input 
                        className={styles.input}
                        value={vg.name}
                        onChange={handleNameChange}
                        placeholder='Max 250 characters'
                        autoFocus={true}
                    />
                    {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
                </label>

                <label className={styles.label}>
                    Image: *{' '} 
                    <input 
                        className={styles.input}
                        value={vg.image}
                        onChange={handleImageChange}
                        placeholder='Include https://'
                    />
                    {errors.image && <p className={styles.errorMessage}>{errors.image}</p>}
                </label>

                <label className={styles.label}>
                    Description: *{' '} 
                    <textarea 
                        className={styles.input}
                        value={vg.description}
                        onChange={handleDescriptionChange}
                        placeholder='Max 1000 characters'
                    />
                    {errors.description && <p className={styles.errorMessage}>{errors.description}</p>}
                </label>

                <label className={styles.label}>
                    Date of release: *{' '} 
                    <input 
                        type="date"  /* date format depends on OS settings */
                        className={styles.input}
                        value={vg.released}
                        onChange={handleReleasedChange}
                        max="9999-12-31"
                    />
                    {errors.released && <p className={styles.errorMessage}>{errors.released}</p>}
                </label>

                <label className={styles.label}>
                    Rating: *{' '} 
                    <input 
                        type="number"
                        className={styles.input}
                        value={vg.rating}
                        onChange={handleRatingChange}
                        placeholder='1.00 - 5.00'
                        step="0.1"
                    />
                    {errors.rating && <p className={styles.errorMessage}>{errors.rating}</p>}
                </label>

                <fieldset className={styles.platformsContainer}>
                    <legend>Platforms: *{' '} </legend>
                    {
                        vg.platforms?.map((platform, index) => {
                            return (
                                <div
                                    className={styles.platformsSubContainer} 
                                    key={index}
                                >
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
                        })
                    }
                    <button 
                        className={styles.addPlatformButton} 
                        type="button" 
                        onClick={handleAddPlatform}
                    >
                        + Add a platform
                    </button>
                    {errors.platforms && <p className={styles.errorMessage}>{errors.platforms}</p>}
                </fieldset>

                <fieldset className={styles.checkboxContainer}>
                    <legend>Genres: *{' '}</legend>
                    <div className={styles.checkboxSubcontainer}>
                        {
                            /* allGenres.map((genre, index) => { */
                            hardcodedGenres.map((genre, index) => {
                                return (
                                    <div 
                                        className={styles.checkboxSubSubContainer} 
                                        key={index}
                                    >
                                        <input 
                                            type="checkbox"
                                            id={index}
                                            name={genre}
                                            checked={genresCheckboxs[index]}
                                            onChange={handleGenresChange}
                                        />
                                        <label 
                                            htmlFor={index}
                                        >
                                            {genre}
                                        </label>
                                    </div>
                                )
                            })
                        }

                    </div>
                    {errors.genres && <p className={styles.errorGenreMessage}>{errors.genres}</p>}
                </fieldset>





                <button 
                    type="submit"
                    className={styles.submitButton}
                >
                    ✓ Create videogame
                </button>
                {completeError && <span className={styles.errorGenreMessage}>{completeError}</span>}
                {fixError && <span className={styles.errorGenreMessage}>{fixError}</span>}

            </form>







            <div className={styles.preview}>
                <h1>Image preview</h1>
                {
                    vg.image && <img className={styles.imagePreview} src={vg.image} alt={"Videogame"}/>
                }
            </div>
            
            
            {/* <Link to={'/home'}>
                <button className={styles.goBackButton}>Go back home</button>
            </Link> */}


        </div>
    );
};

export default Form; 

// 📍 FORM PAGE |: en esta vista se encontrará el formulario para crear un nuevo videojuego.

// Este formulario debe ser controlado completamente con JavaScritp. No se pueden utilizar validaciones HTML, ni utilizar librerías especiales para esto. Debe contar con los siguientes campos:

// Nombre.
// Imagen.
// Descripción.
// Plataformas.
// Fecha de lanzamiento.
// Rating.
// Posibilidad de seleccionar/agregar varios géneros en simultáneo.
// Botón para crear el nuevo videojuego.
// [IMPORANTE]: es requisito que el formulario de creación esté validado sólo con JavaScript. Puedes agregar las validaciones que consideres. Por ejemplo: que el nombre del videojuego no pueda contener símbolos, o que el rating no pueda exceder determinado valor, etc.