import { NavLink } from "react-router-dom";
import styles from "./Landing.module.css";
import logo from "../../assets/logo.png";

const Landing = () => {
    return (
        // mainContainer
        <div className={styles.mainContainer}>

            {/* LOGO */}
            <img className={styles.logo} src={logo} alt="VideogamesLogo"/>

            {/* BUTTON */}
            <NavLink to="/home" className={styles.navLink}>START!</NavLink>
        </div>
    );
};

export default Landing; 
