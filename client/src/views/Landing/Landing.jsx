import { NavLink } from "react-router-dom";
import styles from "./Landing.module.css";

const Landing = () => {
    return (
        <div className={styles.mainContainer}>
            <h1 className={styles.title}>Welcome to the Videogames Project!</h1>
            <h5 className={styles.developer}>developer: Gastón Dvoskin</h5>
            <NavLink 
                to="/home"
                className={styles.navLink}
            > 
                --- GET STARTED ---
            </NavLink>
        </div>
    );
};

export default Landing; 


// 📍 LANDING PAGE | deberás crear una página de inicio o bienvenida con:
// Alguna imagen de fondo representativa al proyecto.
// Botón para ingresar a la home page.
