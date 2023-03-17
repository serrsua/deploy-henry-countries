import {
  GET_COUNTRIES,
  GET_COUNTRY,
  GET_ACTIVITIES,
  BY_NAME,
  BY_CONTINENT,
  BY_ACTIVITY,
  BY_POPULATION,
  GET_COUNTRY_BY_NAME,
  CLEAR_DETAIL,
} from "./actions";

const initialState = {
  countries: [],
  filteredCountries: [],
  activities: [],
  detailCountry: [],
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: payload,
      };
    case GET_COUNTRY:
      return {
        ...state,
        detailCountry: payload,
      };
    case CLEAR_DETAIL:
      return {
        ...state,
        detailCountry: payload,
      }
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: payload,
      };
    case GET_COUNTRY_BY_NAME:
      return {
        ...state,
        filteredCountries: payload,
      }

    case BY_NAME:
      if (!state.filteredCountries.length) {
        let copiedCountries = [...state.countries];
        let orderByName;

        if (payload === "Ascendente") {
          orderByName = copiedCountries.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
        }
        if (payload === "Descendente") {
          orderByName = copiedCountries.sort((a, b) => {
            if (a.name < b.name) {
              return 1;
            }
            if (a.name > b.name) {
              return -1;
            }
            return 0;
          });
        }
        return {
          ...state,
          countries: orderByName,
        };
      } else {
        let copiedCountries = [...state.filteredCountries];
        let orderByName;

        if (payload === "Ascendente") {
          orderByName = copiedCountries.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
        }
        if (payload === "Descendente") {
          orderByName = copiedCountries.sort((a, b) => {
            if (a.name < b.name) {
              return 1;
            }
            if (a.name > b.name) {
              return -1;
            }
            return 0;
          });
        }
        return {
          ...state,
          filteredCountries: orderByName,
        };
      }

    case BY_CONTINENT:
      if (payload === "All") {
        return {
          ...state,
          countries: [...state.countries],
          filteredCountries: [...state.countries],
        };
      }

      let filter = [...state.countries].filter(
        (country) => country.region === payload
      );
      return {
        ...state,
        filteredCountries: filter,
      };

    case BY_POPULATION:
      if (!state.filteredCountries.length) {
        let copiedCountries = [...state.countries];
        let orderByPop;

        if (payload === "Descendente") {
          orderByPop = copiedCountries.sort((a, b) => {
            if (a.population < b.population) {
              return -1;
            }
            if (a.population > b.population) {
              return 1;
            }
            return 0;
          });
        }
        if (payload === "Ascendente") {
          orderByPop = copiedCountries.sort((a, b) => {
            if (a.population < b.population) {
              return 1;
            }
            if (a.population > b.population) {
              return -1;
            }
            return 0;
          });
        }
        return {
          ...state,
          countries: orderByPop,
        };
      } else {
        let copiedCountries = [...state.filteredCountries];
        let orderByPop;

        if (payload === "Descendente") {
          orderByPop = copiedCountries.sort((a, b) => {
            if (a.population < b.population) {
              return -1;
            }
            if (a.population > b.population) {
              return 1;
            }
            return 0;
          });
        }
        if (payload === "Ascendente") {
          orderByPop = copiedCountries.sort((a, b) => {
            if (a.population < b.population) {
              return 1;
            }
            if (a.population > b.population) {
              return -1;
            }
            return 0;
          });
        }
        return {
          ...state,
          filteredCountries: orderByPop,
        };
      }

    case BY_ACTIVITY:
      let auxActivity = [];
      let filterActivity;

      if (payload === "All") {
        return {
          ...state,
          countries: [...state.countries],
          filteredCountries: [...auxActivity],
        };
      } else {
        filterActivity = state.countries.filter((country) => {

          for (let i = 0; i < country.activities.length; i++) {
            if (country.activities[i].name === payload)
              return true;
          }
          return false;
        });
        return {
          ...state,
          filteredCountries: filterActivity,
        };
      }

    default:
      return { ...state };
  }
}
