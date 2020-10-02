var timeVar = []; // X Axis Label 
var BMEtemperatureVar = []; // Value and Y Axis basis
var BMEpressureVar = [];
var BMEhumidityVar = [];
var pHVar = [];
var runVar;

$(document).ready(function () {
    $.post("database.php",
        function (data){
            //console.log(data);
            jsData = JSON.parse(data);
            runVar = jsData[0].Run;
            for (var i in jsData) {
                // temperature, pressure, humidity, and time are taken from JSON output (see above)
                BMEtemperatureVar.push(jsData[i].Temperature);
                BMEhumidityVar.push(jsData[i].Humidity);
                BMEpressureVar.push(jsData[i].Pressure);
                pHVar.push(jsData[i].pH);
                timeVar.push(jsData[i].Time);
                }
            var BMEtemperaturePlotData = [
              {
                x: timeVar,
                y: BMEtemperatureVar,
                type: 'scatter'
              }
            ];
            var pHPlotData = [
              {
                x: timeVar,
                y: pHVar,
                mode: 'markers', 
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
            var layoutBMETemperature = {
                title: 'Temperature'
            };
            var layoutpH = {
                title: 'pH',
                yaxis: {
                    title: {
                      text: 'pH value',
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
            var layoutBMEHumidity = {
                title: 'Humidity',
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
                title: 'Pressure',
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
                    },
                    tickformat: ',d'
                  }
            };

            Plotly.newPlot('BMEtemperature', BMEtemperaturePlotData, layout);
            Plotly.relayout('BMEtemperature', layoutBMETemperature);
            Plotly.newPlot('pH', pHPlotData, layout);
            Plotly.relayout('pH', layoutpH);            
            Plotly.newPlot('BMEpressure', BMEpressurePlotData, layout);
            Plotly.relayout('BMEpressure', layoutBMEPressure);
            Plotly.newPlot('BMEhumidity', BMEhumidityPlotData, layout);
            Plotly.relayout('BMEhumidity', layoutBMEHumidity);
        });
});

