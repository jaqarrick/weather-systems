const nodeFetch = require("node-fetch");

const WeatherFetcher = () => {
  // https://goweather.herokuapp.com/weather/Curitiba

  const getWindSpeed = (city: string = "Curitiba") => {
    nodeFetch(`https://goweather.herokuapp.com/weather/${city}`)
      .then((response) => response.json())
      .then((json) => console.log(`The wind speed in ${city} is ${json.wind}`))
      .catch((err) => console.log(err));
  };

  return { getWindSpeed };
};

module.exports = WeatherFetcher;
