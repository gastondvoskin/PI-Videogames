import { Link } from "react-router-dom";

const Detail = () => {
    return (
        <div>
            📍 DETAIL PAGE | en esta vista se deberá mostrar toda la información específica de un videojuego:
            ID.
            Nombre.
            Imagen.
            Plataformas.
            Descripción.
            Fecha de lanzamiento.
            Rating.
            Géneros.
            <br />
            <button>
                <Link to="/home">Go back home</Link>
            </button>

        </div>
    );
};

export default Detail; 