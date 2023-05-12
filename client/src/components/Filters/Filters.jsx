const Filters = () => {
    return (
        <div>
            <select name="byGenre">
                <option value="">By genre: </option>
                <option value="Hardcoded value 2">Hardcoded option 2</option>
            </select>
            
            <select name="byRating">
                <option value="">By rating: </option>
                <option value="Hardcoded value 2">A - Z</option>
                <option value="Hardcoded value 2">Z - A</option>
            </select>

            <select name="byCreator">
                <option value="">By creator: </option>
                <option value="Hardcoded value 2">A - Z</option>
                <option value="Hardcoded value 2">Z - A</option>
            </select>

            <select name="alphabetically">
                <option value="">Alphabetically: </option>
                <option value="Hardcoded value 2">A - Z</option>
                <option value="Hardcoded value 2">Z - A</option>
            </select>

        </div>
    );
};

export default Filters; 