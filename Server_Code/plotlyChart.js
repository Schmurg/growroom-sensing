var timeVar = []; // X Axis Label
var temperatureVar = []; // Value and Y Axis basis
var pressureVar = [];
var humidityVar = [];
var pHVar = [];
var ECVar = [];
var runVar;

var eventTimeVar = [];
var eventText = [];


$(document).ready(function() {
    var e = document.getElementById("nr_days");
    var days = e.value;
    $.post("database.php", { nr_days: days },
        function(data) {
            jsData = JSON.parse(data);
            runVar = jsData[0].Run;
            for (var i in jsData) {
                // temperature, pressure, humidity, and time are taken from JSON output (see above)
                temperatureVar.push(jsData[i].Temperature);
                humidityVar.push(jsData[i].Humidity);
                pressureVar.push(jsData[i].Pressure);
                pHVar.push(jsData[i].pH);
                ECVar.push(jsData[i].EC);
                if (jsData[i].EventType) {
                    eventTimeVar.push(jsData[i].Time);
                    eventText.push('Type: ' + jsData[i].EventType + '\n Description: ' + jsData[i].EventDescription);
                }
                timeVar.push(jsData[i].Time);
            }
            var temperaturePlotData = [{
                x: timeVar,
                y: temperatureVar,
                type: 'scatter'
            }];
            var pHPlotData = [{
                x: timeVar,
                y: pHVar,
                mode: 'markers',
                type: 'scatter'
            }];
            var ECPlotData = [{
                x: timeVar,
                y: ECVar,
                mode: 'markers',
                type: 'scatter'
            }];
            var humidityPlotData = [{
                x: timeVar,
                y: humidityVar,
                type: 'scatter'
            }];
            var pressurePlotData = [{
                x: timeVar,
                y: pressureVar,
                type: 'scatter'
            }];

            var eventPlotData = [{
                x: eventTimeVar,
                y: Array.from('1'.repeat(eventTimeVar.length)),
                //hovertemplate:
                mode: 'markers',
                marker: { size: 13 },
                text: eventText,
                type: 'scatter'
            }];

            var layout = {
                title: {
                    text: 'Sensor Data (Run: ' + runVar + ')',
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
                title: 'Temperature',
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
            var layoutEC = {
                title: 'EC',
                yaxis: {
                    title: {
                        text: 'EC value',
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
            var layoutHumidity = {
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
            var layoutPressure = {
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

            var layoutEvent = {
                title: 'Events',
                yaxis: {
                    title: {
                        text: 'pH value',
                        font: {
                            family: 'Courier New, monospace',
                            size: 18,
                            color: '#7f7f7f'
                        }
                    },
                    showgrid: false,
                    visible: false
                }
            };



            Plotly.newPlot('temperature', temperaturePlotData, layout);
            Plotly.relayout('temperature', layoutTemperature);
            Plotly.newPlot('pH', pHPlotData, layout);
            Plotly.relayout('pH', layoutpH);
            Plotly.newPlot('EC', ECPlotData, layout);
            Plotly.relayout('EC', layoutEC);
            Plotly.newPlot('pressure', pressurePlotData, layout);
            Plotly.relayout('pressure', layoutPressure);
            Plotly.newPlot('humidity', humidityPlotData, layout);
            Plotly.relayout('humidity', layoutHumidity);

            Plotly.newPlot('event', eventPlotData, layout);
            Plotly.relayout('event', layoutEvent);
        });
});