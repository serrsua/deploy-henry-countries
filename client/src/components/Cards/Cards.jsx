import styles from "./Cards.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  continentFilter,
  activityFilter,
  orderByName,
  orderByPopulation,
  getCountryByName,
} from "../../redux/actions";

import Card from "../Card/Card";
import { SearchBar } from "../SearchBar/SearchBar";
import "./Cards.module.css";

const Cards = () => {
  const countriesGlobal = useSelector((state) => state.countries);
  const activities = useSelector((state) => state.activities);
  const filterCountries = useSelector((state) => state.filteredCountries);

  const [countries, setCountries] = useState([]);

  const [actualPage, setActualPage] = useState(1);
  const cardsByPage = 10;

  const lastCard = actualPage * cardsByPage;
  const firstCard = lastCard - cardsByPage;
  const totalPages = Math.ceil(filterCountries.length / cardsByPage)
  const page = countries.slice(firstCard, lastCard);

  useEffect(() => {
    setCountries(countriesGlobal);
  }, [countriesGlobal]);

  useEffect(() => {
    setCountries(filterCountries);
    setActualPage(1)
  }, [filterCountries]);

  const dispatch = useDispatch();

  const filterByContinent = (e) => {
    dispatch(continentFilter(e.target.value));

    if (e.target.value === "All") {
      setCountries([...countries]);
    } else {
      setCountries([...filterCountries]);
    }
  };

  const orderName = (e) => {
    dispatch(orderByName(e.target.value));
  };

  const orderPopulation = (e) => {
    dispatch(orderByPopulation(e.target.value));
  };

  const filterByActivity = (e) => {
    dispatch(activityFilter(e.target.value));
  };

  let newAcitivities;

  if (Array.isArray(activities)) {
    newAcitivities = activities.filter(
      (obj, index, arr) => index === arr.findIndex((t) => t.name === obj.name)
    );
  }

  const searchCountry = (name) => {
    dispatch(getCountryByName(name));
    setCountries([...filterCountries]);
  };

  return (
    <>
      <div className={styles.filtersContainer}>
        <div className={styles.searchBar}>
          <SearchBar searchCountry={searchCountry} />
        </div>
        <div className={styles.filters}>
          <select className={styles.selects} onChange={filterByContinent}>
            <option value="" hidden>
              Continent
            </option>
            <option value="All">All</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>

          <select className={styles.selects} onChange={orderName}>
            <option value="" hidden>
              Order
            </option>
            <option value="Ascendente">A - Z</option>
            <option value="Descendente">Z - A</option>
          </select>

          <select className={styles.selects} onChange={orderPopulation}>
            <option value="" hidden>
              Population
            </option>
            <option value="Ascendente">More population</option>
            <option value="Descendente">Less population</option>
          </select>

          <select className={styles.selects} name="activity" onChange={filterByActivity}>
            <option value="" hidden>
              Activity
            </option>
            

            {Array.isArray(newAcitivities) ? (
              newAcitivities.map((activity) => {
                return (
                  <option key={activity.id} value={activity.name}>
                    {activity.name}
                  </option>
                );
              })
            ) : (
              <option value="" disabled>Create a new activity</option>
            )}
          </select>
        </div>
      </div>

      <div className={styles.cardContainer}>
        {page?.map((country) => {
          return (
            <Card
              key={country.id}
              id={country.id}
              name={country.name}
              image={country.image}
              continents={country.continents}
            />
          );
        })}
      </div>
      <div className={styles.buttonContainer}>
        {
          totalPages === 1? null:
        
        actualPage === 1 ? (
        <>
        <button className={styles.actualPage} >{actualPage}</button>
        <button className={styles.pagButton} onClick={() => setActualPage(actualPage + 1)}>Next</button>
        </>
        ) : page.length < cardsByPage || actualPage === 25 ? (
          <>
          <button className={styles.pagButton} onClick={() => setActualPage(actualPage - 1)}>Prev</button>
          <button className={styles.actualPage} >{actualPage}</button>
          </>
        ) : (
          <>
            <button className={styles.pagButton} onClick={() => setActualPage(actualPage - 1)}>Prev</button>
            <button className={styles.actualPage} >{actualPage}</button>
            <button className={styles.pagButton} onClick={() => setActualPage(actualPage + 1)}>Next</button>
          </>
        )}
      </div>
    </>
  );
};

export default Cards;
