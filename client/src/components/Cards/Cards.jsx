import Card from "../Card/Card.jsx";
import Loading from "../Loading/Loading.jsx";
import styles from "./Cards.module.css";
import { useSelector } from "react-redux";
// import { hardcodedObject, secondHardcodedObject, dbHardcodedObject, hardcodedArray } from "../../hardcodedVideogames";

const Cards = (props) => {
  const { VG_PER_PAGE } = props;
  const currentVg = useSelector((state) => state.currentVg);
  const currentPageNumber = useSelector((state) => state.currentPageNumber);

  const firstVgRenderedIndex = (currentPageNumber - 1) * VG_PER_PAGE; // eg. 0, 15, 30, 45
  const lastVgRenderedIndex = firstVgRenderedIndex + VG_PER_PAGE - 1; // eg. 14, 29, 44
  const renderedVg = currentVg.slice(
    firstVgRenderedIndex,
    lastVgRenderedIndex + 1
  ); // eg [slice(0, 15)]

  return (
    /* In the back-end, getVgByNameController returns fifteenVgByNameSlice.length ? fifteenVgByNameSlice : `No videogames were found with the name ${name}`; */
    /* When filtering by name (SearchBar), if the name is not found, currentVg will have the value 'No videogames were found with the name ${name}' instead of being an array) */
    /* In the front-end, the actions filterByCreator and FilterByGenre (reducer), if (!currentVg.length) set the global state currentVg = "No videogames were found with the provided filters." */
    /* When filtering by creator or genre, Filters.jsx dispatchs an action to the reducer and if no videogame is found with the filters, the currentVg global state is typeof string.*/
    typeof currentVg === "string" ? (
      <h1 className={styles.notFoundText}>{currentVg}</h1>
    ) : (
      <div className={styles.mainContainer}>
        {!currentVg.length ? (
          <Loading />
        ) : (
          renderedVg.map((vg, index) => {
            return (
              <Card
                key={index}
                id={vg.id}
                name={vg.name}
                background_image={vg.background_image}
                genres={vg.genres}
                rating={vg.rating}
              />
            );
          })
        )}
      </div>
    )
  );
};

export default Cards;
