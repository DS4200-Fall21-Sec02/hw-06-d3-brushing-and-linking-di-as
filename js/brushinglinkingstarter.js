var margin = { top: 10, right: 30, bottom: 50, left: 60 },
    width = 400 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

// append svg object to the body of the page to house Scatterplot 1
var svg1 = d3
.select("#dataviz_brushScatter")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// append svg object for scatterplot 2
var svg2 = d3
.select("#dataviz_brushScatter2")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var svg3 = d3
.select("#dataviz_brushBar")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom);



// Define color scale
var color = d3
.scaleOrdinal()
.domain(["setosa", "versicolor", "virginica"])
.range(["#FF7F50", "#21908dff", "#fde725ff"]);

// Read data and make plots
d3.csv("data/iris.csv").then((data) => {

  //Scatterplot 1
  {
    var xKey1 = "Sepal_Length";
    var yKey1 = "Petal_Length";

    //Add X axis
    var x1 = d3
    .scaleLinear()
    .domain(d3.extent(data.map((val) => val[xKey1])))
    .range([0, width]);
    svg1
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x1))
    .call((g) =>
        g
        .append("text")
        .attr("x", width)
        .attr("y", margin.bottom - 4)
        .attr("fill", "currentColor")
        .attr("text-anchor", "end")
        .text(xKey1)
    );

    //Add Y axis
    var y1 = d3
    .scaleLinear()
    .domain(d3.extent(data.map((val) => val[yKey1])))
    .range([height, 0]);
    svg1
    .append("g")
    .call(d3.axisLeft(y1))
    .call((g) =>
        g
        .append("text")
        .attr("x", -margin.left)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text(yKey1)
    );

    // Add dots
    var myCircle1 = svg1
    .append("g")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("id", (d) => d.id)
    .attr("cx", function (d) {
      return x1(d[xKey1]);
    })
    .attr("cy", function (d) {
      return y1(d[yKey1]);
    })
    .attr("r", 8)
    .style("fill", function (d) {
      return color(d.Species);
    })
    .style("opacity", 0.5);

    //TODO: Define a brush
    var brush1 = d3.brush()
    .extent([[0,0], [width, height]])
    .on("start brush", updateChart1)


    //TODO: Add brush to the svg
    svg1.call(brush1)
  }

  // scatterplot 2
  {
    var xKey2 = "Sepal_Width";
    var yKey2 = "Petal_Width";

    //Add X axis
    var x2 = d3
    .scaleLinear()
    .domain(d3.extent(data.map((val) => val[xKey2])))
    .range([0, width]);
    svg2
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x2))
    .call((g) =>
        g
        .append("text")
        .attr("x", width)
        .attr("y", margin.bottom - 4)
        .attr("fill", "currentColor")
        .attr("text-anchor", "end")
        .text(xKey2)
    );

    //Add Y axis
    var y2 = d3
    .scaleLinear()
    .domain(d3.extent(data.map((val) => val[yKey2])))
    .range([height, 0]);
    svg2
    .append("g")
    .call(d3.axisLeft(y2))
    .call((g) =>
        g
        .append("text")
        .attr("x", -margin.left)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text(yKey2)
    );

    // Add dots
    var myCircle2 = svg2
    .append("g")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("id", (d) => d.id)
    .attr("cx", function (d) {
      return x2(d[xKey2]);
    })
    .attr("cy", function (d) {
      return y2(d[yKey2]);
    })
    .attr("r", 8)
    .style("fill", function (d) {
      return color(d.Species);
    })
    .style("opacity", 0.5);


    // TODO define brush
    // Assistance from https://bl.ocks.org/mbostock/34f08d5e11952a80609169b7917d4172
    var brush2 = d3.brush()
    .extent([[0,0], [width, height]])
    .on("start brush", updateChart2)

    //TODO: Add brush to the svg
    svg2.call(brush2)


  }

  // Bar chart
  {

    var data_bar = [
      {species: "setosa", count: 50},
      {species: "versicolor", count: 50},
      {species: "virginica", count: 50}];

    //var xKey = "Species";
    // Y Scale

    // Find max Y value
    let maxY = 75;

    // Create the scale. We use linear,
    //  because we have quantitative data and
    //  want to map it to a line (the axis)
    const yScale = d3.scaleLinear()
    .domain([0, maxY])
    .range([height, margin.top]);

    // X Scale

    //  Create the scale. We use band,
    //  because we have categorical data and
    //  want to map it to a line (the axis)
    const xScale = d3.scaleBand()
    .domain(d3.range(data_bar.length))
    .range([margin.left, width - margin.right])
    .padding(0.1);

    // Add axes to the chart

    // Add Y
    svg3.append("g")
    .attr("transform", `translate(${margin.left}, 0)`) // move past margin
    .call(d3.axisLeft(yScale)) // use built in function to create axis
    //.attr("font-size", '20px'); // set font size

    // Add X
    svg3.append("g")
    .attr("transform", `translate(0,${height})`) // move past margin and to bottom of page
    .call(d3.axisBottom(xScale) // use built in function to create axis
    .tickFormat(i => data_bar[i].species)) // make x-axis show name
    //.attr("font-size", '20px'); // set font size


    // Add bars to chart
    var barChart = svg3.selectAll(".bar") // select everything classed "bar"
    .data(data_bar) // bind data
    .enter() // commence loop through rows of data to bind with svg's
    .append("rect") // for each datum, add a rect to the svg
    .attr("class", "bar") // give class bar for styling
    .attr("x", (d,i) => xScale(i)) // set x attribute of rect using xScale
    .attr("y", (d) => yScale(d.count)) // set y attribute of rect based on score
    .attr("height", (d) => (height) - yScale(d.count)) // give rect height based on score
    .attr("width", xScale.bandwidth()) // give rect width based on xScale
    .style("fill", function(d, i) {
      return color(i);
    })
  }

  //TODO: Scatterplot 2 (show Sepal width on x-axis and Petal width on y-axis)

  //TODO: Barchart with counts of different species

  //Brushing Code---------------------------------------------------------------------------------------------

  //Removes existing brushes from svg
  function clear() {
    svg1.call(brush1.move, null);
    svg2.call(brush2.move, null);
  }

  //Is called when we brush on scatterplot #1
  function updateChart1(brushEvent) {
    extent = brushEvent.selection;

    // TODO: Check all the circles that are within the brush region in Scatterplot 1
    // myCircle1  ..... something with Petal_Length and Sepal_Length
    // https://www.d3-graph-gallery.com/graph/interactivity_brush.html
    myCircle1.classed('selected', function(d) {
      return isBrushed(extent, x1(d.Sepal_Length), y1(d.Petal_Length));
    });
    //TODO: Select all the data points in Scatterplot 2 which have the same id as those selected in Scatterplot 1
    //myCircle2  ..... something with Petal_Length and Sepal_Length
    myCircle2.classed('selected', function(d) {
      return isBrushed(extent, x1(d.Sepal_Length), y1(d.Petal_Length));
    });
  }

  //Is called when we brush on scatterplot #2
  function updateChart2(brushEvent) {
    extent = brushEvent.selection;
    var selectedSpecies = new Set();

    //TODO: Check all the circles that are within the brush region in Scatterplot 2
    // myCircle2 sepal_width, petal_width
    myCircle2.classed('selected', function(d) {
      var brushed = isBrushed(extent, x2(d.Sepal_Width), y2(d.Petal_Width));
      if (brushed) {
        selectedSpecies.add(d.Species);
      }
      return brushed;

    });

    //TODO: Select all the data points in Scatterplot 1 which have the same id as those selected in Scatterplot 2
    myCircle1.classed('selected', function(d) {
      return isBrushed(extent, x2(d.Sepal_Width), y2(d.Petal_Width));
    });


    // myCircle1 sepal_width, petal_width
    // link to barChart
    // something with selectedSpecies?

    //TODO: Select bars in bar chart based on species selected in Scatterplot 2
    // barChart .... something with selecting d.species
    barChart.classed('selected', function(d) {
      return selectedSpecies.has(d.species)
    })



  }

  //Finds dots within the brushed region
  function isBrushed(brush_coords, cx, cy) {
    if (brush_coords === null) return;

    var x0 = brush_coords[0][0],
        x1 = brush_coords[1][0],
        y0 = brush_coords[0][1],
        y1 = brush_coords[1][1];
    return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1; // This return TRUE or FALSE depending on if the points is in the selected area
  }
});
