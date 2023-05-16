import styles from "./Pagination.module.css";

const Pagination = () => {
    const hardcodedButtonsArr = [1,2,3,4,5,6,7,8,9,10];

    return (
        <div className={styles.mainContainer}>
            {
                hardcodedButtonsArr.map((el, index) => {
                    return (
                        <button className={styles.button} key={index}>{el}</button>
                    )
                })
            }

        </div>
    )
};

export default Pagination;

