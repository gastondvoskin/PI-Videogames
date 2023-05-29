import styles from "./Pagination.module.css";
import { useDispatch, useSelector } from "react-redux";

import { updatePageNumber } from "../../redux/actions";

const Pagination = (props) => {
    const dispatch = useDispatch();

    /* currentPage is required in this component only to know which page is active, so the corresponding button has a differente className and style */
    const currentPage = Number(useSelector(state => state.pageNumber));
    console.log('currentPage: ', currentPage);

    let { numberOfPages } = props;

    /* hardcoded numberOfPages for development purposes */
    numberOfPages = 13;

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
            {pageNumbersArray.map((pageNumber) => {
                console.log('pageNumber: ', pageNumber)
                console.log(pageNumber === currentPage)
                console.log(typeof pageNumber)
                console.log(typeof currentPage)
                return (
                    <button 
                        className=
                            {`
                                ${styles.button} 
                                ${pageNumber === currentPage 
                                    ? styles.isActive 
                                    : ""}
                            `}
                        key={pageNumber}
                        value={pageNumber}
                        onClick={handleUpdatePageNumber}
                        >
                        {pageNumber}
                    </button>
                )
            })}
        </div>
    );
};

export default Pagination;

