var url = "http://127.0.0.1/api/data_quake";

// Grab the data with d3
d3.json(url, function(response) {
 console.log(response)
});
