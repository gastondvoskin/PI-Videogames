import styles from "./Pagination.module.css";
import { useDispatch } from "react-redux";
import { updatePageNumber } from "../../redux/actions";

const Pagination = (props) => {
    const dispatch = useDispatch();

    const { numberOfPages } = props;

    const pageNumbersArray = [];
    for (let pageNumber = 1; pageNumber <= numberOfPages; pageNumber++) {
        pageNumbersArray.push(pageNumber);
    };
    console.log('pageNumbersArray: ', pageNumbersArray);        // eg [1, 2, 3, 4, 5]

    const handleUpdatePageNumber = (event) => {
        const pageNumber = event.target.value;
        dispatch(updatePageNumber(pageNumber));
    };


    return (
        <div className={styles.mainContainer}>
            {
                pageNumbersArray.map((pageNumber) => {
                    return (
                        <button 
                            className={styles.button} 
                            key={pageNumber}
                            value={pageNumber}
                            onClick={handleUpdatePageNumber}
                        >
                            {pageNumber}
                        </button>
                    )
                })
            }
        </div>
    );
};

export default Pagination;

