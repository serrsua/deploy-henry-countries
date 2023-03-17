import { NavLink } from "react-router-dom";
import styles from "./Card.module.css";

const Card = (props) => {
  const { id, name, image, continents } = props;
  return (
    <>
      <NavLink className={styles.navlink} to={`/countries/${id}`}>
        <div className={styles.card}>
          <img
            className={styles.cardImg}
            src={image}
            alt={`bandera de ${name}`}
          />
          <h2 className={styles.cardName}>{name}</h2>
          <h3 className={styles.cardContinent}>{continents}</h3>
        </div>
      </NavLink>
    </>
  );
};

export default Card;
