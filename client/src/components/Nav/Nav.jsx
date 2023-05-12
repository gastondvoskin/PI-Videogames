import { Link } from "react-router-dom";
import Filters from "../Filters/Filters.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";

const Nav = () => {
    return (
        <div>
            <button>
                <Link to="/">Landing (dev)</Link>
            </button>
            <button>
                <Link to="/home">Home</Link>
            </button>
            <button>
                <Link to="/detail/1">/detail/1 (dev)</Link>
            </button>
            <button>
                <Link to="/form">Add game</Link>
            </button>
            <Filters />
            <SearchBar />
        </div>
    );
};

export default Nav; 