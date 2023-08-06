# belly-button-challenge

This is a repository containing a plotly challenge assignment. This assignment was part of MSU Data Analytics Boot Camp.

The dashboard produced illustrates the microbial species present within subjects' belly buttons. These microbial species are referred to as operational taxonomic units, or OTUs. This term will be used interchangeably with microbial species. 

## References/Shout-Out
I could not have figured out how to get the name list to hold all the sample names or how to update the graphs with each new selection without the example provided by: https://github.com/yeyanwang/belly-button-challenge/tree/main


## Contents of Repository

**app.js** (static\js)

- This is the main file in the repository. It contains all the javascript to create the three plots included in the visualizaiton. This file is composed of five functions. 
    1. `make_plot`: This function calls the three plotting functions described below. It is the main 'wrapper' function that actually produces the visualization. It is a wrapper function in that the other plotting functions are 'wrapped' (or called) within it. 
    2. `hbar`: hbar stands for horizontal bar chart. That is the visualization produced by this function. The bar chart depicts the top 10 OTU's for the selected subject. When hovering over each bar, the OTU labels for that OTU are displayed. 
    3. `demoPanel`: This function displays the demographic information related to the subject selected in a dropdown menu. Information displayed includes:
        - id
        - ethnicity
        - gender (binary scale reflecting chromosomal sex rather than gender, chosen by the original researchers)
        - age
        - location (City/State)
        - bbtype
        - wfreq
    4. `bubble`: bubble creates the bubble chart that illustrates the OTU values for a selected subject. The bubble size is correlated with the value of the microbial species in the data, which ostensibly represents the number of microbes of that species. 
    5. `optionChanged`: this function reruns the three visualization functions whenever a new subject is selected. 


**index.html**

- This is the html file that structures the interactive webpage. Three scripts are called in the html file for d3, plotly, and the app.js file desribed above. 