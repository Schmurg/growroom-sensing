/*
 *  This sketch demonstrates how to scan WiFi networks.
 *  The API is almost the same as with the WiFi Shield library,
 *  the most obvious difference being the different file you need to include:
 */
#include "WiFi.h"
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>

#include "SECRETS.h"

Adafruit_BME280 bme;
WiFiClient client;


void setup()
{
    Serial.begin(9600);
    delay(1500);
    
    // Set WiFi to station mode and disconnect from an AP if it was previously connected
    WiFi.mode(WIFI_STA);
    WiFi.disconnect();
    delay(100);

    if (!bme.begin(0x76)) {
      Serial.println("Could not find a valid BME280 sensor, check wiring!");
      while (1);
    }

    /***  
 * Attempt to connect to Wifi network. This loop terminates only upon successful connection with the network since 
 * the operation loop is pointless without Wifi connection. 
 */ 
  while (WiFi.begin(ssid, pass) != WL_CONNECTED) {
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    
    // Wait 3 seconds for connection:
    delay(3000);
  }
  Serial.println("Connected!");
}

void loop()
{
  /* In the loop, data is saved in the database via HTTP request. 
  If there is no connection with the network, a new connection is established with WiFI.begin()  */

  // Check if we're connected to the network, if not enter connection loop.
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print("Lost connection to network. Attempting to reconnect to SSID: ");
    Serial.println(ssid);

    // Establish new connection with network.
    WiFi.begin(ssid, pass);
    // Wait 3 seconds before continuing or re-attempting to establish a connection with the network:
    delay(3000);
  }
    /*** Establish connection with server and send HTTP request upon connection.
   *  
   *  The data read from the sensors is send to the script addrow.php on the server via the HTTP request, e.g.:
   *        
   *        hamilton/addrow.php?Temperature=23.4&Humidity=65
   *  
   */
  if(client.connect(HOST_NAME, HTTP_PORT)) {
    // if connected:
    Serial.println("Connected to server");
    // make a HTTP request:
    // send HTTP header
    client.print("GET /addrow.php?Run=No1");
    client.print("&Location=girls");
    // The value of 'Run' and 'Location' is hard-coded here!!!

    client.print("&Temperature=");
    client.print(bme.readTemperature());
    client.print("&Humidity=");
    client.print(bme.readHumidity());
    client.print("&Pressure=");
    client.print(bme.readPressure()/100.0F);
    client.println(" HTTP/1.1");
    client.println("Host: " + String(HOST_NAME));
    client.println("Connection: close");
    client.println(); // end HTTP header
    
    client.stop();
  }
  else{
    Serial.print("Couldn't connect to ");
    Serial.println(HOST_NAME);
  }
  // Wait a bit before sensing again
  printValues();
  // Wait 5 minutes, so data points are 5 minutes apart. 
  delay(0.5*60000);
}


void printValues() {
  Serial.print("Temperature = ");
  Serial.print(bme.readTemperature());
  Serial.println(" *C");
   
  Serial.print("Pressure = ");
  Serial.print(bme.readPressure() / 100.0F);
  Serial.println(" hPa");

  Serial.print("Humidity = ");
  Serial.print(bme.readHumidity());
  Serial.println(" %");

  Serial.println();
}
