import validateFunctions, { validateGenres, validatePlatforms, validateSubmit } from "../views/Form/validateFunctions.js"; 

const { name, image, description, released, rating } = validateFunctions;

// --------------------------------------------------------- //
// VALIDATE name, image, description, released, rating
describe('name', () => {
    const EMPTY_NAME = "";
    const CHARACTERS_102 = "Mystic Realms: Chronicles of the Forgotten Legends - The Quest for the Eternal Crystal of Destiny. 102";
    const VALID_NAME_1 = "Mystic Realms";
    const VALID_NAME_2 = "Chronicles of the Forgotten Legends";
    const VALID_NAME_3 = "1234!%$aaAA";

    it('returns "Required field" if the argument is ""', () => {
        expect(name(EMPTY_NAME)).toBe("Required field");
    });
    it('returns "Max 100 characters" if the argument has more than 100 characters', () => {
        expect(name(CHARACTERS_102)).toBe("Max 100 characters");
    });
    it('returns "" if the are no errors', () => {
        expect(name(VALID_NAME_1)).toBe("");
    });
    it('returns "" if the are no errors', () => {
        expect(name(VALID_NAME_2)).toBe("");
    });
    it('returns "" if the are no errors', () => {
        expect(name(VALID_NAME_3)).toBe("");
    });
});

describe('image', () => {
    const EMPTY_IMAGE = "";
    const INVALID_IMAGE_1 = "image";
    const INVALID_IMAGE_2 = "image.jpg";
    const INVALID_IMAGE_3 = "https://image";
    const VALID_IMAGE_1 = "https://media.rawg.io/media/games/328/3283617cb7d75d67257fc58339188742.jpg";
    const VALID_IMAGE_2 = "https://media.rawg.io/media/screenshots/5c4/5c41cb3b0d15ef0974f930898cedbc6c.jpg";
    const VALID_IMAGE_3 = "https://media.rawg.io/media/screenshots/efa/efa72644b0af400911782dae711d4e68.jpg";
    const VALID_IMAGE_4 = "https://image.jpg";

    it('returns "Required field" if the argument is ""', () => {
        expect(image(EMPTY_IMAGE)).toBe("Required field");
    });
    it('returns "Invalid URL" if the URL is invalid', () => {
        expect(image(INVALID_IMAGE_1)).toBe("Invalid URL");
        expect(image(INVALID_IMAGE_2)).toBe("Invalid URL");
        expect(image(INVALID_IMAGE_3)).toBe("Invalid URL");
    });
    it('returns "" if the are no errors', () => {
        expect(name(VALID_IMAGE_1)).toBe("");
        expect(name(VALID_IMAGE_2)).toBe("");
        expect(name(VALID_IMAGE_3)).toBe("");
    });
});

describe('description', () => {
    const EMPTY_DESCRIPTION = "";
    const VALID_DESCTIPTION_1 = "Extreme Exorcism is a paranormal platformer where every move you make comes back to haunt you.";
    const VALID_DESCTIPTION_2 = "aaAA12$%!";

    it('returns "Required field" if the argument is ""', () => {
        expect(description(EMPTY_DESCRIPTION)).toBe("Required field");
    });
    it('returns "" if the are no errors', () => {
        expect(description(VALID_DESCTIPTION_1)).toBe("");
        expect(description(VALID_DESCTIPTION_2)).toBe("");
    });
});

describe('released', () => {
    const EMPTY_RELEASED = "";
    const INVALID_RELEASED_1 = "1900-01-01";
    const INVALID_RELEASED_2 = "2050-01-01";
    const VALID_RELEASED_1 = "1980-01-01";
    const VALID_RELEASED_2 = "2023-01-01";

    it('returns "Required field" if the argument is ""', () => {
        expect(released(EMPTY_RELEASED)).toBe("Required field");
    });
    it('returns a proper error message if the input is invalid', () => {
        expect(released(INVALID_RELEASED_1)).toBe("The year can't be earlier than 1950");
        expect(released(INVALID_RELEASED_2)).toBe("The year can't be greater than the current year");
    });
    it('returns "" if the are no errors', () => {
        expect(released(VALID_RELEASED_1)).toBe("");
        expect(released(VALID_RELEASED_2)).toBe("");
    });
});

describe('rating', () => {
    const EMPTY_RATING = "";
    const INVALID_RATING_1 = "0";
    const INVALID_RATING_2 = "-1";
    const INVALID_RATING_3 = "6";
    const INVALID_RATING_4 = "3.123";
    const VALID_RATING_1 = "1";
    const VALID_RATING_2 = "3.12";
    const VALID_RATING_3 = "5";

    it('returns "Required field" if the argument is ""', () => {
        expect(name(EMPTY_RATING)).toBe("Required field");
    });
    it('returns a proper error message if the input is invalid', () => {
        expect(rating(INVALID_RATING_1)).toBe("Min value: 1");
        expect(rating(INVALID_RATING_2)).toBe("Min value: 1");
        expect(rating(INVALID_RATING_3)).toBe("Max value: 5");
        expect(rating(INVALID_RATING_4)).toBe("Max 2 decimals");
    });
    it('returns "" if the are no errors', () => {
        expect(rating(VALID_RATING_1)).toBe("");
        expect(rating(VALID_RATING_2)).toBe("");
        expect(rating(VALID_RATING_3)).toBe("");
    });
});



// --------------------------------------------------------- //
// VALIDATE genres, platforms
describe('validateGenres', () => {
    const EMPTY_GENRES = [];
    const VALID_GENRES_1 = ["Action"];
    const VALID_GENRES_2 = ["Action", "Indie"];
    const VALID_GENRES_3 = ["Indie", "Adventure", "RPG", "Strategy", "Shooter","Casual", "Simulation", "Puzzle", "Arcade", "Platformer", "Massively Multiplayer", "Racing", "Sports", "Fighting", "Family", "Board Games", "Educational", "Card"];

    it('returns "Chose at least one genre." if no genre was selected', () => {
        expect(validateGenres(EMPTY_GENRES)).toBe("Chose at least one genre.");
    });
    it('returns "" if the are no errors', () => {
        expect(validateGenres(VALID_GENRES_1)).toBe("");
        expect(validateGenres(VALID_GENRES_2)).toBe("");
        expect(validateGenres(VALID_GENRES_3)).toBe("");
    });
});

describe('validatePlatforms', () => {
    const INVALID_PLATFORMS_1 = [""];
    const INVALID_PLATFORMS_2 = ["", "Mac"];
    const INVALID_PLATFORMS_3 = ["Mac", "", "PC"];

    const CHARACTERS_56 = "EternaTech: Nexus of Innovation and Advancement Tech. 56";
    const INVALID_PLATFORMS_4 = [CHARACTERS_56];
    const INVALID_PLATFORMS_5 = ["Action", CHARACTERS_56];

    const VALID_PLATFORMS_1 = ["Mac"];
    const VALID_PLATFORMS_2 = ["aaAA12$%"];
    const VALID_PLATFORMS_3 = ["aa AA 12 $%", "Mac", "PC", "EternaTech"];


    it('returns a proper error message if the input is invalid', () => {
        expect(validatePlatforms(INVALID_PLATFORMS_1)).toBe("The first platform cannot be empty.");
        expect(validatePlatforms(INVALID_PLATFORMS_2)).toBe("The first platform cannot be empty.");
        expect(validatePlatforms(INVALID_PLATFORMS_3)).toBe("The platform fields cannot be empty. If needed, delete the platform.");

        expect(validatePlatforms(INVALID_PLATFORMS_4)).toBe("Max 50 characters for each platform");
        expect(validatePlatforms(INVALID_PLATFORMS_5)).toBe("Max 50 characters for each platform");
    });

    it('returns "" if the are no errors', () => {
        expect(validatePlatforms(VALID_PLATFORMS_1)).toBe("");
        expect(validatePlatforms(VALID_PLATFORMS_2)).toBe("");
        expect(validatePlatforms(VALID_PLATFORMS_3)).toBe("");
    });
});



// --------------------------------------------------------- //
// VALIDATE SUBMIT
// eg.
// validateSubmit({name: "", image: "htpps...", description: "", released: "", rating: "", platforms: ["", "Action"], genres = []}, {name: 'Required field', image: "htpps...", description: "", released: "", rating: "", platforms: "", genres: ""})
describe('validateSubmit', () => {
    // valid objects
    const VALID_VG = {
        name: "anyString",
        image: "anyString",
        description: "anyString",
        platforms: ["anyString"],
        released: "anyString",
        rating: "anyString",
        genres: ["anyString"]
    }; 
    const VALID_ERRORS = {
        name: "",
        image: "",
        description: "",
        platforms: "",
        released: "",
        rating: "",
        genres: ""
    };

    // invalid vg
    const INVALID_VG_EMPTYNAME = {
        name: "",
        image: "anyString",
        description: "anyString",
        platforms: ["anyString"],
        released: "anyString",
        rating: "anyString",
        genres: ["anyString"]
    };
    const INVALID_VG_EMPTYPLATFORMS = {
        name: "anyString",
        image: "anyString",
        description: "anyString",
        platforms: ["", "Mac"],
        released: "anyString",
        rating: "anyString",
        genres: ["anyString"]
    };
    const INVALID_VG_EMPTYGENRES = {
        name: "anyString",
        image: "anyString",
        description: "anyString",
        platforms: ["anyString"],
        released: "anyString",
        rating: "anyString",
        genres: []
    };

    // invalid errors
    const INVALID_ERRORS_NAME = {
        name: "anyString",
        image: "",
        description: "",
        platforms: "",
        released: "",
        rating: "",
        genres: ""
    };
    const INVALID_ERRORS_PLATFORMS = {
        name: "",
        image: "",
        description: "",
        platforms: "anyString",
        released: "",
        rating: "",
        genres: ""
    };

    // tests
    it('returns null if all the fields are complete and the are no errors', () => {
        expect(validateSubmit(VALID_VG, VALID_ERRORS)).toBe(null);
    });

    it('returns a proper error message if at least one field is empty and there are no errors (this happens when the user tries to submit before completing a field neither making a change in that input)', () => {
        expect(validateSubmit(INVALID_VG_EMPTYNAME, VALID_ERRORS)).toBe("Please complete all the fields. ");
        expect(validateSubmit(INVALID_VG_EMPTYPLATFORMS, VALID_ERRORS)).toBe("Please complete all the fields. ");
        expect(validateSubmit(INVALID_VG_EMPTYGENRES, VALID_ERRORS)).toBe("Please complete all the fields. ");

    });

    it('returns a proper error message if all fields are complete and there is an error', () => {
        expect(validateSubmit(VALID_VG, INVALID_ERRORS_NAME)).toBe(" Please fix the errors.");
        expect(validateSubmit(VALID_VG, INVALID_ERRORS_PLATFORMS)).toBe(" Please fix the errors.");
    });

    it('returns a proper error message if at least one field is empty and there is also an error', () => {
        expect(validateSubmit(INVALID_VG_EMPTYNAME, INVALID_ERRORS_NAME)).toBe("Please complete all the fields. Please fix the errors.");
        expect(validateSubmit(INVALID_VG_EMPTYGENRES, INVALID_ERRORS_PLATFORMS)).toBe("Please complete all the fields. Please fix the errors.");
    });
});
