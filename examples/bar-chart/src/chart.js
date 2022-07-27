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
        console.log(data);
        
        // reformat data
        let plotData = [];
        data.forEach((obj) => {
            let uniqueCyl = plotData.reduce((prev, curr) => (prev && curr.cyl != obj.cyl), true);
            if (uniqueCyl) {
                plotData.push({
                    "cyl": +obj.cyl,
                    "count": 1
                });
            } else {
                let cylIdx = plotData.findIndex((elem) => elem.cyl == +obj.cyl);
                plotData[cylIdx].count++;
            }
        });
        plotData = plotData.sort((a, b) => a.cyl - b.cyl);
        console.log(plotData);

        // set up scales
        let xScale = d3.scaleBand()
                .domain(plotData.map((d) => d.cyl))
                .range([0, width])
                .padding(0.1),
            yScale = d3.scaleLinear()
                .domain([0, d3.max(plotData, (d) => d.count)])
                .range([height, 0]);

        // render bars
        svg.selectAll("rect")
            .data(plotData)
            .join("rect")
            .attr("class", "bar")
            .attr("x", (d) => xScale(d.cyl))
            .attr("y", (d) => yScale(d.count))
            .attr("width", xScale.bandwidth())
            .attr("height", (d) => height - yScale(d.count))
            .attr("fill", "steelblue");

        // add axes
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale));
        svg.append("g")
            .call(d3.axisLeft(yScale));
        
    })
    .catch(function (err) {
        console.error(err);
    });