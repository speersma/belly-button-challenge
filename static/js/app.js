const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// load in data using d3 and console log it
d3.json(url).then(function(data) {
    console.log(data);
});

// wrapper func so that everything happens when the this func is called
function make_plot() {

    // selecting dropdown element from html using id
    let nameList = d3.select("#selDataset");

    // pulling the json data from the url and console log it
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);

        // creating array of the names in the json
        let names = data.names;

        // pull elements from name array
        names.forEach((name) => {
            // appending each name value to the name list as an option
            nameList.append("option").text(name).property("value", name);
        });

        // saving the top name (the selected name) to pass into the plotting functions 
        let name = names[0];

        // calling the plotting
        hbar(name);
    });
}

// HORIZONTAL BAR CHART
function hbar(chosenName) {
    // pulling json data and console log it
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);

        // creating array of samples then filtering to the selected record
        let samples = data.samples;
        let selectedRecord = samples.filter((sample) => sample.id === chosenName);
        // checking if selected record is present
        // console.log(selectedRecord)

        // selecting first record (otherwise you cannot slice it later on)
        let record = selectedRecord[0];
        
        // creating trace for hbar chart
        let trace = [{
            // pulling top ten sample_values 
            x: record.sample_values.slice(0,10).reverse(),
            // pulling top ten otu_ids and adding the 'OTU' label to y label
            y: record.otu_ids.slice(0,10).map((otu_id) => `OTU ${otu_id}`).reverse(),
            // assigning bacteria description to display when hovering
            text: record.otu_labels.slice(0,10).reverse(),
            // selecting type of chart
            type: "bar",
            // changing orientation of bar chart
            orientation: 'h',
            // selecting color of bars in chart
            marker: {
                color: "rgb(172,172,100)"
            },
        }];
        
        // plot chart
        Plotly.newPlot("bar", trace);
    });
}


// updates horizontal bar chart when new name is selected
function newNameSelected(chosenName) {
    hbar(chosenName);
}

// calling wrapper function 
make_plot();