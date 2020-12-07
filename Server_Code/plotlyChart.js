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
    console.log("Ready!");
    $.post("database.php", { nr_days: days, type: "Temperature" },
        function(data) {
            jsData = JSON.parse(data);
            for (var i in jsData) {
                // temperature, pressure, humidity, and time are taken from JSON output (see above)
                temperatureVar.push(jsData[i].Temperature);
                timeVar.push(jsData[i].Time);
            }
            console.log("Parsed " + temperatureVar.length + " temperature...");
            console.log("Latest temperature:" + temperatureVar.pop() + " @ " + timeVar.pop());
        });

    var temperaturePlotData = [{
        x: timeVar,
        y: temperatureVar,
        type: 'scatter'
    }];
    var layout = {
        title: {
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


    //Plotly.newPlot('temperature', temperaturePlotData, layout);
    //Plotly.relayout('temperature', layoutTemperature);

    timeVar = []; // reset time variable
    $.post("database.php", { nr_days: days, type: "Humidity" },
        function(data) {
            jsData = JSON.parse(data);
            for (var i in jsData) {
                // temperature, pressure, humidity, and time are taken from JSON output (see above)
                humidityVar.push(jsData[i].Humidity);
                timeVar.push(jsData[i].Time);
            }
            console.log("Parsed humidity...");
        });

    var humidityPlotData = [{
        x: timeVar,
        y: humidityVar,
        type: 'scatter'
    }];

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
    //Plotly.newPlot('humidity', humidityPlotData, layout);
    //Plotly.relayout('humidity', layoutHumidity);

    timeVar = []; // reset time variable
    $.post("database.php", { nr_days: days, type: "pH" },
        function(data) {
            jsData = JSON.parse(data);
            for (var i in jsData) {
                pHVar.push(jsData[i].pH);
                timeVar.push(jsData[i].Time);
            }
            console.log("Parsed " + pHVar.length + " pH...");
            console.log("Latest pH:" + pHVar.pop() + " @ " + timeVar.pop());
        });
    var pHPlotData = [{
        x: timeVar,
        y: pHVar,
        mode: 'markers',
        type: 'scatter'
    }];
    console.log("Still here!");
    console.log("pHPlotData: " + pHPlotData.pop());

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

    Plotly.newPlot('pH', pHPlotData, layout);
    Plotly.relayout('pH', layoutpH);

});