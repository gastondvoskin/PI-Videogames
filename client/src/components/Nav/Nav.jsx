import { Link, NavLink } from "react-router-dom";
import styles from "./Nav.module.css";
import logo from "../../assets/logo.png";

const Nav = () => {
  return (
    
      <nav className={styles.navContainer}>
        <Link to="/home">
          <img className={styles.logo} src={logo} alt="Home" />
        </Link>

        <div className={styles.linksContainer}>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.normalLink
            }
          >
            HOME
          </NavLink>

          <NavLink
            to="/create"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.normalLink
            }
          >
            CREATE
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.normalLink
            }
          >
            ABOUT
          </NavLink>
        </div>
      </nav>
    
  );
};

export default Nav;
