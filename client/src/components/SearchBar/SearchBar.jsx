import styles from "./SearchBar.module.css";

const SearchBar = () => {
    return (
        <div className={styles.mainContainer}>
            <input 
                className={styles.input}
                type="text"
                placeholder="Search..."
            />
            <button className={styles.button}>🔍</button>

        </div>
    );
};

export default SearchBar; 




// {`\u{1F50D}`}