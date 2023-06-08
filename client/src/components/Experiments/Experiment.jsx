import styles from "./Experiment.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "../../redux/actions";
import axios from "axios";

const Experiment = () => {
    // *** ALL GENRES -> useSelector and useEffect (dispatch(getGenres()) ***
    const allGenres = useSelector(state => state.genres);       // before dispatch(getGenres()) -> []; after dispatch -> ['Indie', "Strategy'...]
    console.log('allGenres: ', allGenres);

    const dispatch = useDispatch();
    useEffect(() => {
        if (!allGenres.length) {
            dispatch(getGenres());
        } 
    }, [dispatch, allGenres]);


    // *** LOCAL STATE ***
    const emptyVg = {genres: []};
    const [ newVg, setNewVg ] = useState(emptyVg);
    const [ genresBoxes, setGenresBoxes ] = useState([]);        // before useEffect(setGenresBoxes(emptyGenresBoxes)) with arrDependencies[allGenres] -> []; after useEffect -> [false, false...]
    console.log('genresBoxes: ', genresBoxes);

    useEffect(() => {
        if (allGenres.length) {
            const emptyGenresBoxes = allGenres.map(genre => false);
            setGenresBoxes(emptyGenresBoxes);
        }
    }, [allGenres]);



    // *** GENRES ***
    const handleGenresChange = (event) => {
        const index = event.target.id; 
        const genreName = event.target.name;
        const oldValue = genresBoxes[index];
        // console.log('oldValue: ', oldValue);
        const genres = !oldValue        /* oldValue is undefined at the beggining. Then it is true or false */ 
            ? [...newVg.genres, genreName] 
            : [...newVg.genres.filter(genre => genre !== genreName)];

        setNewVg({...newVg, genres});

        const updatedGenresBoxes = [...genresBoxes];
        updatedGenresBoxes[index] = !oldValue;
        setGenresBoxes(updatedGenresBoxes);
    };



    return (
        <div className={styles.checkboxSubcontainer}>
            {allGenres.map((genre, index) => {
                return (
                    <label className={styles.genreLabel} key={index}>
                        {genre}
                        <input 
                            className={styles.genreInput}
                            type="checkbox"
                            id={index}
                            name={genre}
                            checked={genresBoxes[index] || false}   /* || false to avoid initialization with undefined  */
                            onChange={handleGenresChange}
                            >
                        </input>
                    </label>
                )
            })}
        </div> 
    );
};

export default Experiment;