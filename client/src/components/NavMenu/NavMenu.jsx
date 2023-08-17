import { NavLink } from "react-router-dom";
import styles from "./NavMenu.module.css";

const NavMenu = ({ closeRenderMobileMenu }) => {
  return (
    <div className={styles.linksContainer}>
      <NavLink
        onClick={closeRenderMobileMenu}
        to="/home"
        className={({ isActive }) =>
          isActive ? styles.activeLink : styles.normalLink
        }
      >
        HOME
      </NavLink>

      <NavLink
        onClick={closeRenderMobileMenu}
        to="/create"
        className={({ isActive }) =>
          isActive ? styles.activeLink : styles.normalLink
        }
      >
        CREATE
      </NavLink>

      <NavLink
        onClick={closeRenderMobileMenu}
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
