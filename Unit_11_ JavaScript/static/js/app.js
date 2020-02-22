


var list = ["datetime", "city", "state", "country", "shape"];


for (i=0; i<list.length; i++){
    var shapes=[];
data.forEach(function(line){
    Object.entries(line).forEach(function([key, value]) {
        if (key===list[i]) {
            shapes.push(value)
        } else {
        };
    });

});
shapes = [...new Set(shapes)].sort();
console.log(shapes)

for (elem = 0; elem < shapes.length; elem++) {
    d3.select("div").select("#".concat(list[i])).append("option").text(shapes[elem]).attr("value", shapes[elem]);
  };
}



// ------------------------------------------------



// from data.js
var tableData = data;
var tbody = d3.select("body");


// YOUR CODE HERE!
var table = d3.select("#table").append("table");


var header = ["Datetime", "City", "State", "Country", "Shape", "Duration (min)", "Comments"];
var row = table.append("tr");
header.forEach(function(stuff) {
    row.append("td").text(stuff).style("color", "rgb(165, 1, 1)" );
});




data.forEach(function(stuff) {
    var row = table.append("tr");
    Object.entries(stuff).forEach(function([key, value]) {
      var cell = row.append("td");
      cell.text(value);
    });
  });


  d3.select("div").select("button").on("click", function(){
    var filter = [];
    for(i=0; i<list.length; i++){
    console.log(item=d3.select("div").select("#".concat(list[i])).node().value)
    filter.push(item)
    console.log(filter)
  };

  d3.select("table").remove();

  var table = d3.select("#table").append("table");


  var header = ["Datetime", "City", "State", "Country", "Shape", "Duration (min)", "Comments"];
  var row = table.append("tr");
  header.forEach(function(stuff) {
    row.append("td").text(stuff).style("color", "rgb(165, 1, 1)" );;
  });

  data.filter(function(d){
    if (filter[0]==="all"){return d} else{
    return d.datetime == filter[0]}
  }).filter(function(d){
    if (filter[1]==="all"){return d} else{
    return d.city == filter[1]}
  }).filter(function(d){
    if (filter[2]==="all"){return d} else{
    return d.state == filter[2]}
  }).filter(function(d){
    if (filter[3]==="all"){return d} else{
    return d.country == filter[3]}
  }).filter(function(d){
    if (filter[4]==="all"){return d} else{
    return d.shape == filter[4]}
  }).forEach(function(stuff) {
    var row = table.append("tr");
    Object.entries(stuff).forEach(function([key, value]) {
      var cell = row.append("td");
      cell.text(value);
    });
  });
  
 

})



