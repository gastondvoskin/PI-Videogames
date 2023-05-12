import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            📍 FORM PAGE |: en esta vista se encontrará el formulario para crear un nuevo videojuego.

            Este formulario debe ser controlado completamente con JavaScritp. No se pueden utilizar validaciones HTML, ni utilizar librerías especiales para esto. Debe contar con los siguientes campos:

            Nombre.
            Imagen.
            Descripción.
            Plataformas.
            Fecha de lanzamiento.
            Rating.
            Posibilidad de seleccionar/agregar varios géneros en simultáneo.
            Botón para crear el nuevo videojuego.
            [IMPORANTE]: es requisito que el formulario de creación esté validado sólo con JavaScript. Puedes agregar las validaciones que consideres. Por ejemplo: que el nombre del videojuego no pueda contener símbolos, o que el rating no pueda exceder determinado valor, etc.
            <br />
            <button>
                <Link to="/home">Go back home</Link>
            </button>

        </div>
    );
};

export default Home; 