var url = "http://127.0.0.1/api/data_quake";



//mapboxgl.accessToken = 'pk.eyJ1IjoianVhbjQ1NDUiLCJhIjoiY2s5MGp2ejBoMDJsNDNsbzFnYnp3NHN1OCJ9.wUmkZEdD54ivnRLOAXdfow';
//var map = new mapboxgl.map({
//container: 'map', // container id
//style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
//center: [-102.1276627,22.4284706], // starting position [lng, lat]
//zoom: 3.5 // starting zoom
//});



var myMap = L.map("map", {
  center: [22.4284706,-102.1276627],
  zoom: 4.3
});

// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: 'pk.eyJ1IjoianVhbjQ1NDUiLCJhIjoiY2s5MGp2ejBoMDJsNDNsbzFnYnp3NHN1OCJ9.wUmkZEdD54ivnRLOAXdfow'
}).addTo(myMap);

// Grab the data with d3
d3.json(url, function(response) {
var last_quake=response.last_quake;
var data_dic=response.data_dic;
var mag=response.mag;
var coor=response.geometry;
var latlng= [];
var place = response.Place;
var time = response.time;

//coor.forEach(element => latlng.push(element.slice(0,2).reverse()));
//console.log(latlng)
console.log("Ready")
console.log(mag)
var button = d3.select('#first');
var button2 = d3.select('#second');

function updatetable1(data){
    var tbody = d3.select('#tbody1');
  data.forEach((registro) => {
    var row = tbody.append("tr");
      row.html(registro);
  });
};


function updatetable2(data){
    var tbody = d3.select('#tbody2');
  data.forEach((registro) => {
    var row = tbody.append("tr");
    Object.entries(registro).forEach(([key, value]) => {
      var celda = row.append("td");
      celda.html(value);
    });
  });
};


button.on("click",function(event){
//d3.selectAll("g").classed("oculto",true); 
document.getElementById("divt1").style.visibility = "visible";
document.getElementById("divt2").style.visibility = "hidden";
document.getElementById("divt1").style.display="initial";
d3.select('#tbody1').selectAll("tr").remove().selectAll("td").remove();
updatetable1(last_quake);
var latlng= last_quake[5];
var latlng_2=latlng.split(" ");

var magni = last_quake[3];
var magni2 = magni.split(":"); 

var place = last_quake[6];
var place2 = place.split(":"); 




 var colormag = "";
      switch (true) {
        case magni2[1]  > 5:
        colormag = "#002B33";
        break;
        case magni2[1] > 4:
        colormag ="#00B1E3";
        break;     
        case magni2[1] > 3:
        colormag ="#00D7E3";
        break;
        case magni2[1]  > 2:
        colormag ="#00E3DE";
        break;
        case magni2[1] > 1:
        colormag ="#00E3BF";
        break; 
        default:
        colormag ="#409487";
        }

   var circlemark =   {  opacity: 1,
          fillOpacity: .5,
          fillColor: "red",//colormag,
          color: "#000000",
          radius: 10,
          stroke: true,
          weight: 0.5
        }

var latlng_2coma= latlng_2[3].replace(",","");
console.log(latlng_2coma.substring(0, latlng_2coma.length - 1))

latlng_2[4].substring(0, latlng_2[4].length - 1)

L.circleMarker([latlng_2coma.substring(0, latlng_2coma.length - 1),latlng_2[4].substring(0, latlng_2[4].length - 1)],circlemark).bindPopup("<h3>Magnitude" +magni2[1] + "<h3><h3>Place: " +place2[1]  + "</h3>").addTo(myMap);
});


button2.on("click",function(event){
//d3.selectAll("g").classed("oculto",true); 
document.getElementById("divt1").style.display="none";
document.getElementById("divt1").style.visibility = "hidden";
document.getElementById("divt2").style.visibility = "visible";
d3.select('#tbody2').selectAll("tr").remove().selectAll("td").remove();
updatetable2(data_dic);

var bikeMarkers = [];
for (var i = 0; i < mag.length; i++) {
 var colormag = "";
      switch (true) {
        case mag[i]  > 5:
        colormag = "#002B33";
        break;
        case mag[i] > 4:
        colormag ="#00B1E3";
        break;     
        case mag[i] > 3:
        colormag ="#00D7E3";
        break;
        case mag[i]  > 2:
        colormag ="#00E3DE";
        break;
        case mag[i] > 1:
        colormag ="#00E3BF";
        break; 
        default:
        colormag ="#409487";
        }


   var circlemark =   {  opacity: 1,
          fillOpacity: .5,
          fillColor: colormag,
          color: "#000000",
          radius: mag[i]*2,
          stroke: true,
          weight: 0.5
        }
L.circleMarker(coor[i].slice(0,2).reverse(),circlemark).bindPopup("<h3>Magnitude: " +mag[i]  + "<h3><h3>Place: " +place[i]  + "</h3>").addTo(myMap);
}

});
});
