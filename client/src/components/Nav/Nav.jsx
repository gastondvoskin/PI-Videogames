import { Link, NavLink } from "react-router-dom";
import styles from "./Nav.module.css";
import videogamesLogo from "../../assets/videogamesLogo.png";
// import githubLogo from "../../assets/logosNav/githubLogo.png";

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
                {/* <button> <Link to="/">Landing (dev)</Link> </button> */}
                {/* <button> <Link to="/detail/1">/detail/1 (dev)</Link> </button> */}

                              
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



                // /* className={styles.to} */
                /* className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""} */
                /* className={({ isActive, isPending }) => isPending ? styles.pending : isActive ? styles.active : ""} */
                /* className={({ isActive }) => (isActive ? styles.active : styles.inactive)} */
                /* activeClassName={styles.navLinkActive} */


                {/* <NavLink
                className=
                    {
                        ({isActive, isPending}) => 
                        {
                            console.log('clicked');
                            console.log('isActive: ', isActive);
                            console.log('isPending: ', isPending);
                            return (
                                isPending 
                                ? styles.pendiente 
                                : isActive 
                                    ? styles.activo 
                                    : ""
                            )
                        }
                        
                    }
                to="/about"              
            >
                About
            </NavLink> */}


            {/* <a 
                href="https://github.com/gastondvoskin/PI-Videogames"
                target="_blank"
                >
                <img 
                    className={styles.logo}
                    src={githubLogo}
                    alt="GitHub"
                />
            </a> */}