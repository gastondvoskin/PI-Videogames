const validateName = (value) => {
    console.log(0);
    if (value === '') return "Required field"; 
    if (value.length > 200) return "Max 200 characters"; 
    return '';
};

const validateImage = (value) => {
    // const urlRegex = /^(https?:\/\/)?([\w.]+)\.([a-z]{2,6}\.?)(\/[\w.]*)*\/?$/i;    
    const urlRegex = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/i
    if (value === '') {
        return "Required field"; 
    } else if (!urlRegex.test(value)) {
        return "Invalid URL"; 
    } else {
        return ""; 
    };
};

const validateDescription = (value) => {
    if (value === '') return "Required field"; 
    if (value.length > 1000) return "Max 1000 characters"; 
    return ""; 
};

const validateReleased = (value) => {
    const valueDate = new Date(value);
    // console.log('valueDate: ', valueDate);      // valueDate:  Wed Jan 10 0001 20:06:12 GMT-0353 (hora estándar de Argentina) (Object)
    const valueYear = valueDate.getFullYear();
    // console.log('valueYear: ', valueYear);        // 2020 (number)
    const minYear = 1950;
    const maxYear = new Date().getFullYear();

    if (!value) return "Required field";
    if (valueYear < minYear) return "The year can't be earlier than 1950"; 
    if (valueYear > maxYear) return "The year can't be greater than the current year"; 
    return '';
};

const validateRating = (value) => {
    // console.log('typeof value: ', typeof value);   // string
    const decimal = value.split(".")[1];
    // console.log('decimal: ', decimal);
    const decimalCount = decimal ? decimal.length : 0; 
    // console.log('decimalCount: ', decimalCount);
    const valueParsed = Number(value);

    if (value === '') return "Required field";
    if (valueParsed < 1) return "Min value: 1";
    if (valueParsed > 5) return "Max value: 5"; 
    if (decimalCount > 2) return "Max 2 decimals";
    return '';
};

export const validateGenres = (updatedGenres) => {
    // console.log(updatedGenres);
    if (!updatedGenres.length) return "Chose at least one genre.";
    return "";
};

export const validatePlatforms = (platforms) => {
    const emptyFields = platforms.includes('');
    const exceededCharacters = platforms.some(platform => platform.length > 100);
    if (platforms[0] === '') return "The first platform cannot be empty.";
    if (emptyFields) return "The platform fields cannot be empty. If needed, delete the platform.";
    if (exceededCharacters) return "Max 100 characters for each platform";
    return "";
};

export const validateSubmit = (vg, errors) => {
    const requiredFields = vg.name === '' || vg.image === '' || vg.description === '' || vg.released === '' || vg.rating === '' || vg.platforms[0] === '' || vg.genres.length === 0 
    ? "Please complete all the fields." 
    : ""

    const fixErrors = Object.values(errors).some(error => error !== '') 
    ? "Please fix the errors." 
    : ""

    const errorMessage = requiredFields || fixErrors ? `${requiredFields} ${fixErrors}` : null;
    return errorMessage; 
};




const validationFunctions = {
    name: validateName,
    image: validateImage,
    description: validateDescription,
    released: validateReleased,
    rating: validateRating
};

export default validationFunctions;

