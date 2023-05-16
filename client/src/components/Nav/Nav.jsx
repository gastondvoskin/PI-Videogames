import { Link } from "react-router-dom";
import Filters from "../Filters/Filters.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import styles from "./Nav.module.css";
import logo from "../../assets/logo.png";

const Nav = () => {
    return (
        <div className={styles.mainContainer}>
            {/* <button> <Link to="/">Landing (dev)</Link> </button> */}

            <Link to="/home">
                <img 
                    className={styles.logo}
                    src={logo}
                    alt="Home"
                />
            </Link>

            {/* <button> <Link to="/detail/1">/detail/1 (dev)</Link> </button> */}

            <SearchBar />
            
            <Link to={`/form`}>
                <button className={styles.addGameButton}>+ Add game</button>
            </Link>


        </div>
    );
};

export default Nav; 