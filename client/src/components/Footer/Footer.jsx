import styles from "./Footer.module.css";
import githubLogo from "../../assets/logosFooter/githubLogo.png";
import linkedinLogo from "../../assets/logosFooter/linkedinLogo.png";

const Footer = () => {
    const GITHUB_URL = "https://github.com/gastondvoskin/PI-Videogames";
    const LINKEDIN_URL = "https://www.linkedin.com/in/gaston-dvoskin/";

    return (
        <footer className={styles.mainContainer}>
            <a href={GITHUB_URL} target="_blank">
                <img className={styles.githubLogo} src={githubLogo} alt="GitHub"/>
            </a>

            <h3 className={styles.text}>Developed by Gastón Dvoskin</h3>

            <a href={LINKEDIN_URL} target="_blank">
                <img className={styles.linkedinLogo} src={linkedinLogo} alt="Linkedin"/>
            </a>

        </footer>
    );
};

export default Footer;