import axios from "axios";
export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRY = "GET_COUNTRY";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const GET_COUNTRY_BY_NAME = "GET_COUNTRY_BY_NAME";

export const BY_CONTINENT = "BY_CONTINENT";
export const BY_ACTIVITY = "BY_ACTIVITY";
export const BY_NAME = "BY_NAME";
export const BY_POPULATION = "BY_POPULATION";

export const getCountries = () => {
  return async function (dispatch) {
    const apiData = await axios.get("/countries");
    const countries = apiData.data;
    dispatch({
      type: GET_COUNTRIES,
      payload: countries,
    });
  };
};

export const getCountry = (id) => {
  return async function (dispatch) {
    const apiData = await axios.get(`/countries/${id}`);
    const country = apiData.data;
    dispatch({
      type: GET_COUNTRY,
      payload: country,
    });
  };
};

export const getCountryByName = (name) => {
  return async function (dispatch) {
    const apiData = await axios.get(
      `/countries?name=${name}`
    );
    const country = apiData.data;
    dispatch({
      type: GET_COUNTRY_BY_NAME,
      payload: country,
    });
  };
};

export const getAllActivities = () => {
  return async function (dispatch) {
    const apiData = await axios.get("/activities");
    const activities = apiData.data;
    dispatch({
      type: GET_ACTIVITIES,
      payload: activities,
    });
  };
};

export const orderByName = (name) => {
  return {
    type: BY_NAME,
    payload: name,
  };
};

export const continentFilter = (continents) => {
  return {
    type: BY_CONTINENT,
    payload: continents,
  };
};

export const orderByPopulation = (pop) => {
  return {
    type: BY_POPULATION,
    payload: pop,
  };
};

export const activityFilter = (name) => {
  return {
    type: BY_ACTIVITY,
    payload: name,
  };
};
