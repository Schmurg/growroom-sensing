# growroom-sensing
Arduino-wired environment sensors (Arduino MKR1000 WiFi) send data to SQL database on webserver in the local network.

The files contain so far:
  o Arduino code that (1) connects to the local network, (2) reads data from simple sensors, (3) connects to a local server in order to (4) send an HTTP request with the data to the server
  o PHP code that (1) adds a row of sensing data to a local database and (2) reads out the database for display
  o JS code that (1) calls a PHP script to deliver sensing data and (2) plot the data into an HTML div
  o HTML code that (1) displays sensing data in the browser
