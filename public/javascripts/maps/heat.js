var gradient1 = {
  0: 'purple',
  0.6: 'blue',
  0.8: 'green',
  0.98: 'yellow',
  1: 'red'
};

function makeHeatMap(){
  var coords = [];
  this.toJSON().forEach(function(elem, i){
    var lat = elem.lat;
    var lon = elem.lng;
    coords.push([lat,lon]);
  });
  // var radius = radius;
  var heat = L.heatLayer(coords, {
    radius: 25,
    // blur: 0,
    gradient: gradient1,
    maxZoom: 9,
  });
  heat.addTo(map);
};