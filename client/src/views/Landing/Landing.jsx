import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <div>
            📍 LANDING PAGE | deberás crear una página de inicio o bienvenida con:

            Alguna imagen de fondo representativa al proyecto.
            Botón para ingresar a la home page.
            <br />
            <button>
                <Link to="/home">Let's get started!</Link>
            </button>

        </div>
    );
};

export default Landing; 