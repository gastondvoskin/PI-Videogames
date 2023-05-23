import styles from "./Form.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { hardcodedSmallArray } from "../../hardcodedVideogames";

const Form = () => {

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


    const handleGenresChange = (event) => {
        const genres = event.target.value;
        setVg({...vg, genres});
    };



    return (
        <div className={styles.mainContainer}>
            <form className={styles.formContainer}>
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
                        required
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

                <fieldset className={styles.fieldset}>
                    <legend >Platforms: *{' '} </legend>
                    {
                        vg.platforms.map((platform, index) => {
                            return (
                                <div key={index}>
                                    <input 
                                        id={index}
                                        type="text"
                                        className={styles.platformInput}
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





                {/* <p className={styles.label}>
                    Genres: *{' '} 
                    <label>
                        <input 
                            type="radio"
                            className={styles.radio}
                            value="prueba"
                            defaultChecked={true}
                        />
                        option 1
                    </label>
                    <label>
                        <input 
                            type="radio"
                            className={styles.radio}
                            value="prueba"
                        />
                        option 2
                    </label>
                </p> */}




                <button 
                    type="submit"
                    className={styles.submitButton}
                >
                    ✓ Create videogame
                </button>
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