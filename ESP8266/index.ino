//MAX30100 ESP8266 WebServer
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <Wire.h>
#include "MAX30100_PulseOximeter.h"

//#define SDA_PIN 6
//#define SCL_PIN 5
#define REPORTING_PERIOD_MS     1000

float BPM, SpO2;

IPAddress local_IP(192, 168, 90, 215);
// Set your Gateway IP address
IPAddress gateway(192, 168, 1, 1);

IPAddress subnet(255, 255, 0, 0);

/*Put your SSID & Password*/
const char* ssid = "<SSID>";  // Enter SSID here
const char* password = "<password>";  //Enter Password here

PulseOximeter pox;
uint32_t tsLastReport = 0;

ESP8266WebServer server(80);
HTTPClient http;

//Wire.begin(D6, D5);

void setup() {
  Serial.begin(115200);
  pinMode(16, OUTPUT);
  delay(100);

//  Wire.begin(5);

  if (!WiFi.config(local_IP, gateway, subnet)) {
    Serial.println("STA Failed to configure");
  }

  Serial.println("Connecting to ");
  Serial.println(ssid);

  //connect to your local wi-fi network
  WiFi.begin(ssid, password);
  
  //check wi-fi is connected to wi-fi network
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected..!");
  Serial.print("Got IP: ");  Serial.println(WiFi.localIP());
 
  
  server.on("/", handle_OnConnect);
  server.onNotFound(handle_NotFound);

  server.begin();
  Serial.println("HTTP server started");
  
  Serial.print("Initializing pulse oximeter..");

  if (!pox.begin()) {
    Serial.println("FAILED");
    for (;;);
  } else {
    Serial.println("SUCCESS");
    
  }
}
void loop() {
  server.handleClient();
  pox.update();
  if (millis() - tsLastReport > REPORTING_PERIOD_MS) {

    BPM = pox.getHeartRate();
    SpO2 = pox.getSpO2();

    Serial.print("BPM: ");
    Serial.println(BPM);

    Serial.print("SpO2: ");
    Serial.print(SpO2);
    Serial.println("%");

    Serial.println("*********************************");
    Serial.println();
    tsLastReport = millis();
  }

  WiFiClient client;
}

void handle_OnConnect() {
  server.sendHeader("Access-Control-Allow-Origin","*");
  server.send(200, "text/plain", SendHTML(BPM, SpO2));
}

void handle_NotFound() {                                                                                                                                                                                                      
  server.send(404, "text/plain", "Not found");
}

String SendHTML(float BPM, float SpO2) {
  return String(BPM)+" | " + String(SpO2);
}
