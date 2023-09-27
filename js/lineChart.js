document.addEventListener("DOMContentLoaded", function() {

    // Sample data
    var data = [
        { date: "2008-2012", value: 25, labelPosition: "below", position: "Art Institute of Pittsburgh", description: "Bachelor of Science" },
        { date: "2012-2019", value: 27, labelPosition: "below", position: "Bloom Business Solutions", description: "Data Analytical Power BI & Client Relations" },
        { date: "2019-2022", value: 30, labelPosition: "above", position: "Volunteer State College", description: "Computer Science Advanced Studys"},
        { date: "2019-2023", value: 32, labelPosition: "above", position: "Contract Data Analytics", description: "Power BI Development" }
    ];

    // Function that draws the chart
    function drawChart() {
        // Clear out old SVG before drawing a new one to avoid overlap.
        d3.select("#lineChart").html("");

        var containerWidth = d3.select(".chart-container").node().getBoundingClientRect().width;

        var maxLabelLength = Math.max(...data.map(d => d.position.length)) * 6;
        var width = containerWidth > 1000 ? 650 : containerWidth - 40; // Subtracting a little more for padding
        var height = 400;
        var style = getComputedStyle(document.body);
var padding = parseInt(style.getPropertyValue('--chart-padding'), 10); 
// Note: Parsing is required as the value fetched will have 'px' appended.

        var fontSize = containerWidth > 650 ? "10px" : "8px";

        var x = d3.scalePoint()
                  .domain(data.map(d => d.date))
                  .range([padding, width - padding]);


        var y = d3.scaleLinear()
                  .domain([20, 35])
                  .range([height, 0]);

        var line = d3.line()
                     .x(d => x(d.date))
                     .y(d => y(d.value));

        var svg = d3.select("#lineChart")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height);

        svg.append("path")
           .datum(data)
           .attr("class", "line")
           .attr("d", line);

        svg.selectAll("circle")
           .data(data)
           .enter().append("circle")
           .attr("class", "dot")
           .attr("cx", d => x(d.date))
           .attr("cy", d => y(d.value))
           .attr("r", 5);

        function adjustTextAnchor(d, index) {
            if (index === 0) return "start";
            if (index === data.length - 1) return "end";
            return "middle";
        }

        svg.selectAll(".date-label")
           .data(data)
           .enter().append("text")
           .attr("x", d => x(d.date))
           .attr("y", d => d.labelPosition === "above" ? y(d.value) - 15 : y(d.value) + 30)
           .attr("text-anchor", adjustTextAnchor)
           .attr("font-weight", "bold")
           .style("font-size", "12px")
           .text(d => d.date);

        svg.selectAll(".position-label")
           .data(data)
           .enter().append("text")
           .attr("x", d => x(d.date))
           .attr("y", d => d.labelPosition === "above" ? y(d.value) - 30 : y(d.value) + 45)
           .attr("text-anchor", adjustTextAnchor)
           .attr("font-size", fontSize)
           .style("font-size", "12px")
           .text(d => d.position);

        svg.selectAll(".description-label")
           .data(data)
           .enter().append("text")
           .attr("x", d => x(d.date))
           .attr("y", d => d.labelPosition === "above" ? y(d.value) - 45 : y(d.value) + 60)
           .attr("text-anchor", adjustTextAnchor)
           .style("font-size", "10px")
           .text(d => d.description);

    }

    // Initial drawing of the chart
    drawChart();

    // Add an event listener to redraw the chart on window resize
    window.addEventListener("resize", drawChart);
});
