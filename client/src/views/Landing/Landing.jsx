import { NavLink } from "react-router-dom";
import styles from "./Landing.module.css";
import logo from "../../assets/logo.png";

const Landing = () => {
  return (
    // mainContainer
    <main className={styles.mainContainer}>
      {/* linkContainer */}
      <NavLink to="/home" className={styles.linkContainer}>
        <div className={styles.circle}>
          <img className={styles.logo} src={logo} alt="VideogamesLogo" />
          <h1 className={styles.text}>START!</h1>
        </div>
      </NavLink>
    </main>
  );
};

export default Landing;
