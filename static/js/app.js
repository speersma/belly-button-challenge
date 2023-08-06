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

        // pull each name from name array
        names.forEach((name) => {
            // appending each name value to the name list as an option
            nameList.append("option").text(name).property("value", name);
        });

        // calling the plotting
        hbar(names[0]);
        demoPanel(names[0])
        bubble(names[0])
    });
}

// HORIZONTAL BAR CHART
function hbar(chosenName) {
    // pulling json data and console log it
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);

        // creating array of samples then filtering to the selected record
        let samples = data.samples;
        let record = samples.filter((sample) => sample.id === chosenName);
        // checking if selected record is present
        // console.log(selectedRecord)
        
        // creating trace for hbar chart
        let trace = [{
            // pulling top ten sample_values 
            x: record[0].sample_values.slice(0,10).reverse(),
            // pulling top ten otu_ids and adding the 'OTU' label to y label
            y: record[0].otu_ids.slice(0,10).map((otu_id) => `OTU ${otu_id}`).reverse(),
            // assigning bacteria description to display when hovering
            text: record[0].otu_labels.slice(0,10).reverse(),
            // selecting type of chart
            type: "bar",
            // changing orientation of bar chart
            orientation: 'h',
            width: .7,
            // selecting color of bars in chart
            marker: {
                color: "green",  
            },
        }];
        let layout = {
            title: (`Top 10 OTUs for Sample: ${record[0].id}`)
        }
        // plot chart
        Plotly.newPlot("bar", trace, layout);
    });
}

// DEMOGRAPHICS PANEL
function demoPanel(chosenName) {
    // pull data from json and console log it
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);

        // pulling metadata portion of json and pulling selected record from metadata
        let metadata = data.metadata;
        let record = metadata.filter((meta) => meta.id == chosenName);
        // console.log(selectedRecord)
        
        // remove sub elements from sample-metadata object
        d3.select("#sample-metadata").html("");

        // pull the keys and values from the top record
        let fields = Object.entries(record[0]);
        // checking what the fields array looks like
        console.log(fields);

        // add html elements with h5 tags for each field in the fields array...
        //...information added in elements = "Key: Value"
        fields.forEach(([key,value]) => {
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });
}

// BUBBLE CHART 
function bubble(chosenName) {
    // pull in data from JSON and console log it
    d3.json(url).then((data) => {
        console.log(data)

        let samples = data.samples;

        let selectedRecord = samples.filter((sample) => sample.id === chosenName);
        let record = selectedRecord[0]
        console.log(record)
        let trace = [{
            x: record.otu_ids,
            y: record.sample_values,
            text: record.otu_labels,
            mode: 'markers',
            marker: {
                size: record.sample_values,
                color: record.otu_ids,
                colorscale: 'Electric'
            }
        }];

        let layout = {
            title: "",
            xaxis: {title: "OTU ID"}
        };

        Plotly.newPlot("bubble", trace, layout)
    })
}

// updates charts when new name is selected
function optionChanged(chosenName) {
    hbar(chosenName);
    demoPanel(chosenName);
    bubble(chosenName);
    
}

// calling wrapper function 
make_plot();