#!/bin/bash
arduino-cli compile --fqbn arduino:avr:uno /home/pi/Web/weather-systems/controller/controller
arduino-cli upload -p /dev/ttyACM0 --fqbn arduino:avr:uno /home/pi/Web/weather-systems/controller/controller