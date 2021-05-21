#!/bin/bash
current_path="./Controller/Controller"
if [ "$1" == "test" ]
    then 
        $current_path="./Controller/Servo"
fi
current_port=$(arduino-cli board list | grep '/dev/cu.usb' | cut -d ' ' -f1)

echo $current_port > port.txt

echo "Compiling and uploading your code to the port $current_port from the from the path $current_path"
arduino-cli compile --fqbn arduino:avr:uno $current_path
arduino-cli upload -p $current_port --fqbn arduino:avr:uno $current_path