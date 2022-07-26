// !preview r2d3 data=dat2, d3_version=4
// 
// r2d3: https://rstudio.github.io/r2d3
//

var margin = {top: 40, right:50, bottom: 100, left: 70},
  width = 800 - margin.left -margin.right,
  height = 400 - margin.top - margin.bottom;

var formatDate = d3.timeParse("%Y-%m-%d");

// Defining the axes
var x = d3.scaleTime()
  .domain([formatDate("2006-11-31"), formatDate("2010-11-31")])
  .range([margin.left, width]);
svg.append("g")
  .attr("transform", "translate(" + 0 + "," + height + ")")
  .call(d3.axisBottom(x));
y = d3.scaleLinear()
    .range([height, margin.top])
    .domain([0, 5000]);
svg.append("g")
  .attr("transform", "translate("+margin.left + "," + 0 + ")")
  .call(d3.axisLeft(y));

// Plotting the time series as a line plot
svg.append("path") 
  .datum(data)
  .attr("fill", "none")
  .attr("stroke", "pink")
  .attr("stroke-width", 1)
  .attr("d", d3.line()
    .x(function(d) {return x(formatDate(d.Date));}) 
    .y(function(d) {return y(d.daily_total_electric_consumption);}))


    
// labels for title 
svg.append("text")
        .attr("x", (width / 1.88))             
        .attr("y",(margin.top/2))
        .attr("text-anchor", "middle")  
        .style("font-size", "22px") 
        .style("text-decoration", "underline")  
        .text("Global Active Electric Consumption");
        
// label for x axis 
svg.append("text")
    .attr("class", "x label") 
    .attr("text-anchor", "end") 
    .attr("x", width) 
    .attr("y", height + 35) 
    .text("Date"); 
    
// label for y axis 
svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 6)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Daily Total consumption");


