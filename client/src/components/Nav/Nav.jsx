import { Link } from "react-router-dom";
import styles from "./Nav.module.css";
import logo from "../../assets/logo.png";
import NavMenu from "../NavMenu/NavMenu";
import { useState } from "react";

const Nav = () => {
  const [displayMobileMenu, setDisplayMobileMenu] = useState(false);
  const handleRenderMobileMenu = () => {
    setDisplayMobileMenu(!displayMobileMenu);
  };

  /* A second function is necessary to avoid opening the mobile menu in a large device */
  const closeRenderMobileMenu = () => {
    setDisplayMobileMenu(false);
  };

  return (
    <>
      {!displayMobileMenu ? (
        <nav className={styles.navContainer}>
          {/* logo */}
          <Link to="/home">
            <img className={styles.logo} src={logo} alt="Home" />
          </Link>

          {/* large menu container*/}
          <div className={styles.lgMenuContainer}>
            <NavMenu />
          </div>

          {/* mobile bars */}
          <button
            className={styles.barsMobile}
            onClick={handleRenderMobileMenu}
          >
            ☰
          </button>
        </nav>
      ) : (
        /* mobileMenu */
        <div className={styles.smMenuContainer}>
          {/* mobile X */}
          <button
            className={styles.xMobile}
            onClick={handleRenderMobileMenu}
          >
            X
          </button>
          <div>
            <NavMenu className={styles.mobileLinksContainer} closeRenderMobileMenu={closeRenderMobileMenu} />
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
