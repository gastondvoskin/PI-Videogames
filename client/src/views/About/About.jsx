import reactLogo from "../../assets/logosAbout/reactLogo.png";
import reduxLogo from "../../assets/logosAbout/reduxLogo.png";
import jsLogo from "../../assets/logosAbout/jsLogo.png";
import nodeJsLogo from "../../assets/logosAbout/nodeJsLogo.webp";
import expressJsLogo from "../../assets/logosAbout/expressJsLogo.svg";
import sequelizeLogo from "../../assets/logosAbout/sequelizeLogo.png";


import styles from "./About.module.css";

const About = () => {
    return (
        <div className={styles.mainContainer}>
            {/* WELCOME */}
            <h1>Welcome to my Videogames Web Page!</h1> 
            <p>My name is Gastón Dvoskin and this is an individual project to practice my skills in development.</p> 
            <p>Here you will find the main tecnologies that I used to build this web page and what this platform has to offer.</p>
            
            {/* TECNOLOGIES */}
            <h2>Technologies</h2>
            <p>The main tecnologies used for this project were: {/* Javascript, React, Redux, NodeJS, Express and Sequelize */}</p>

            <div className={styles.allLogosContainer}>
                <div className={styles.logoContainer}>
                    <img className={styles.logo} src={jsLogo} alt="jsLogo"/>
                    <h4>Javascript</h4>
                </div>
                <div className={styles.logoContainer}>
                    <img className={styles.logo} src={reactLogo} alt="reactLogo"/>
                    <h4>React</h4>
                </div>
                <div className={styles.logoContainer}>
                    <img className={styles.logo} src={reduxLogo} alt="reduxLogo"/>
                    <h4>Redux</h4>
                </div>
                <div className={styles.logoContainer}>
                    <img className={styles.logo} src={nodeJsLogo} alt="nodeLogo"/>
                    <h4>NodeJS</h4>
                </div>
                <div className={styles.logoContainer}>
                    <img className={styles.logo} src={expressJsLogo} alt="expressLogo"/>
                    <h4>Express</h4>
                </div>
                <div className={styles.logoContainer}>
                    <img className={styles.logo} src={sequelizeLogo} alt="sequelizeLogo"/>
                    <h4>Sequelize</h4>
                </div>






            </div>
            
            
            {/* FUNCTIONALITIES */}
            <h2>Functionalities</h2>

            <div className={styles.allFunctionalitiesContainer}>

                <h3>1. Render videogames</h3>
                <ul className={styles.functionalityContainer}>
                    <li>Render videogames from my database and from rawg API. You will see the basic information of each videogame</li>
                    <li>In the Home component you will see all the videogames from my database and, for performance reasons, the first 150 videogames from rawg.</li>
                    <li>The results are shown by pages, displaying 15 videogames in each page.</li>
                </ul>
            
                <h3>2. Filter and sort</h3>
                <ul className={styles.functionalityContainer}>
                    <li>Filter all videogames by name, including my database and the +800.000 from rawg API.</li>
                    <li>Filter videogames by creator and genres, combining both filters. These filters apply to all my database and the first  150 from rawg API.</li>
                    <li>Sort the videogame results based on selected criteria: alphabetically or by rating.</li>
                    <li>Reset all filters to their default settings.</li>
                </ul>

                <h3>3. View more details</h3>
                <ul className={styles.functionalityContainer}>
                    <li>Access detailed information of any videogame, including the complete description, rating, release date, genres, platforms and id.</li>
                </ul>


                <h3>4. Add a new videogame</h3>
                <ul className={styles.functionalityContainer}>
                    <li>Add a new videogame to my database.</li>
                    <li>The videogame will be created through a form in the Admin section.</li>
                    <li>Render the added videogame as any of the other ones.</li>
                </ul>

            </div>

            {/* THANKS */}

            <p>I hope you enjoy using my web page and exploring the wide range of videogames available. If you have any questions or want to give me feedback, feel free to contact me through Linkedin or gitHub. Thank you for your visit!</p>
            
        </div>
    );
};

export default About;