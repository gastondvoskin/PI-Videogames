import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "./MobileNav.module.css";
import Menu from "../Menu/Menu";
import logo from "../../../assets/logo.png";

const MobileNav = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => {
    setNav(!nav);
  };

  return (
    <nav className={styles.navContainer}>
      <Link to="/home">
        <img className={styles.logo} src={logo} alt="Home" />
      </Link>
      {/* hamburger */}
      <button className={styles.barsMobile} onClick={handleClick}>
        {!nav ? <span>☰</span> : <span>X</span>}
      </button>
      
      {nav && <Menu handleClick={handleClick}/>}
    </nav>
  );
};

export default MobileNav;
