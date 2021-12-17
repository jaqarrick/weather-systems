# Weather Systems

_Self-activated wind chime that responds to weather data from anywhere in the world._

![chime](assets/chime.jpg)

Built using a node-linked arduino device - the wind chime moves a simple servo motor depending on the amount of wind of a given location. 

__[Click to hear...](https://vimeo.com/637224646)__

![video](assets/chime-live.gif)
![logs](assets/logs.png)
### How it works...
An arduino connects to a tiny rasperry pi over a serial port. The pi runs a node server that continuously makes requests to a weather api. The device is controlled via a simple local website that connects to the pi using web sockets. 

### Attribution
Matt Beall helped me construct the outer casing and suspension platform. 
