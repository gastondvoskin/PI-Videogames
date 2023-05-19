import styles from "./Form.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const Form = () => {
    const [ vg, setVg ] = useState({
        name: '',
        image: '',
        description: '',
        released: '',
        rating: '',
        platforms: '',  /* refactor: add a button to add or delete inputs elements */
        genres: []
    });

    const handleNameChange = (event) => {
        const name = event.target.value;
        setVg({...vg, name});
    };

    const handleImageChange = (event) => {
        const image = event.target.value;
        setVg({...vg, image});
    };

    const handleDescriptionChange = (event) => {
        const description = event.target.value;
        setVg({...vg, description});
    };

    const handleReleasedChange = (event) => {
        const released = event.target.value;
        setVg({...vg, released});
    };

    const handleRatingChange = (event) => {
        const rating = event.target.value;
        setVg({...vg, rating});
    };

    const handlePlatformsChange = (event) => {
        const platforms = event.target.value;
        setVg({...vg, platforms});
    };

    const handleGenresChange = (event) => {
        const genres = event.target.value;
        setVg({...vg, genres});
    };


    return (
        <div className={styles.mainContainer}>
            <form className={styles.formContainer}>
                <label className={styles.label}>
                    Name:{' '} 
                    <input 
                        className={styles.input}
                        value={vg.name}
                        onChange={handleNameChange}
                        placeholder='Name...'
                    />
                </label>

                <label className={styles.label}>
                    Image:{' '} 
                    <input 
                        className={styles.input}
                        value={vg.image}
                        onChange={handleImageChange}
                        placeholder='URL...'
                    />
                </label>

                <label className={styles.label}>
                    Description:{' '} 
                    <textarea 
                        className={styles.input}
                        value={vg.description}
                        onChange={handleDescriptionChange}
                        placeholder='Description...'
                    />
                </label>

                <label className={styles.label}>
                    Date of release:{' '} 
                    <input 
                        className={styles.input}
                        value={vg.released}
                        onChange={handleReleasedChange}
                        placeholder='YY/MM/DD'
                    />
                </label>


                <label className={styles.label}>
                    Rating:{' '} 
                    <input 
                        className={styles.input}
                        value={vg.rating}
                        onChange={handleRatingChange}
                        placeholder='1 - 5...'
                    />
                </label>

                <label className={styles.label}>
                    Platforms:{' '} 
                    <input 
                        className={styles.input}
                        value={vg.description}
                        onChange={handlePlatformsChange}
                        placeholder='Platform1, Platform2...'
                    />
                </label>

                <label className={styles.label}>
                    Genres:{' '} 
                    <input 
                        className={styles.input}
                        value={vg.genres}
                        onChange={handleGenresChange}
                        placeholder='Genre1, Genre2...'
                    />
                </label>



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
                    vg.image && <img className={styles.imagePreview} src={vg.image}/>
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