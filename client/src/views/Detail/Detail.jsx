import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getCountry } from "../../redux/actions";
import styles from "./Detail.module.css";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [detail, setDetail] = useState({})
  const country = useSelector((state) => state.detailCountry);

  useEffect(() => {
    dispatch(getCountry(id));
    setDetail(country)
    return () => {setDetail({})}
  }, [dispatch, id, country]);


  return (
    <> 
      {
        !detail ? <span>Loading...</span>
        :
        (
          <div className={styles.container}>
        <div className={styles.detailContainer}>
          <div className={styles.information}>
            <img className={styles.flagImg} src={detail?.image} alt="flag" />
            <h3>ID: {detail?.id}</h3>
            <h3>Name: {detail?.name}</h3>
            <h3>Continent: {detail?.continents}</h3>
            <h3>Capital: {detail?.capital}</h3>
            {detail.subregion && <h3>Subregion: {detail.subregion}</h3>}
            {detail.area && <h3>Area: {detail.area} Km²</h3>}
            <h3>Population: {detail?.population}</h3>
          </div>

          <div className={styles.actContainer}>
            <h2>Activities</h2>
            <div className={styles.cardsContainer}>
              {detail.activities?.length ? (
                detail.activities.map((activity) => {
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
        )
      }
      
    </>
  );
};

export default Detail;
