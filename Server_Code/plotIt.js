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
            console.log("Still here!");
            for (var ps in pHData) {
                console.log(pHData[ps]);
            }
            console.log(pHData.length);

            Plotly.newPlot(document.getElementById('pH'), pHData, layout);
            Plotly.relayout('pH', layoutpH);
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
    }
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
        }
    }
};