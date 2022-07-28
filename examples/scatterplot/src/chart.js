const svgWidth = 800,
    svgHeight = 560,
    margin = { top: 30, right: 30, bottom: 60, left: 60 },
    width = svgWidth - margin.left - margin.right,
    height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#chart-container").append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("cars.csv")
    .then(function (data) {
        console.log(data);

        // cast strings as numbers
        for (let i = 0; i < data.length; i++) {
            data[i].hp = +data[i].hp;
            data[i].mpg = +data[i].mpg;
        }

        // create scales
        let xScale = d3.scaleLinear()
                .domain(d3.extent(data, (d) => d.hp))
                .range([0, width]), 
            yScale = d3.scaleLinear()
                .domain(d3.extent(data, (d) => d.mpg))
                .range([height, 0]);

        // create our axes
        let xAxis = svg.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(xScale));
        let yAxis = svg.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(yScale));

        // label our axes
        xAxis.append("text")
            .attr("class", "label")
            .attr("transform", `translate(${width / 2}, 40)`)
            .text("Horsepower")
        yAxis.append("text")
            .attr("class", "label")
            .attr("transform", `translate(-40, ${2 * height / 5}) rotate(-90)`)
            .text("Miles per gallon")

        // plot data
        let points = svg.selectAll("circle")
            .data(data)
            .join("circle")
            .attr("cx", (d) => xScale(d.hp))
            .attr("cy", (d) => yScale(d.mpg))
            .attr("r", 5);
    })
    .catch(function (err) {
        console.error(err);
    });