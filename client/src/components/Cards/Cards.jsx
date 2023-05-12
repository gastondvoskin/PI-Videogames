import Card from "../Card/Card.jsx";

const hardcodedObject = {
    "id": "1",
    "name": "D/Generation HD",
    "background_image": "https://media.rawg.io/media/screenshots/5c4/5c41cb3b0d15ef0974f930898cedbc6c.jpg",
    "platforms": [
        "Xbox One",
        "PlayStation 4",
        "Nintendo Switch",
        "PC",
        "macOS"
    ],
    "released": "2015-10-23",
    "rating": 0,
    "genres": [
        "Adventure",
        "Puzzle"
    ],
    "description": "The year is 2021, and Genoq has become a leading corporation in bio-medical research. However the tower, some 90 stories high, is not all that it seems. Somewhere within the tower, highly illegal bio-weapons research has been conducted in secret. June 26th, disaster strikes and the lethal organic weapons have escaped and threaten not only the staff members stranded in the tower, but the world itself. <br/><br/>You arrive on the 80th floor with an urgent package addressed to Derrida, the lead scientist at Genoq working on the bio-weapons research. Set back from your goal, you must climb the tower, assisting those in need or focusing solely on your task at hand, and stopping the virus from escaping the tower and threatening all life on the planet.<br/><br/>Will you help the stranded survivors or hinder them? Can you deliver the package to Derrida in time? Can you prevent the impending catastrophe and escape with your life?<br/><br/>Key Features<br/><ul><li> New high res graphics<br/></li><li> New music by Mark 'TDK' Knight<br/></li><li> New control menu<br/></li><li> Can save at any point in the game<br/></li><li> Leaderboards<br/></li><li> Achievements<br/></li><li> Same great gameplay</li></ul>"
}



const Cards = () => {

    return (
        <div>
            NIY: Cards
            <Card 
                id={hardcodedObject.id}
                name={hardcodedObject.name}
                background_image={hardcodedObject.background_image}
                genres={hardcodedObject.genres}
            />
        </div>
    );
};

export default Cards; 