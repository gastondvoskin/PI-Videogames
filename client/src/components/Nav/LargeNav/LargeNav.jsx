import { Link } from "react-router-dom";
import styles from "./LargeNav.module.css";
import Menu from "../Menu/Menu";
import logo from "../../../assets/logo.png";

const LargeNav = () => {
  return (
    <nav className={styles.navContainer}>
      <Link to="/home"><img className={styles.logo} src={logo} alt="Home" /></Link>
      <Menu />
    </nav>
  );
};

export default LargeNav;
