L.mapbox.accessToken = 'pk.eyJ1IjoibWFycGJvcnhtYXJycnBib3JycnJyeCIsImEiOiJ3Y0hUd3ZZIn0.VNcoUZ2TFXUuID8JQ2-t2A';

  // var tiles = L.tileLayer('http://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
  //     attribution: '<a href="https://www.mapbox.com/about/maps/">Terms and Feedback</a>',
  //     id: 'examples.map-20v6611k'
  // }).addTo(map);

function makeHeatMaps(map, options){
  var options = options || {};
  var coords1 = options.coords1;
  var radius1 = options.radius1;
  var gradient1 = options.gradient1;
  var coords2 = options.coords2;
  var radius2 = options.radius2;
  var gradient2 = options.gradient2;
  var heat1 = L.heatLayer(coords1, {
    radius: radius1,
    // blur: 0,
    gradient: gradient1,
    maxZoom: 9,
  }).addTo(map);
};

function addLayerTwo(map, coords){
  alert('???');
  var heat2 = L.heatLayer(coords, {
    gradient: gradient2,
    radius: 50,
    maxZoom: 10
  }).addTo(map); 
};


var killingList = new KillingList();

// var killingView = new KillingView({model: Killing, el: $("body")});
// killingView.render();


// killing.on('change', doThing);

// function doThing(){
//   alert('i dun did a thing');
//   this.set({visible: false});
// };

var geoFeatureArr = [];
var geoJSON;
var map;
var options;

// map.featureLayer.eachLayer(function(layer) {
//           var item = markerList.appendChild(document.createElement('li'));
//           item.innerHTML = layer.toGeoJSON().properties.title;
//           item.onclick = function() {
//              map.setView(layer.getLatLng(), 14);
//              layer.openPopup();
//           };
//       });


$(function(){

  var killing = new Killing({id: 6});
  var killingView = new KillingView({model: killing, el: $('body')});
  killing.fetch();

  var map = L.mapbox.map('map-one', 'examples.map-i86l3621', {
    scrollWheelZoom: false,
  }).setView([37.2,-98.5795],4);

  killingList.fetch({
    reset: true,
    success: function(data){
      var coordsArr = [];
      var randoCoordsArr = [];
      data.toJSON().forEach(function(elem, i){
        var lat = elem.lat;
        var lon = elem.lng;
        var rand = Math.random();
        if (rand > 0.2) {
          coordsArr.push([lat,lon]);
        } else {
          randoCoordsArr.push([lat,lon]);
        };
        var geoFeature = featureToGeoFormat(lat,lon,i);
        geoFeatureArr.push(geoFeature);
        
      });
      var geoJSON = geoJSONify(geoFeatureArr);
      addGeoLayer(map, geoJSON);
      var options = {
        coords1 : coordsArr,
        gradient1 : gradient1,
        radius1 : 25,
        coords2 : randoCoordsArr,
        gradient2 : gradient2,
        radius2 : 50,
      };
      makeHeatMaps(map, options);
    }
  });

});