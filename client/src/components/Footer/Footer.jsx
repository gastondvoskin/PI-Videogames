import styles from "./Footer.module.css";
import linkedinTransp from "../../assets/logosFooter/linkedinTransp.png";
import githubTransp from "../../assets/logosFooter/githubTransp.png";


const Footer = () => {
  const GITHUB_URL = "https://github.com/gastondvoskin/PI-Videogames";
  const LINKEDIN_URL = "https://www.linkedin.com/in/gaston-dvoskin/";

  return (
    <footer className={styles.mainContainer}>
      <a href={LINKEDIN_URL} target="_blank">
        <img
          className={styles.linkedinLogo}
          src={linkedinTransp}
          alt="Linkedin"
        />
      </a>

      <h3 className={styles.text}>Developed by Gastón Dvoskin</h3>

      <a href={GITHUB_URL} target="_blank">
        <img className={styles.githubLogo} src={githubTransp} alt="GitHub" />
      </a>
      
    </footer>
  );
};

export default Footer;
