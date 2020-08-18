#include <Wire.h>
#include <SPI.h>
#include <WiFi101.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>


#define PIN_TEMP A0
#define BME_SCK 12
#define BME_MISO 10
#define BME_MOSI 11 
#define BME_CS 9

int    HTTP_PORT   = 80;
char   HOST_NAME[] = "hamilton";

char ssid[] = "DoorsOfPerception";
char pass[] = "8492273584017762";
int status = WL_IDLE_STATUS;  

WiFiClient client;

Adafruit_BME280 bme(BME_CS, BME_MOSI, BME_MISO,  BME_SCK);



void setup()
{
  pinMode(PIN_TEMP, INPUT);

  Serial.begin(9600);
  delay(1500);
/***
 * Here we initialise the BME280 sensor. 
 */
unsigned BME_status;
    
// default settings
BME_status = bme.begin(0x76);  
// You can also pass in a Wire library object like &Wire2
// BME_status = bme.begin(0x76, &Wire2)
if (!BME_status) {
    Serial.println("Could not find a valid BME280 sensor, check wiring, address, sensor ID!");
    Serial.print("SensorID was: 0x"); Serial.println(bme.sensorID(),16);
    Serial.print("        ID of 0xFF probably means a bad address, a BMP 180 or BMP 085\n");
    Serial.print("   ID of 0x56-0x58 represents a BMP 280,\n");
    Serial.print("        ID of 0x60 represents a BME 280.\n");
    Serial.print("        ID of 0x61 represents a BME 680.\n");
    while (1) delay(10);
    }
if(BME_status){Serial.print("Sensor seems to work. BME_Temperature = ");Serial.println(bme.readTemperature());}
/*
 * Done initialising the BME280 sensor
 ***/
  
  // Attempt to connect to Wifi network. This loop terminates only upon successful connection with the network.
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
    client.print("GET /addrow.php?Temperature=");
    client.print(get_temperature());
    //*** The value of 'Run' is hard-coded here 
    client.print("&Run=GettingThere");
    //***
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
    delay(10000);
  }
}

float get_temperature(){ 
  int reading = analogRead(PIN_TEMP);   
  float voltage = reading * 3.3; 
  voltage /= 1024.0;  
  // Print temperature in Celsius 
  float temperatureC = (voltage - 0.5) * 100 ; //converting from 10 mv per degree wit 500 mV offset 
  return temperatureC; 
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
