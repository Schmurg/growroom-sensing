var timeVar = []; // X Axis Label
var temperatureVar = []; // Value and Y Axis basis
var pressureVar = [];
var humidityVar = [];
var pHVar = [];
var ECVar = [];


$(document).ready(function() {
    var e = document.getElementById("nr_days");
    var days = e.value;
    $.post("database.php", { nr_days: days, type: "pH" },
        function(data) {
            jsData = JSON.parse(data);
            for (var i in jsData) {
                pHVar.push(jsData[i].pH);
                timeVar.push(jsData[i].Time);
            }
            console.log("Parsed " + pHVar.length + " pH...");
            console.log("Latest pH:" + pHVar.pop() + " @ " + timeVar.pop());

            var pHData = [{
                x: timeVar,
                y: pHVar,
                type: 'scatter'
            }];
            for (var ps in pHData) {
                console.log(pHData[ps]);
            }
            console.log(pHData.length);

            Plotly.newPlot(document.getElementById('pH'), pHData, layout);
            Plotly.relayout('pH', layoutpH);
        });

    $.post("database.php", { nr_days: days, type: "Temperature" },
        function(data) {
            timeVar = [];
            jsData = JSON.parse(data);
            for (var i in jsData) {
                temperatureVar.push(jsData[i].Temperature);
                timeVar.push(jsData[i].Time);
            }
            var temperatureData = [{
                x: timeVar,
                y: temperatureVar,
                type: 'scatter'
            }];

            Plotly.newPlot(document.getElementById('temperature'), temperatureData, layout);
            Plotly.relayout('temperature', layoutTemperature);
        });

    $.post("database.php", { nr_days: days, type: "Humidity" },
        function(data) {
            jsData = JSON.parse(data);
            timeVar = [];
            for (var i in jsData) {
                humidityVar.push(jsData[i].Humidity);
                timeVar.push(jsData[i].Time);
            }
            var humidityData = [{
                x: timeVar,
                y: humidityVar,
                type: 'scatter'
            }];

            Plotly.newPlot(document.getElementById('humidity'), humidityData, layout);
            Plotly.relayout('humidity', layoutHumidity);
        });
});

var layout = {
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
        tickfont: {
            family: 'Courier New, monospace',
            size: 14,
            color: 'black'
        }
    },
    font: {
        family: 'Courier New, monospace',
        size: 18,
        color: '#7f7f7f'
    },
    paper_bgcolor: 'black',
    plot_bgcolor: 'black'
};

var layoutpH = {
    title: 'pH',
    font: {
        family: 'Courier New, monospace',
        size: 18,
        color: '#7f7f7f'
    },
    yaxis: {
        title: {
            text: 'pH value',
            font: {
                family: 'Courier New, monospace',
                size: 18,
                color: '#7f7f7f'
            }
        }
    }
};

var layoutTemperature = {
    title: 'Temperature',
    yaxis: {
        title: {
            text: '° C',
            font: {
                family: 'Courier New, monospace',
                size: 18,
                color: '#7f7f7f'
            }
        }
    }
};

var layoutHumidity = {
    title: 'Humidity',
    yaxis: {
        title: {
            text: 'rel. Humidity (%)',
            font: {
                family: 'Courier New, monospace',
                size: 18,
                color: '#7f7f7f'
            }
        }
    }
};