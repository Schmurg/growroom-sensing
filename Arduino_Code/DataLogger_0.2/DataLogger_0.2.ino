/***
 * Much of the following code is taken from an Adafruit library overwritten with 
 * 
 * """
 * This is a library for the BME280 humidity, temperature & pressure sensor

  Designed specifically to work with the Adafruit BME280 Breakout
  ----> http://www.chmodadafruit.com/products/2650  [...]
 * """"
 */

#include <Wire.h>
#include <SPI.h>
#include <WiFi101.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>

// SECRETS.h defines int HTTP_PORT, char HOST_NAME[], char ssid[], and char pass[] 
#include "SECRETS.h"

/**
Yet to be used...
**/
// Pin Po of the pH board connects to A0 (in the future)
// #define PIN_PH_Po A0

#define BME_SCK 12
#define BME_MISO 10
#define BME_MOSI 11 
#define BME_CS 9


int status = WL_IDLE_STATUS;  

WiFiClient client;

Adafruit_BME280 bme(BME_CS, BME_MOSI, BME_MISO,  BME_SCK);



void setup()
{
  Serial.begin(9600);
  delay(1500);
/***
 * Here we initialise the BME280 sensor. 
 */
unsigned BME_status;
    
// Default settings with address 0x76
BME_status = bme.begin(0x76);  
if (!BME_status) {
  // If the sensor could not be initialised the setup nevertheless continues.
    Serial.println("Could not find a valid BME280 sensor!");
    Serial.print("SensorID: 0x"); Serial.println(bme.sensorID(),16);
    }
if(BME_status){Serial.println("Sensor seems to work.");}
/*
 * Done initialising the BME280 sensor
 ***/
  
/***  
 * Attempt to connect to Wifi network. This loop terminates only upon successful connection with the network since 
 * the operation loop is pointless without Wifi connection. 
 */ 
  while (status != WL_CONNECTED) {
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    status = WiFi.begin(ssid, pass);

    // Wait 10 seconds for connection:
    delay(10000);
  }
  // Connected now, print out the status:
  printWifiStatus();
}


void loop () { 
  /* In the loop, data is saved in the database via HTTP request. 
  If there is no connection with the network, a new connection is established with WiFI.begin()  */

  // Check if we're connected to the network, if not enter connection loop.
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print("Lost connection to network. Attempting to reconnect to SSID: ");
    Serial.println(ssid);

    // Establish new connection with network.
    WiFi.begin(ssid, pass);
    // Wait 10 seconds before continuing or re-attempting to establish a connection with the network:
    delay(10000);
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
    client.print("GET /addrow.php?Run=GettingThere");
    // The value of 'Run' is hard-coded here!!!

    client.print("&BME_Temperature=");
    client.print(bme.readTemperature());
    client.print("&BME_Humidity=");
    client.print(bme.readHumidity());
    client.print("&BME_Pressure=");
    client.print(bme.readPressure()/100.0F);
    client.println(" HTTP/1.1");
    client.println("Host: " + String(HOST_NAME));
    client.println("Connection: close");
    client.println(); // end HTTP header
    
    client.stop();
    delay(60000);
  }
}


void printWifiStatus() {
  // print the SSID of the network you're attached to:
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // print your WiFi shield's IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);

  // print the received signal strength:
  long rssi = WiFi.RSSI();
  Serial.print("signal strength (RSSI):");
  Serial.print(rssi);
  Serial.println(" dBm");
}
