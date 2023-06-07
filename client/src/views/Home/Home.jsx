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

    // DATA FROM GLOBAL STATE
    // to avoid a dispatch each time the componen mounts
    const allVg = useSelector(state => state.allVg);
    const genres = useSelector(state => state.genres);
    const currentVg = useSelector(state => state.currentVg);

    // USE EFFECT WITH DISPATCH
    useEffect(() => {
        // to avoid a dispatch each time the component mounts
        if (!allVg.length) dispatch(getAllVg());
        if(!genres.length) dispatch(getGenres());
    }, [dispatch, allVg, genres]);
    
    
    
    // VG_PER_PAGE AND numberOfPages
    const VG_PER_PAGE = 15;
    const currentVgLength = currentVg.length;       // eg 150
    // console.log('currentVgLength: ', currentVgLength);
    const numberOfPages = Math.ceil(currentVgLength / VG_PER_PAGE);     // eg Math.ceil (150 / 15) = 10


    // RETURN
    return (
        <div className={styles.mainContainer}>
            <Filters />
            {
                typeof currentVg !== 'string' && <Pagination numberOfPages={numberOfPages}/>
            }
            <Cards VG_PER_PAGE={VG_PER_PAGE} />
            {
                typeof currentVg !== 'string' && <Pagination numberOfPages={numberOfPages}/>
            }
        </div>
    );
};

export default Home; 