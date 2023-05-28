import Cards from "../../components/Cards/Cards.jsx";
import Filters from "../../components/Filters/Filters.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import styles from "./Home.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { getAllVg, getGenres } from "../../redux/actions.js";


const Home = () => {
    const dispatch = useDispatch();

    // to avoid a dispatch each time the componen mounts
    const allVg = useSelector(state => state.allVg);
    const genres = useSelector(state => state.genres);
    const currentVg = useSelector(state => state.currentVg);

    useEffect(() => {
        // to avoid a dispatch each time the component mounts
        if (!allVg.length) dispatch(getAllVg());
        if(!genres.length) dispatch(getGenres());
    }, [dispatch, allVg, genres]);
    
    
    
    const VG_PER_PAGE = 15;
    const currentVgLength = currentVg.length;       // eg 160
    console.log('currentVgLength: ', currentVgLength);
    const numberOfPages = Math.ceil(currentVgLength / VG_PER_PAGE);     // eg Math.ceil (160 / 15) = 11


    return (
        <div className={styles.mainContainer}>
            <Filters />
            {
                typeof currentVg !== 'string' && <Pagination numberOfPages={numberOfPages}/>
            }
            <Cards VG_PER_PAGE={VG_PER_PAGE} />
        </div>
    );
};

export default Home; 