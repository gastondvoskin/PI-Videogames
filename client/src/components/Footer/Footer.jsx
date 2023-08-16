import styles from "./Footer.module.css";
import github from "../../assets/logosFooter/github.png";
import linkedin from "../../assets/logosFooter/linkedin.png";

const Footer = () => {
  const GITHUB_URL = "https://github.com/gastondvoskin/PI-Videogames";
  const LINKEDIN_URL = "https://www.linkedin.com/in/gaston-dvoskin/";

  return (
    <footer className={styles.mainContainer}>
      <h3 className={styles.text}>Developed by Gastón Dvoskin</h3>
      <a href={LINKEDIN_URL} target="_blank">
        <img className={styles.linkedinLogo} src={linkedin} alt="Linkedin" />
      </a>

      <a href={GITHUB_URL} target="_blank">
        <img className={styles.githubLogo} src={github} alt="GitHub" />
      </a>
    </footer>
  );
};

export default Footer;
