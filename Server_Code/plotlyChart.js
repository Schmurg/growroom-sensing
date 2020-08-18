var timeVar = []; // X Axis Label
var temperatureVar = []; // Value and Y Axis basis
var BMEtemperatureVar = [];
var BMEpressureVar = [];
var BMEhumidityVar = [];
var runVar;

$(document).ready(function () {
    $.post("database.php",
        function (data){
            //console.log(data);
            jsData = JSON.parse(data);
            runVar = jsData[0].Run;
            for (var i in jsData) {
                // temperature and time are taken from JSON output (see above)
                temperatureVar.push(jsData[i].Temperature);
                BMEtemperatureVar.push(jsData[i].BME_Temperature);
                BMEhumidityVar.push(jsData[i].BME_Humidity);
                BMEpressureVar.push(jsData[i].BME_Pressure);
                timeVar.push(jsData[i].Time);
                //console.log(jsData[i].Time);
                //console.log(jsData[i].Temperature);
            }
            var temperaturePlotData = [
              {
                x: timeVar,
                y: temperatureVar,
                type: 'scatter'
              }
            ];
            var BMEtemperaturePlotData = [
              {
                x: timeVar,
                y: BMEtemperatureVar,
                type: 'scatter'
              }
            ];
            var BMEhumidityPlotData = [
              {
                x: timeVar,
                y: BMEhumidityVar,
                type: 'scatter'
              }
            ];
            var BMEpressurePlotData = [
              {
                x: timeVar,
                y: BMEpressureVar,
                type: 'scatter'
              }
            ];

            //console.log(timeVar);

            var layout = {
              title: {
                text:'Sensor Data (Run: '+runVar+')',
                font: {
                  family: 'Courier New, monospace',
                  size: 24
                },
                xref: 'paper',
                x: 0.05,
              },
              xaxis: {
                title: {
                  text: 'Time',
                  font: {
                    family: 'Courier New, monospace',
                    size: 18,
                    color: '#7f7f7f'
                  }
                },
                tickfont: {
                      family: 'Courier New, monospace',
                      size: 14,
                      color: 'black'
                    }
              },
              yaxis: {
                title: {
                  text: 'Temperature',
                  font: {
                    family: 'Courier New, monospace',
                    size: 18,
                    color: '#7f7f7f'
                  }
                },
                tickfont: {
                    family: 'Courier New, monospace',
                    size: 14,
                    color: 'black'
                }
              }
            };
            var layoutTemperature = {
                title: 'Temperature'
            };
            var layoutBMETemperature = {
                title: 'Temperature (BME)'
            };
            var layoutBMEHumidity = {
                title: 'Humidity (BME)',
                yaxis: {
                    title: {
                      text: 'Rel. humidity (%)',
                      font: {
                        family: 'Courier New, monospace',
                        size: 18,
                        color: '#7f7f7f'
                      }
                    },
                    tickfont: {
                        family: 'Courier New, monospace',
                        size: 14,
                        color: 'black'
                    }
                  }
            };
            var layoutBMEPressure = {
                title: 'Pressure (BME)',
                yaxis: {
                    title: {
                      text: 'Atm. pressure',
                      font: {
                        family: 'Courier New, monospace',
                        size: 18,
                        color: '#7f7f7f'
                      }
                    },
                    tickfont: {
                        family: 'Courier New, monospace',
                        size: 14,
                        color: 'black'
                    }
                  }
            };

            Plotly.newPlot('temperature', temperaturePlotData, layout);
            Plotly.relayout('temperature', layoutTemperature);
            Plotly.newPlot('BMEtemperature', BMEtemperaturePlotData, layout);
            Plotly.relayout('BMEtemperature', layoutBMETemperature);
            Plotly.newPlot('BMEpressure', BMEpressurePlotData, layout);
            Plotly.relayout('BMEpressure', layoutBMEPressure);
            Plotly.newPlot('BMEhumidity', BMEhumidityPlotData, layout);
            Plotly.relayout('BMEhumidity', layoutBMEHumidity);
        });
});

