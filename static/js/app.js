// Function for change on dropdown menu
function optionChanged(selectedID){

   // Check if value is selected in dropdown
   console.log(selectedID);
   // Read the json file for the data
   d3.json("data/samples.json").then((data) => {
   // console.log(data); //checking if correct vlaues //
   // Clears dropdown
   d3.select("#selDataset").html("");   

   // Select the metadata array and for each item append the item ID and adds ID to dropdown
   data.metadata.forEach(item =>
        {
         // console.log(item.id);
        d3.select ("#selDataset").append('option').attr('value', item.id).text(item.id);
        });
   // Selected value can be passed 
   d3.select("#selDataset").node().value = selectedID;
   
   // Filter Metadata for selected ID from dropdown
   const idMetadata = data.metadata.filter(item=> (item.id == selectedID));
   // Check the metadata loaded for the selected ID
   console.log(idMetadata);
   
   const panelDisplay = d3.select("#sample-metadata");
   panelDisplay.html("");
   Object.entries(idMetadata[0]).forEach(item=> 
      {
         panelDisplay.append("p").text(`${item[0]}: ${item[1]}`)
      });

   // BAR CHART

   // Filter sample array data for the selected ID
   const idSample = data.samples.filter(item => 
      parseInt(item.id) == selectedID);
   
   // Top 10 sample values
   var sampleValue = idSample[0].sample_values.slice(0,10);
   sampleValue= sampleValue.reverse();
   // console.log(sampleValue); //checking if correct vlaues // 
   var otuID = idSample[0].otu_ids.slice(0,10);
   otuID = otuID.reverse();
   // console.log(otuID); //checking if correct vlaues //
   var otuLabels = idSample[0].otu_labels
   otuLabels = otuLabels.reverse();
   // console.log(otuLabels); //checking if correct vlaues //
  
   // Y axis 
   const yAxis = otuID.map(item => 'OTU' + " " + item);
      // console.log(yAxis); // check on console to insure correct.
   
   // Define the layout and trace object, edit color and orientation
      const trace = {
      y: yAxis,
      x: sampleValue,
      type: 'bar', orientation: "h", text:  otuLabels,
      marker: {color: 'blue', line: {width: 1}
       }
      },
      layout = {
      title: 'Top 10 Operational Taxonomic Units (OTU)/Individual',
      xaxis: {title: 'Number of Samples Collected'},
      yaxis: {title: 'OTU ID'}
      };

      // Plot using Plotly
      Plotly.newPlot('bar', [trace], layout,  {responsive: true});    
      
// BUBBLE CHART

// Remove Sample value and otuID from individual
var sampleValue1 =idSample[0].sample_values;
var otuID1= idSample[0].otu_ids;

// Define the layout and trace object, edit color and orientation
const trace1 = {
   x: otuID1,
   y: sampleValue1,
   mode: 'markers',
   marker: {
     color: otuID1,
     
     size: sampleValue1
   }
 },

 layout1 = {
   title: '<b>Bubble Chart For Each Sample</b>',
   xaxis: {title: 'OTU ID'},
   yaxis: {title: 'Number of Samples Collected'},
   showlegend: false,
   height: 800,
   width: 1800
   };
   
// Plot using Plotly
Plotly.newPlot('bubble', [trace1], layout1);

});
}

// Initial test starts at ID 940
optionChanged(940);

// Event on change takes the value and calls the function during dropdown selection
d3.select("#selDataset").on('change',() => {
optionChanged(d3.event.target.value);

});
