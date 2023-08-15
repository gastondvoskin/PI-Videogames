import reactLogo from "../../assets/logosAbout/reactLogo.png";
import reduxLogo from "../../assets/logosAbout/reduxLogo.png";
import jsLogo from "../../assets/logosAbout/jsLogo.png";
import nodeJsLogo from "../../assets/logosAbout/nodeJsLogo.webp";
import expressJsLogo from "../../assets/logosAbout/expressJsLogo.svg";
import sequelizeLogo from "../../assets/logosAbout/sequelizeLogo.png";
import { useState } from "react";
import backDiagram from "../../assets/diagrams/videogamesBackFlow.jpg";
import frontDiagram from "../../assets/diagrams/videogamesFrontFlow.jpg";
import styles from "./About.module.css";

const About = () => {
  const GITHUB_URL = "https://github.com/gastondvoskin/PI-Videogames";
  const LINKEDIN_URL = "https://www.linkedin.com/in/gaston-dvoskin/";
  const SHOW_ICON = String.fromCharCode(9660);
  const HIDE_ICON = String.fromCharCode(9650);

  const [view, setView] = useState({
    overview: false,
    technologies: false,
    functionalities: false,
    contact: false,
    diagrams: false,
  });

  const handleView = (event) => {
    const { name } = event.target;
    setView({ ...view, [name]: !view[name] });
  };

  return (
    <div className={styles.mainContainer}>
      {/* WELCOME */}
      <div className={styles.introductionContainer}>
        <h1>Welcome to my Videogames webpage!</h1>
        <p>
          My name is Gastón Dvoskin, and I am a full-stack web developer. This
          project was created in 2023 as part of my studies at Soy Henry
          Academy.
        </p>
        <p>
          In this section, you will discover the key features of the webpage and
          the technologies I employed to build it.
        </p>
      </div>

      {/* OVERVIEW */}
      <section className={styles.sectionContainer}>
        <div className={styles.subtitleAndButtonContainer}>
          <h2 className={styles.subtitle}>OVERVIEW VIDEO</h2>
          <button
            className={styles.viewButton}
            name="overview"
            onClick={handleView}
          >
            {view.overview ? HIDE_ICON : SHOW_ICON}
          </button>
        </div>
        {view.overview && (
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/trnyhUCFNfE"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen="allowfullscreen"
          ></iframe>
        )}
      </section>

      {/* FUNCTIONALITIES */}
      <section className={styles.sectionContainer}>
        <div className={styles.subtitleAndButtonContainer}>
          <h2 className={styles.subtitle}>FUNCTIONALITIES</h2>
          <button
            className={styles.viewButton}
            name="functionalities"
            onClick={handleView}
          >
            {view.functionalities ? HIDE_ICON : SHOW_ICON}
          </button>
        </div>
        {view.functionalities && (
          <div className={styles.dataContainer}>
            <h3>1. Render videogames</h3>
            <ul className={styles.functionalityContainer}>
              <li>
                Render videogames from my database and from rawg API. You will
                see the basic information of each videogame
              </li>
              <li>
                In the Home component you will see all the videogames from my
                database and, for performance reasons, the first 150 videogames
                from rawg.
              </li>
              <li>
                The results are shown by pages, displaying 15 videogames in each
                page.
              </li>
            </ul>

            <h3>2. Filter and sort</h3>
            <ul className={styles.functionalityContainer}>
              <li>
                Filter all videogames by name, including my database and the
                +800.000 from rawg API.
              </li>
              <li>
                Filter videogames by creator and genres, combining both filters.
                These filters apply to all my database and the first 150 from
                rawg API.
              </li>
              <li>
                Sort the videogame results based on selected criteria:
                alphabetically or by rating.
              </li>
              <li>Reset all filters to their default settings.</li>
            </ul>

            <h3>3. View more details</h3>
            <ul className={styles.functionalityContainer}>
              <li>
                Access detailed information of any videogame, including the
                complete description, rating, release date, genres, platforms
                and id.
              </li>
            </ul>

            <h3>4. Add a new videogame</h3>
            <ul className={styles.functionalityContainer}>
              <li>Add a new videogame to my database.</li>
              <li>
                The videogame will be created through a form in the Create
                section.
              </li>
              <li>Render the added videogame as any of the other ones.</li>
            </ul>
          </div>
        )}
      </section>

      {/* TECHNOLOGIES */}
      <section className={styles.sectionContainer}>
        <div className={styles.subtitleAndButtonContainer}>
          <h2 className={styles.subtitle}>TECHNOLOGIES</h2>
          <button
            className={styles.viewButton}
            name="technologies"
            onClick={handleView}
          >
            {view.technologies ? HIDE_ICON : SHOW_ICON}
          </button>
        </div>
        {view.technologies && (
          <div className={styles.dataContainer}>
            <p>
              The main tecnologies used for this project were:{" "}
              {/* Javascript, React, Redux, NodeJS, Express and Sequelize */}
            </p>

            <div className={styles.allLogosContainer}>
              <div className={styles.logoContainer}>
                <img className={styles.logo} src={jsLogo} alt="jsLogo" />
                <h4>Javascript</h4>
              </div>
              <div className={styles.logoContainer}>
                <img className={styles.logo} src={reactLogo} alt="reactLogo" />
                <h4>React</h4>
              </div>
              <div className={styles.logoContainer}>
                <img className={styles.logo} src={reduxLogo} alt="reduxLogo" />
                <h4>Redux</h4>
              </div>
              <div className={styles.logoContainer}>
                <img className={styles.logo} src={nodeJsLogo} alt="nodeLogo" />
                <h4>NodeJS</h4>
              </div>
              <div className={styles.logoContainer}>
                <img
                  className={styles.logo}
                  src={expressJsLogo}
                  alt="expressLogo"
                />
                <h4>Express</h4>
              </div>
              <div className={styles.logoContainer}>
                <img
                  className={styles.logo}
                  src={sequelizeLogo}
                  alt="sequelizeLogo"
                />
                <h4>Sequelize</h4>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* DEVELOPMENT DIAGRAMS */}
      <section className={styles.sectionContainer}>
        <div className={styles.subtitleAndButtonContainer}>
          <h2 className={styles.subtitle}>DEVELOPMENT DIAGRAMS</h2>
          <button
            className={styles.viewButton}
            name="diagrams"
            onClick={handleView}
          >
            {view.diagrams ? HIDE_ICON : SHOW_ICON}
          </button>
        </div>
        {view.diagrams && (
          <div className={styles.dataContainer}>
            <p>Server</p>
            <img
              className={styles.backDiagram}
              src={backDiagram}
              alt="diagram"
            />
            <p>Client</p>
            <img
              className={styles.backDiagram}
              src={frontDiagram}
              alt="diagram"
            />
          </div>
        )}
      </section>

      {/* CONTACT */}
      <section className={styles.sectionContainer}>
        <div className={styles.subtitleAndButtonContainer}>
          <h2 className={styles.subtitle}>CONTACT</h2>
          <button
            className={styles.viewButton}
            name="contact"
            onClick={handleView}
          >
            {view.contact ? HIDE_ICON : SHOW_ICON}
          </button>
        </div>
        {view.contact && (
          <div className={styles.dataContainer}>
            <p>
              Thank you for visiting my webpage and exploring the wide range of
              available videogames
            </p>
            <p>
              You can find the web repository on my{" "}
              <a
                className={styles.link}
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              .
            </p>
            <p>
              If you have any questions or would like to provide feedback,
              please feel free to contact me via{" "}
              <a
                className={styles.link}
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
              >
                Linkedin
              </a>
              .
            </p>
            <p>Once again, thank you for your visit!</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default About;
