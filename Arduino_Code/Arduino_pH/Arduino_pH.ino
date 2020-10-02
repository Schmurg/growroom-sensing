/*
 # This sample code is used to test the pH meter V1.0.
 # Editor : YouYou
 # Ver    : 1.0
 # Product: analog pH meter
 # SKU    : SEN0161
*/
#include <WiFi101.h>
#include "SECRETS.h"
#include <OneWire.h>
#include <DallasTemperature.h>

// Data wire is connected to digital pin 14
#define ONE_WIRE_BUS 14

#define SensorPin A0            //pH meter Analog output to Arduino Analog Input 0
#define ArrayLength  40    //times of collection

int pHArray[ArrayLength];   //Store the average value of the sensor feedback
int pHArrayIndex;
int timeBetweenSamples = 100;
int attempt;
int maxAttempts = 10;

int status = WL_IDLE_STATUS; 
WiFiClient client;

// Setup a oneWire instance to communicate with any OneWire devices
OneWire oneWire(ONE_WIRE_BUS);

// Pass the oneWire reference to the temperature sensor 
DallasTemperature sensors(&oneWire);


      /***
       * CALIBRATING THE PH SENSOR
       *          
       * We get a smoothed out voltage from the probe and need to convert it to a pH value. For this we need calibration (see https://www.e-tinkers.com/2019/11/measure-ph-with-a-low-cost-arduino-ph-sensor-board/).
       * We assume a linear relationship between voltage and pH. Therefore we can calculate the pH of any voltage once we calculated
       * the slope of the graph using the values of the function at two points. We do this reversely: We have liquids with pH 4 (call its
       * pH value pH4) and pH 7 (with pH value pH7), and measure the voltage signal for these, say V_pH4 and V_pH7, resp.
       * The slope a is given by
       *        a = (pH4 - pH7) / (V_pH4 - V_pH7).
       * To calculate a in setup(), plug in the values we measured for the calibration liquids.
       * To calculate 
       */

float pH4, pH7, V_pH4, V_pH7, a;
float pHValue, voltage;


void setup(void)
{
  pinMode(SensorPin,INPUT);
  Serial.begin(9600);
  delay(1500);

  // Start the temperature sensor
  sensors.begin();
  /***
   *    The following values need to be provided by calibration!!!
   */
  pH4 = 4;
  pH7 = 7;
  V_pH7 = 3.1;
  V_pH4 = 1; // old: 0.9

  a = (pH4 - pH7) / (V_pH4 - V_pH7);
}
void loop(void)
{
  pHArrayIndex = 0;
  while(pHArrayIndex < ArrayLength)
  {
    pHArray[pHArrayIndex]=analogRead(SensorPin);
    pHArrayIndex++;
    delay(timeBetweenSamples);
  }
  voltage = averageArray(pHArray, ArrayLength)*5.0/1024; // These factors cancel, this can be written more simple!
      /***
       * We have the voltage and calculate the pH according to the following equation:
       *        pHValue = a * (voltage-V_pH7) + pH7
       */
  pHValue = a * (voltage-V_pH7) + pH7;
  Serial.print("Voltage:");
  Serial.print(voltage,2);// Serial.print(voltage, 2) prints 2 decimal places
  Serial.print("    pH value: ");
  Serial.println(pHValue,2);

  // Call sensors.requestTemperatures() to issue a global temperature request to all devices on the bus
  sensors.requestTemperatures(); 
  Serial.print("Temperature: ");
  Serial.print(sensors.getTempCByIndex(0));
  Serial.println(" ºC");
  
  if(Serial.read() == 115){// 115 is the encoding of the letter 's' as int
    writeDB(pHValue);
    }
  else{
    Serial.println();
    Serial.println("***   Press \'s\' to save pH value to database.   ***");
    Serial.println();
    }
}


void writeDB(float pHvalue){
  // Attempt to connect to network maxAttempts times.
  attempt = 0;
  while (WiFi.status() != WL_CONNECTED && attempt < maxAttempts) {
    Serial.print("No connection to network. Attempting to connect to SSID: ");
    Serial.println(ssid);

    // Establish connection with network.
    WiFi.begin(ssid, pass);
    // Wait 10 seconds before continuing or re-attempting to establish a connection with the network:
    delay(2000);
    attempt++;
  }
  // Return if connection with WiFi cannot be established in maxAttempts.
  if (WiFi.status() != WL_CONNECTED){
    Serial.println("Could not connect to WiFi!");
    return;
  }
  else{ // In that case send data to database with HTTP request.
    if(client.connect(HOST_NAME, HTTP_PORT)) {
      // if connected:
      Serial.println("Connected to server");
      // make a HTTP request:
      // send HTTP header
      client.print("GET /addrow.php?Run=GettingThere&Location=Mother");
      // The value of 'Run' and 'Location' are hard-coded here!!!
        
      client.print("&pH=");
      client.print(pHvalue);
      client.println(" HTTP/1.1");
      client.println("Host: " + String(HOST_NAME));
      client.println("Connection: close");
      client.println(); // end HTTP header
      
      client.stop();
      Serial.println();
      Serial.println("***   Data sent to server.   ***");
    }
  }
}

double averageArray(int* arr, int number){
  int i;
  int max,min;
  double avg;
  long amount=0;
  if(number<=0){
    Serial.println("Error number for the array to avraging!/n");
    return 0;
  }
  if(number<5){   //less than 5, calculated directly statistics
    for(i=0;i<number;i++){
      amount+=arr[i];
    }
    avg = amount/number;
    return avg;
  }else{
    if(arr[0]<arr[1]){
      min = arr[0];max=arr[1];
    }
    else{
      min=arr[1];max=arr[0];
    }
    for(i=2;i<number;i++){
      if(arr[i]<min){
        amount+=min;        //arr<min
        min=arr[i];
      }else {
        if(arr[i]>max){
          amount+=max;    //arr>max
          max=arr[i];
        }else{
          amount+=arr[i]; //min<=arr<=max
        }
      }//if
    }//for
    avg = (double)amount/(number-2);
  }//if
  return avg;
}
