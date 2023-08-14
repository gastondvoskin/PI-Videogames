import { Link, NavLink } from "react-router-dom";
import styles from "./Nav.module.css";
import logo from "../../assets/logo.png";

const Nav = () => {
    return (
        <div className={styles.mainContainer}> 
            <Link to="/home">
                <img 
                    className={styles.logo}
                    src={logo}
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
                    to="/create"
                    className={({ isActive }) => (isActive ? styles.activeLink : styles.normalLink)}
                >
                    CREATE
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