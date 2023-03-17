import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
    return (
        <div className={styles.mainContainer}>
            <NavLink className={styles.links} to="/home">Home</NavLink>
            <NavLink className={styles.links} to="/form">New Activity</NavLink>
        </div>
    )
}

export default NavBar;