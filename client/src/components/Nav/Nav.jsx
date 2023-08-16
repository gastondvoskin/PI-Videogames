import { Link, NavLink } from "react-router-dom";
import styles from "./Nav.module.css";
import logo from "../../assets/logo.png";
import NavMenu from "../NavMenu/NavMenu";

const Nav = () => {
  return (
    <nav className={styles.navContainer}>
      <Link to="/home">
        <img className={styles.logo} src={logo} alt="Home" />
      </Link>
      <div className={styles.linksContainer}>
        <NavMenu />
      </div>
      <button className={styles.bars} onClick={()=> {console.log('hola')}}>☰</button>
    </nav>
  );
};

export default Nav;
