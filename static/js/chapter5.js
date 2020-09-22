var svg = 
d3.select("#chart")
  .append("svg")
  .attr("width", 600)
  .attr("height", 500)
  .style("margin-left", 10);

var tooltip = d3
  .select("body")
  .append("div")
  .style("position", "absolute")
  .style("padding-left", "10px")
  .style("padding-right", "10px")
  .style("font-size", "15px")
  .style("border-width", "1px");


var margin = { top: 20, right: 100, bottom: 350, left: 30 };
var graphWidth = 700 - margin.left - margin.right;
var graphHeight = 650 - margin.top - margin.bottom;


var graph = svg
  .append("g")
  .attr("width", graphWidth)
  .attr("height", graphHeight)
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

var xAxisGroup = graph
  .append("g")
  .attr("transform", `translate(0, ${graphHeight})`);
var yAxisGroup = graph.append("g");


d3.json("hw3data.json").then((data) => {
  var y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.students)])
    .range([graphHeight, 0]);

  var x = d3
    .scaleBand()
    .domain(data.map((item) => item.term))
    .range([0, graphWidth])
    .padding(0.2);

  var rects = graph.selectAll("rect").data(data);

  rects
    .enter()
    .append("rect")
    .attr("width", x.bandwidth)
    .attr("height", (d) => graphHeight - y(d.students))
    .attr("x", (d) => x(d.term))
    .attr("y", (d) => y(d.students))

    .on("mouseover", function (d) {
      tooltip.transition().style("background", '#d4cdb3');
      tooltip
        .html(d.students)
        .style("left", d3.event.pageX - 45 + "px")
        .style("top", d3.event.pageY - 40 + "px");
    })
    .on("mouseout", function (d) {
      d3.select(this).style("opacity", 1);
    });

  var xAxis = d3.axisBottom(x);
  // var yAxis = d3.axisLeft(y);
  xAxisGroup.call(xAxis);
  // yAxisGroup.call(yAxis);
});



