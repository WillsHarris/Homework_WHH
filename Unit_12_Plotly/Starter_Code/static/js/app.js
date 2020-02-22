



var IDs = [];
d3.json("samples.json").then(function(data) {

  // Collect all IDs and append them to the option menue
  data.samples.forEach(function(d){
    IDs.push(d.id)
  });


  console.log(IDs);



  IDs.forEach(function(v, i){
      d3.select("#selDataset").append("option").attr("value", i).text(v)
  });

});

var ID = 0;
  // ----------------------------------------------------------


  // Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 160;

// var svgWidth = 160;
// var svgHeight = 960;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// ------------------------


function barChart(ID) {


 // Define SVG area dimensions
 var svgWidth = 200;
 var svgHeight =  400 ;
 
 // var svgWidth = 160;
 // var svgHeight = 960;
 
 // Define the chart's margins as an object
 var chartMargin = {
   top: 10,
   right: 10,
   bottom: 20,
   left: 60
 };
 
 // Define dimensions of the chart area
 var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
 var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;



// Select body, append SVG area to it, and set the dimensions
var svg = d3.select("#bar")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from hours-of-tv-watched.csv
d3.json("samples.json").then(function(data) {


  var demInfo = d3.select("#sample-metadata");
   demInfo.append("div").text(`id: ${data.metadata[ID].id}`);
   demInfo.append("div").text(`ethnicity: ${data.metadata[ID].ethnicity}`);
   demInfo.append("div").text(`gender: ${data.metadata[ID].gender}`);
   demInfo.append("div").text(`age: ${data.metadata[ID].age}`);
   demInfo.append("div").text(`location: ${data.metadata[ID].location}`);
   demInfo.append("div").text(`bbtype: ${data.metadata[ID].bbtype}`);
   demInfo.append("div").text(`wfreq: ${data.metadata[ID].wfreq}`);
   

  var dataNew= data.samples[ID];


//   // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
  var xBandScale = d3.scaleLinear()
    .domain([0, d3.max(data.samples[ID].sample_values.slice(0, 10))])
    .range([0, chartWidth]);



  // Create a linear scale for the vertical axis.
  var yLinearScale = d3.scaleBand()
    .domain(data.samples[ID].otu_ids.slice(0, 10).reverse().map(i => 'OTU  ' + i))
    .range([chartHeight, 0])
    .padding(0.1);
    


//   // Create two new functions passing our scales in as arguments
//   // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xBandScale).ticks(5);
  var leftAxis = d3.axisLeft(yLinearScale);

//   // Append two SVG group elements to the chartGroup area,
//   // and create the bottom and left axes inside of them
  chartGroup.append("g")
    .call(leftAxis);

  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);



  
  function make_x_gridlines() {		
    return d3.axisBottom(xBandScale)
        .ticks(5)
  }
  

   // add the X gridlines
   svg.append("g")			
   .attr("class", "grid")
   .attr("transform", "translate("+chartMargin.left+"," + (chartHeight+chartMargin.top) + ")")
   .call(make_x_gridlines()
       .tickSize(-chartHeight)
       .tickFormat("")
   )

    

  // Create one SVG rectangle per piece of tvData
  // Use the linear and band scales to position each rectangle within the chart
  var barsGroup = chartGroup.selectAll(".bar")
    .data(dataNew.sample_values.slice(0, 10))
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("y", (d, i) => yLinearScale(data.samples[ID].otu_ids.map(i => 'OTU  ' + i)[i]))
    .attr("width", d=>xBandScale(d))
    // 
    .attr("height", yLinearScale.bandwidth())
    // (d, i) => chartHeight - yLinearScale(data.samples[ID].otu_ids[i]))
    .attr("x", 0 )
  
    ;







// Step 1: Append a div to the body to create tooltips, assign it a class
  // =======================================================
  var toolTip = d3.select("body").append("div")
    .attr("class", "tooltip");

  // Step 2: Add an onmouseover event to display a tooltip
  // ========================================================
  barsGroup.on("mouseover", function(d, i) {
    toolTip.style("display", "block");
    console.log(`OTU labels: ${data.samples[ID].otu_labels[i]}`);
    toolTip.html(`OTU labels: ${data.samples[ID].otu_labels[i].split(';').join(', ')}`)
      .style("left", d3.event.pageX + "px")
      .style("top", d3.event.pageY + "px");
  })
    // Step 3: Add an onmouseout event to make the tooltip invisible
    .on("mouseout", function() {
      toolTip.style("display", "none");
    });

  });
};

barChart(ID);





  // =================================================================================================================================






  function scatterPlot(ID) {


    // Define SVG area dimensions
    var svgWidth = 600;
    var svgHeight =  400 ;
    
    // var svgWidth = 160;
    // var svgHeight = 960;
    
    // Define the chart's margins as an object
    var chartMargin = {
      top: 10,
      right: 10,
      bottom: 20,
      left: 60
    };
    
    // Define dimensions of the chart area
    var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
    var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;
   
   
   
   // Select body, append SVG area to it, and set the dimensions
   var svg = d3.select("#gauge")
     .append("svg")
     .attr("height", svgHeight)
     .attr("width", svgWidth);
   
   // Append a group to the SVG area and shift ('translate') it to the right and to the bottom
   var chartGroup = svg.append("g")
     .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);
   
   // Load data from hours-of-tv-watched.csv
   d3.json("samples.json").then(function(data) {
   
     var dataNew= data.samples[ID];
   
   
   //   // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
     var xBandScale = d3.scaleLinear()
       .domain([-d3.max(data.samples[ID].otu_ids)*0.05, d3.max(data.samples[ID].otu_ids)*1.1])
       .range([0, chartWidth]);
   
   
   
     // Create a linear scale for the vertical axis.
     var yLinearScale = d3.scaleLinear()
     .domain([ d3.max(data.samples[ID].sample_values)*1.1, 0])
     .range([0, chartHeight]);
       
   
   
   //   // Create two new functions passing our scales in as arguments
   //   // These will be used to create the chart's axes
     var bottomAxis = d3.axisBottom(xBandScale).ticks(5);
     var leftAxis = d3.axisLeft(yLinearScale).ticks(5);
   
   //   // Append two SVG group elements to the chartGroup area,
   //   // and create the bottom and left axes inside of them
     chartGroup.append("g")
       
       .call(leftAxis);
   
     chartGroup.append("g")
       .attr("transform", `translate(0, ${chartHeight})`)
       .call(bottomAxis);
   
  
     function make_x_gridlines() {		
       return d3.axisBottom(xBandScale)
           .ticks(5)
     }

     function make_y_gridlines() {		
      return d3.axisLeft(yLinearScale)
          .ticks(5)
    }
     
   
      // add the X gridlines
      svg.append("g")			
      .attr("class", "grid")
      .attr("transform", "translate("+chartMargin.left+"," + (chartHeight+chartMargin.top) + ")")
      .call(make_x_gridlines()
          .tickSize(-chartHeight)
          .tickFormat("")
      )

        // add the Y gridlines
        svg.append("g")			
        .attr("class", "grid")
        .attr("transform", "translate("+chartMargin.left+"," + (0) + ")")
        .call(make_y_gridlines()
            .tickSize(-chartWidth)
            .tickFormat("")
        )
   
       
   
     // Create one SVG rectangle per piece of tvData
     // Use the linear and band scales to position each rectangle within the chart
     var barsGroup = chartGroup.selectAll(".bar")
       .data(dataNew.sample_values)
       .enter()
       .append("circle")
       .attr("class", "scatter")
       .attr("cy", (d, i) => yLinearScale(data.samples[ID].sample_values[i]))
       .attr("cx", (d, i) => xBandScale(data.samples[ID].otu_ids[i]))
       .attr("r", (d, i) => Math.sqrt(data.samples[ID].sample_values[i]*2))
       .attr("style", (d, i) =>`fill:rgb(155, ${100}, ${255*data.samples[ID].otu_ids[i]/(d3.max(data.samples[ID].otu_ids))}, 1)`)
        // (d, i) => data.samples[ID].otu_ids[i])
       ;
   
   
   
   
   
   
   
   // Step 1: Append a div to the body to create tooltips, assign it a class
     // =======================================================
     var toolTip = d3.select("body").append("div")
       .attr("class", "tooltip");
   
     // Step 2: Add an onmouseover event to display a tooltip
     // ========================================================
     barsGroup.on("mouseover", function(d, i) {
       toolTip.style("display", "block");
       console.log(`OTU labels: ${data.samples[ID].otu_labels[i]}`);
       toolTip.html(`OTU labels: ${data.samples[ID].otu_labels[i].split(';').join(', ')}`)
         .style("left", d3.event.pageX + "px")
         .style("top", d3.event.pageY + "px");
     })
       // Step 3: Add an onmouseout event to make the tooltip invisible
       .on("mouseout", function() {
         toolTip.style("display", "none");
       });
   
     });
   };
   
   scatterPlot(ID);

   
   
   
     d3.select("#selDataset").on("click", function(){
       console.log("Update ID");
       console.log("Update ID");
       ID=d3.select("#selDataset").node().value;
       d3.select("#sample-metadata").selectAll("div").remove();
       d3.selectAll("#bar").select("svg").remove();
       barChart(ID);
       d3.select("#gauge").select("svg").remove();
       scatterPlot(ID);
      
     });














