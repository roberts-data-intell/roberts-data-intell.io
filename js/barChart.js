// Sample data
var data = [
    { label: "Learning", value: 75 },
    { label: "Problem Solving", value: 80 },
    { label: "Collaboration", value: 50 },
    { label: "Communication", value: 65 }
];

// Dimensions
var width = 300,
    height = 400,
    margin = { top: 20, right: 20, bottom: 80, left: 40 };

// Create the SVG container
var svg = d3.select("#barChart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Create scales
var x = d3.scaleBand()
    .domain(data.map(d => d.label))
    .range([margin.left, width - margin.right])
    .padding(0.1);

var y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .nice()
    .range([height - margin.bottom, margin.top]);

// Create the tooltip div programmatically
var tooltip = d3.select("body").append("div") 
    .attr("id", "tooltip")
    .attr("class", "tooltip")
    .style("opacity", 0); // set initial opacity to 0

// Draw bars
svg.selectAll("rect")
    .data(data)
    .enter().append("rect")
    .attr("x", d => x(d.label))
    .attr("y", d => y(d.value))
    .attr("width", x.bandwidth())
    .attr("height", d => y(0) - y(d.value))
    .attr("fill", "#69b3a2")
    .on("mouseover", function(event, d) {
        // Change color on hover
        d3.select(this).attr("fill", "#347474");

        // Display a tooltip
        tooltip.transition()
               .duration(200)
               .style("opacity", .9);
        tooltip.html("Value: " + d.value)
               .style("left", (event.pageX + 5) + "px")
               .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function(event, d) {
        d3.select(this).attr("fill", "#69b3a2");
        
        // Hide the tooltip
        tooltip.transition()
            .duration(500)
            .style("opacity", 0);
    });
    

// Add axes
var xAxis = svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

// Angle the labels so they don't overlap
xAxis.selectAll("text")
    .attr("transform", "rotate(-25)")  // Rotate labels by -45 degrees
    .style("text-anchor", "end")  // Anchor end of the text so rotation is around the end of the label
    .style("font-size", "16px")
    .attr("dx", "-0.8em")  // Adjust the x position (optional, tweak for best appearance)
    .attr("dy", "0.5em");  // Adjust the y position (optional, tweak for best appearance)
    

svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

    