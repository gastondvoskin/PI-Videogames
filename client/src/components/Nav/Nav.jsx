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

  return (
    <>
      {!displayMobileMenu ? (
        /* large device menu */
        <nav className={styles.navContainer}>
          {/* logo */}
          <Link to="/home">
            <img className={styles.logo} src={logo} alt="Home" />
          </Link>

          {/* large device menu */}
          <div className={styles.menuContainerLargeDevice}>
            <NavMenu />
          </div>

          {/* mobile bars / X */}
          <button
            className={styles.barsMobile}
            onClick={handleRenderMobileMenu}
          >
            ☰{/* {displayMobileMenu ? <span>X</span> : <span>☰</span>} */}
          </button>

        </nav>
      ) : (
        /* mobileMenu */
        <div>
          {/* mobile bars / X */}
          <button
            className={styles.barsMobile}
            onClick={handleRenderMobileMenu}
          >
            X
          </button>
          <div className={styles.menuContainerMobile}>
              <NavMenu />
            </div>
        </div>
      )}
    </>
  );
};

export default Nav;
