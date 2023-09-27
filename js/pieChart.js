document.addEventListener("DOMContentLoaded", function() {
    // Sample data for the pie chart
    var data = [
        { category: "Data Validation & Cleaning", value: 10 },
        { category: "Machine Learning", value: 15 },
        { category: "Data Visualization", value: 25 },
        { category: "Data Analytics", value: 50 }
    ];

    // Setting up the SVG canvas dimensions and transform
    var svg = d3.select("#pieChart")
        .append("svg")
        .attr("viewBox", "0 0 500 500")
        .append("g")
        .attr("transform", "translate(250,250)");

    // Color scale for the pie slices
    var color = d3.scaleOrdinal()
        .domain(data.map(d => d.category))
        .range(["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3"]);

    // Defining the pie layout and arcs for the slices and labels
    var pie = d3.pie().value(d => d.value);
    var arc = d3.arc().innerRadius(0).outerRadius(150);
    var labelArc = d3.arc().innerRadius(155).outerRadius(175); // For labels

    // Tooltip for showing the data on hover
    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // Binding data to the SVG elements
    var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");

    // Drawing the pie slices
    g.append("path")
        .attr("d", arc)
        .style("fill", d => color(d.data.category))
        .on("mouseover", function(event, d) {
            var percentage = Math.round(100 * d.data.value / d3.sum(data, d => d.value));
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html(d.data.category + ": " + percentage + "%")
                .style("left", (event.pageX - 50) + "px")
                .style("top", (event.pageY - 60) + "px");
        })
        .on("mouseout", function(d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });

    // Animating the pie slices
    g.selectAll("path")
        .transition()
        .duration(1000)
        .attrTween("d", function(d) {
            var i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
            return function(t) {
                d.endAngle = i(t);
                return arc(d);
            }
        });

    // Adding text labels with increased font size
    g.append("text")
        .attr("transform", function(d) {
            return "translate(" + labelArc.centroid(d) + ")";
        })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .style("font-size", "14px") 
        .text(function(d) { return d.data.category; });
    
    // Adding lines connecting labels to the pie slices
    g.append("line")
        .attr("x1", function(d) { return arc.centroid(d)[0]; })
        .attr("y1", function(d) { return arc.centroid(d)[1]; })
        .attr("x2", function(d) { return labelArc.centroid(d)[0]; })
        .attr("y2", function(d) { return labelArc.centroid(d)[1]; })
        .style("stroke", "black")
        .style("stroke-width", 1.5);
});
