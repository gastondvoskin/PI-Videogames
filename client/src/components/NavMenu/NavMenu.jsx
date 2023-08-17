import { NavLink } from "react-router-dom";
import styles from "./NavMenu.module.css";

const NavMenu = () => {
  return (
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
  );
};

export default NavMenu;
