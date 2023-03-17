import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getCountry } from "../../redux/actions";
import styles from "./Detail.module.css";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getCountry(id));
  }, [dispatch, id]);

  const country = useSelector((state) => state.detailCountry);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.detailContainer}>
          <div className={styles.information}>
            <img className={styles.flagImg} src={country?.image} alt="flag" />
            <h3>ID: {country?.id}</h3>
            <h3>Name: {country?.name}</h3>
            <h3>Continent: {country?.continents}</h3>
            <h3>Capital: {country?.capital}</h3>
            {country.subregion && <h3>Subregion: {country.subregion}</h3>}
            {country.area && <h3>Area: {country.area} Km²</h3>}
            <h3>Population: {country?.population}</h3>
          </div>

          <div className={styles.actContainer}>
            <h2>Activities</h2>
            <div className={styles.cardsContainer}>
              {country.activities?.length ? (
                country.activities.map((activity) => {
                  return (
                    <div className={styles.activities} key={activity.id}>
                      <h3>{activity.name.toUpperCase()}</h3>
                      <p>Difficulty: {activity.difficulty} (1-5)</p>
                      <p>Duration: {activity.duration} hours</p>
                      <p>Season: {activity.season}</p>
                    </div>
                  );
                })
              ) : (
                <div>
                  <h2>Not activities yet</h2>
                  <NavLink to="/form">
                    <button className={styles.createBtn}>Create one</button>
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>

        <NavLink to="/home">
          <button className={styles.homeBtn}>Back to Home</button>
        </NavLink>
      </div>
    </>
  );
};

export default Detail;
