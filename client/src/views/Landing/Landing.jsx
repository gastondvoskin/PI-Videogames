import { NavLink } from "react-router-dom";
import styles from "./Landing.module.css";
import logo from "../../assets/logo.png";

const Landing = () => {
    return (
        <div className={styles.mainContainer}>
            
            {/* TEXT */}
            {/* <h1 className={styles.title}>Welcome to my Videogames Web Page</h1> */}

            {/* BUTTON */}
            <NavLink 
                to="/home"
                className={styles.navLink}
            > 
                START!
            </NavLink>

            {/* LOGO */}
            <img className={styles.logo} src={logo} alt="VideogamesLogo"/>
        </div>
    );
};

export default Landing; 


// 📍 LANDING PAGE | deberás crear una página de inicio o bienvenida con:
// Alguna imagen de fondo representativa al proyecto.
// Botón para ingresar a la home page.
