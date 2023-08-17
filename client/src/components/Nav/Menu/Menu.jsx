import { NavLink } from "react-router-dom";
import styles from "./Menu.module.css";

const Menu = ({handleClick}) => {
  return (
    <div className={styles.linksContainer}>
      
      <NavLink 
        onClick={handleClick} 
        to="/home"
        className={({ isActive }) => isActive ? styles.activeLink : styles.normalLink}
      > HOME
      </NavLink>
     
      <NavLink
        onClick={handleClick} 
        to="/create"
        className={({ isActive }) => isActive ? styles.activeLink : styles.normalLink}
      > CREATE
      </NavLink>
      
      <NavLink
        onClick={handleClick} 
        to="/about"
        className={({ isActive }) => isActive ? styles.activeLink : styles.normalLink}
      > ABOUT
      </NavLink>
    </div>
  );
};

export default Menu;
