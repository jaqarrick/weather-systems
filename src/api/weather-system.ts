const nodeFetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
const SerialPort = require("serialport");
const apiKey = fs.readFileSync(path.join("apikey.txt"), { encoding: "utf8" });

class WeatherSystem {
  public city: string;
  public port: typeof SerialPort;
  private parser: typeof SerialPort.parsers;
  private delay: number;
  private interval: ReturnType<typeof setInterval>;
  private isPortOpen: Promise<boolean>

  constructor(pathToSerialPort: string | null, city: string = "Chicago") {
    this.city = city;
    console.log("Fetching weather for ", this.city)
    console.log("Linking arduino from port", pathToSerialPort)
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

    // How often a request is sent to the weather api
    // Should be more than 10sec / 10,000ms
    this.delay = 30000;

    this.isPortOpen = new Promise(res => {

      this.port.on("open", ()=> {
        console.log("Port is open")
        res(true)
      })

    })
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
    const fromArray = [];
    if (windSpeedInteger < 1 || !windSpeedInteger) fromArray.push(0);
    else if (windSpeedInteger <= 10) fromArray.push(windSpeedInteger);
    else if (windSpeedInteger > 10) fromArray.push(10);
    else fromArray.push(0);

    const buf = Buffer.from([fromArray[0]]);
    // const buf = Buffer.from([0]);


    return buf;
  };

  callback = () =>
    this.getWindSpeed().then((speed) => {
      console.log(`The wind speed in ${this.city} is ${speed}km.`);

      const buf = this.translateWindSpeed(speed);
      console.log("Sending buffer: ", buf, " to Serial Port");
      this.port.write(buf);

    });

  start = () => {
    this.isPortOpen.then(() => {
      this.callback()
      this.interval = setInterval(this.callback, this.delay);
    });
  };

  stop = () => clearInterval(this.interval);
}

module.exports = WeatherSystem;
