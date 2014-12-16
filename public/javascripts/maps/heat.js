function setMapToStateView(state){
  var view = stateViews[state];
  map.setView([view.lat, view.lon],view.zoom);
};

function makeHeatMap(){
  var coords = [];
  var query = this.query;
  var numDatapoints = this.toJSON().length;
  this.toJSON().forEach(function(elem, i){
    var lat = elem.lat;
    var lon = elem.lng;
    coords.push([lat,lon]);
  });
  // var radius = radius;
  while (map.hasLayer(geoLayer)) {
    map.removeLayer(geoLayer);
  };
  while (map.hasLayer(heatLayer)) {
    map.removeLayer(heatLayer);
  };
  if (query==="state") {
    $('.map').animate({"height":"73%"},500);
    var state = this.state;
    setMapToStateView(state);
  } else {
    $('.map').animate({"height":"65%"},500);
    map.setView([defaultLat,defaultLon],defaultZoom);
  };
  heatLayer = L.heatLayer(coords, {
    radius: 27,
    // blur: 10,
    gradient: gradientMain,
    // maxZoom: setMaxZoom(numDatapoints),
    maxZoom: setMaxZoom(numDatapoints),
    max: 1
  });
  heatLayer.addTo(map);
};


// function makeJSHeat(){
//   alert('makin jsheat');
//   var coords = heatLayer._latlngs;
//   var points = [
//   {
//     x: 5,
//     y: 5,
//     value: 100
//   },
//   {
//     x: 10,
//     y: 10,
//     value: 80
//   }
//   ];
//   if (map.hasLayer(heatLayer)) {
//     map.removeLayer(heatLayer);
//   };
//   var config = {
//     container: document.getElementById('map-one'),
//     radius: 10,
//     maxOpacity: .5,
//     minOpacity: 0,
//     gradient: {
//       '.5': 'red',
//       '.9': 'white'
//     }
//   };
//   var heatmapInstance = h337.create(config);
//   var data = {
//     max: 100,
//     min: 0,
//     data: points
//   };
//   heatmapInstance.setData(data);
// };