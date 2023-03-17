const axios = require('axios');

const { Country } = require('../db');

const getApiData = async () => {
    let countries = await axios.get("https://restcountries.com/v3/all/");
    await countries.data.map((country) => {
      let pais = {
        id: country.cca3,
        name: country.name.common,
        image: country.flags[1],
        continents: country.continents[0],
        capital: country.capital ? country.capital[0] : "no tiene capital",
        subregion: country.subregion ? country.subregion : "no tiene subregion",
        area: country.area,
        region: country.region,
        population: country.population,
      };
      Country.findOrCreate({ where: pais });
    });
  };

  module.exports = getApiData;