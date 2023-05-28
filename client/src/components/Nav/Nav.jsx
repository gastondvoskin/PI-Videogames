import { Link, NavLink } from "react-router-dom";
import styles from "./Nav.module.css";
import videogamesLogo from "../../assets/videogamesLogo.png";

const Nav = () => {
    return (
        <div className={styles.mainContainer}> 
            <Link to="/home">
                <img 
                    className={styles.videogamesLogo}
                    src={videogamesLogo}
                    alt="Home"
                />
            </Link>

            <nav className={styles.navContainer}>
                <NavLink
                    to="/home"
                    className={({ isActive }) => (isActive ? styles.activeLink : styles.normalLink)}
                >
                    HOME
                </NavLink>

                <NavLink
                    to="/admin"
                    className={({ isActive }) => (isActive ? styles.activeLink : styles.normalLink)}
                >
                    ADMIN
                </NavLink>

                <NavLink
                    to="/about"
                    className={({ isActive }) => (isActive ? styles.activeLink : styles.normalLink)}
                >
                    ABOUT
                </NavLink>

            </nav>
        </div>
        
    );
};

export default Nav; 