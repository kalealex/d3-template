const svgWidth = 960,
    svgHeight = 560,
    margin = { top: 30, right: 30, bottom: 30, left: 30 },
    width = svgWidth - margin.left - margin.right,
    height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#chart-container").append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("cars.csv")
    .then(function (data) {
        console.log(data)
        // plot data...
    })
    .catch(function (err) {
        console.error(err);
    });