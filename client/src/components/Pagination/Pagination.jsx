import styles from "./Pagination.module.css";
import { useDispatch, useSelector } from "react-redux";

import { updatePageNumber } from "../../redux/actions";

const Pagination = (props) => {
    const dispatch = useDispatch();

    /* currentPage is required in this component only to know which page is active, so the corresponding button has a different className and style */
    const currentPage = Number(useSelector(state => state.pageNumber));
    console.log('currentPage: ', currentPage);

    let { numberOfPages } = props;

    /* hardcoded numberOfPages only for development purposes */
    /* numberOfPages = 13; */

    const pageNumbersArray = [];
    for (let pageNumber = 1; pageNumber <= numberOfPages; pageNumber++) {
        pageNumbersArray.push(pageNumber);
    };
    // console.log('pageNumbersArray: ', pageNumbersArray);        // eg [1, 2, 3, 4, 5]


    /* HANDLE FIRST PAGE */
    const handleFirstPage = () => {
        if(currentPage > 1) {
            dispatch(updatePageNumber(1));
        };
    };

    /* HANDLE PREV */
    const handlePrev = () => {
        if(currentPage > 1) {
            dispatch(updatePageNumber(currentPage - 1));
        };
    };

    /* HANDLE NEXT */
    const handleNext = () => {
        if(currentPage < numberOfPages) {
            dispatch(updatePageNumber(currentPage + 1));
        };
    };

    /* HANDLE LAST PAGE */
    const handleLastPage = () => {
        if(currentPage < numberOfPages) {
            dispatch(updatePageNumber(numberOfPages));
        };
    };
    

    /* HANDLE UPDATE */
    const handleUpdatePageNumber = (event) => {
        const pageNumber = event.target.value;
        dispatch(updatePageNumber(pageNumber));
    };


    return (
        <div className={styles.mainContainer}>
            <div className={styles.arrows}>
                <button 
                    className={`
                        ${styles.button}
                        ${currentPage === 1
                            ? styles.disabled
                            : ""}
                        `}
                    onClick={handleFirstPage}
                    disabled={currentPage === 1}
                    >
                    {'<<'}
                </button>

                <button 
                    className={`
                        ${styles.button}
                        ${currentPage === 1
                            ? styles.disabled
                            : ""}
                        `}
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    >
                    {'<'}
                </button>
            </div>

            {pageNumbersArray.map((pageNumber) => {
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

            <div className={styles.arrows}>
                <button 
                    className={`
                        ${styles.button}
                        ${currentPage === numberOfPages
                            ? styles.disabled
                            : ""}
                        `}
                    onClick={handleNext}
                    disabled={currentPage === numberOfPages}
                    >
                    {'>'}
                </button>

                <button 
                    className={`
                        ${styles.button}
                        ${currentPage === numberOfPages
                            ? styles.disabled
                            : ""}
                        `}
                    onClick={handleLastPage}
                    disabled={currentPage === 1}
                    >
                    {'>>'}
                </button>
            </div>
        </div>
    );
};

export default Pagination;

