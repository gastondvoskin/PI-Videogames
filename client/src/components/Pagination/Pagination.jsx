import styles from "./Pagination.module.css";
import { useDispatch, useSelector } from "react-redux";

import { updatePageNumber } from "../../redux/actions";

const Pagination = (props) => {
  const dispatch = useDispatch();

  /* currentPageNumber is required in this component only to know which page is active, so the corresponding button has a different className and style */
  const currentPageNumber = Number(
    useSelector((state) => state.currentPageNumber)
  );

  let { numberOfPages } = props;

  /* hardcoded numberOfPages only for development purposes */
  /* numberOfPages = 13; */

  const pageNumbersArray = [];
  for (let i = 1; i <= numberOfPages; i++) {
    pageNumbersArray.push(i);
  }
  // console.log('pageNumbersArray: ', pageNumbersArray);        // eg [1, 2, 3, 4, 5]

  /* HANDLE FIRST PAGE */
  const handleFirstPage = () => {
    if (currentPageNumber > 1) {
      dispatch(updatePageNumber(1));
    }
  };

  /* HANDLE PREV */
  const handlePrev = () => {
    if (currentPageNumber > 1) {
      dispatch(updatePageNumber(currentPageNumber - 1));
    }
  };

  /* HANDLE NEXT */
  const handleNext = () => {
    if (currentPageNumber < numberOfPages) {
      dispatch(updatePageNumber(currentPageNumber + 1));
    }
  };

  /* HANDLE LAST PAGE */
  const handleLastPage = () => {
    if (currentPageNumber < numberOfPages) {
      dispatch(updatePageNumber(numberOfPages));
    }
  };

  /* HANDLE UPDATE */
  const handleUpdatePageNumber = (event) => {
    const clickedPageNumber = event.target.value;
    dispatch(updatePageNumber(clickedPageNumber));
  };

  return (
    <div className={styles.mainContainer}>
      {/* ARROWS */}
      <div className={styles.arrows}>
        <button
          className={`
                        ${styles.button}
                        ${styles.arrowButton}
                        ${currentPageNumber === 1 ? styles.disabled : ""}
                        `}
          onClick={handleFirstPage}
          disabled={currentPageNumber === 1}
        >
          {"<<"}
        </button>

        <button
          className={`
                        ${styles.button}
                        ${styles.arrowButton}
                        ${currentPageNumber === 1 ? styles.disabled : ""}
                        `}
          onClick={handlePrev}
          disabled={currentPageNumber === 1}
        >
          {"<"}
        </button>
      </div>

      {/* PAGES BUTTONS */}
      {pageNumbersArray.map((pageNumber) => {
        return (
          <button
            className={`
                                ${styles.pageButtonLargeDevice} 
                                ${styles.button} 
                                ${
                                  pageNumber === currentPageNumber
                                    ? styles.isActive
                                    : ""
                                }
                            `}
            key={pageNumber}
            value={pageNumber}
            onClick={handleUpdatePageNumber}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* PAGE BUTTON FOR SMALL DEVICE */}
      <div className={`${styles.pageButtonSmallDevice} ${styles.button} ${styles.isActive}`}>
        {`${currentPageNumber} / ${numberOfPages}`}
      </div>

      {/* ARROWS */}
      <div className={styles.arrows}>
        <button
          className={`
                        ${styles.button}
                        ${styles.arrowButton}
                        ${
                          currentPageNumber === numberOfPages
                            ? styles.disabled
                            : ""
                        }
                        `}
          onClick={handleNext}
          disabled={currentPageNumber === numberOfPages}
        >
          {">"}
        </button>

        <button
          className={`
                        ${styles.button}
                        ${styles.arrowButton}
                        ${
                          currentPageNumber === numberOfPages
                            ? styles.disabled
                            : ""
                        }
                        `}
          onClick={handleLastPage}
          disabled={currentPageNumber === numberOfPages}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
