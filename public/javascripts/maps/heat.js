var gradient1 = {
  0: 'purple',
  0.6: 'blue',
  0.8: 'green',
  0.98: 'yellow',
  1: 'red'
};

function setMaxZoom(numDatapoints){
  switch (true){
    case (numDatapoints <= 10): return 1;
    case (numDatapoints > 10 && numDatapoints <= 70): return 4;
    case (numDatapoints > 70 && numDatapoints <= 200): return 5;
    case (numDatapoints > 200 && numDatapoints <= 500) : return 6;
    case (numDatapoints > 500 && numDatapoints <= 1000): return 7;
    case (numDatapoints > 1000 && numDatapoints <= 1750): return 8;
    default: return 9
  }
};

function makeHeatMap(){
  var coords = [];
  var numDatapoints = this.toJSON().length;
  this.toJSON().forEach(function(elem, i){
    var lat = elem.lat;
    var lon = elem.lng;
    coords.push([lat,lon]);
  });
  // var radius = radius;
  if (map.hasLayer(geoLayer)) {
    map.removeLayer(geoLayer);
  };
  if (map.hasLayer(heatLayer)) {
    map.removeLayer(heatLayer);
  };
  heatLayer = L.heatLayer(coords, {
    radius: 27,
    // blur: 10,
    gradient: gradient1,
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