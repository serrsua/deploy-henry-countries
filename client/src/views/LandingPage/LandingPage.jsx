import { NavLink } from "react-router-dom";
import styles from "./LandingPage.module.css";

const Landing = () => {
  return (
    <>
      <div className={styles.landing}>
        <h1 className={styles.title}>Welcome to Henry Countries</h1>
        <NavLink to={"/home"}>
          <button className={styles.button}>Home</button>
        </NavLink>
      </div>
    </>
  );
};

export default Landing;
