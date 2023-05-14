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

const secondHardcodedObject = 
{
    "id": "46",
    "name": "StarBlood Arena",
    "background_image": "https://media.rawg.io/media/screenshots/6f3/6f33d1ecfbe91f834b9c6e9f497ef08b.jpg",
    "platforms": [
        "PlayStation 4"
    ],
    "released": "2017-04-11",
    "rating": 2.17,
    "genres": [
        "Action"
    ],
    "description": "Test your mettle in furious arena combat as you move, evade, and attack in any direction against pilots from every corner of the galaxy. Fight for glory, credits, and your life as the StarBlood Network broadcasts every lawless match for the universe to see. Whether it’s single player Carnage deathmatches, Team Carnage* deathmatches, or Invaders co-op*, you’ll be constantly challenged to step up your game and prove that you’ve got the skills to emerge victorious. <br/><br/>The StarBlood Network cameras are on, everyone is watching, and there’s no safe space in the Arena. Ready? You better be. <br/>Welcome to StarBlood Arena.<br/><br/>Features:<br/>• Outmaneuver your opposition in chaotic combat with total freedom to move, evade, and attack in any direction.<br/>• Pilot one of 9 distinct ships with their own unique pilot, playstyle, and loadout.<br/>• Play single player, co-op, or multiplayer* matches to unlock ship, weapon, and auxiliary modifications<br/>* Active PS Plus membership required<br/><br/><br/><br/>VR Games may cause some players to experience motion sickness.<br/><br/>Use of PSN and SEN account are subject to the Terms of Service and User Agreement and applicable privacy policy (see terms at sonyentertainmentnetwork.com/terms-of-service &amp; sonyentertainmentnetwork.com/privacy-policy). <br/>Online features may be terminated at any time.<br/>*Online multiplayer requires a PlayStation®Plus membership.<br/><br/>Online Play (Required)<br/>PlayStation®VR Required<br/>PlayStation®Camera Required<br/><br/>  Software subject to license (us.playstation.com/softwarelicense). Online features require an account and are subject to terms of service and applicable privacy policy (playstationnetwork.com/terms-of-service &amp; playstationnetwork.com/privacy-policy). One-time license fee for play on account’s designated primary PS4™ system and other PS4™ systems when signed in with that account.<br/><br/><br/><br/>In development for PlayStation®VR. Please review and follow all safety guidelines for use of PlayStation®VR. Playstation®VR is not for use by children under age 12. Playstation®4 system, PlayStation®VR and PlayStation®Camera are required to experience VR functionality."
}

const hardcodedArray = [
    hardcodedObject, secondHardcodedObject
]



const Cards = () => {

    return (
        <div>      
            {hardcodedArray.map((element, index) => {
                return (
                    <Card 
                        key={index}
                        id={element.id}
                        name={element.name}
                        background_image={element.background_image}
                        genres={element.genres}
                    />        
                )
            })}
        </div>
    );
};

export default Cards; 