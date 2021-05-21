const nodeFetch = require("node-fetch");

const WeatherFetcher = () => {
  // https://goweather.herokuapp.com/weather/Curitiba

  const getWindSpeed = async (city: string = "Curitiba") => {
    try {
      const response = await nodeFetch(
        `https://goweather.herokuapp.com/weather/${city}`
      );

      const json = await response.json();

      return json.wind ?? null;
    } catch (err) {
      console.log(err);
    }
  };

  return { getWindSpeed };
};

module.exports = WeatherFetcher;
