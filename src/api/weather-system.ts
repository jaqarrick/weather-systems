const nodeFetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
const translateWindSpeed = require("./translateWindSpeed");
const SerialPort = require("serialport");
const apiKey = fs.readFileSync(path.join("apikey.txt"), { encoding: "utf8" });

class WeatherSystem {
  city: string;
  port: any;
  parser: any;
  delay: number;
  interval: any;

  constructor(pathToSerialPort: string | null, city: string = "Curitiba") {
    this.city = city;
    this.port = pathToSerialPort
      ? new SerialPort(pathToSerialPort, {
          baudRate: 9600,
          dataBits: 8,
          parity: "none",
          stopBits: 1,
          flowControl: false,
        })
      : null;

    const parsers = SerialPort.parsers;

    this.parser = new parsers.Readline({
      deminiter: "\r\n",
    });

    this.parser.on("data", (data) => {
      console.log(data);
    });

    this.delay = 5000;
  }

  getWindSpeed = async () => {
    try {
      const response = await nodeFetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${this.city}&aqi=no`
      );

      const json = await response.json();

      return json.current.wind_mph ?? null;
    } catch (err) {
      console.log(err);
    }
  };

  translateWindSpeed = (km: number): Buffer => {
    const windSpeedInteger = Math.floor(km);
    const fromArray = [0];
    if (windSpeedInteger < 1 || !windSpeedInteger) fromArray.push(0);
    else if (windSpeedInteger <= 10) fromArray.push(windSpeedInteger);
    else if (windSpeedInteger > 10) fromArray.push(10);
    else fromArray.push(0);

    const buf = Buffer.from([fromArray[0]]);

    return buf;
  };

  callback = () =>
    this.getWindSpeed().then((speed) => {
      console.log("The speed is ", speed);
    });

  start = () => (this.interval = setInterval(this.callback, this.delay));

  stop = () => clearInterval(this.interval);
}

module.exports = WeatherSystem;
