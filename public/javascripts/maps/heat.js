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
  heatLayer = L.heatLayer(coords, {
    radius: 27,
    // blur: 10,
    gradient: gradient1,
    maxZoom: 9,
    max: 1
  });
  if (map.hasLayer(geoLayer)) {
    map.removeLayer(geoLayer);
  };
  heatLayer.addTo(map);
};

function makeJSHeat(){
  alert('makin jsheat');
  var coords = heatLayer._latlngs;
  var points = [
  {
    x: 5,
    y: 5,
    value: 100
  },
  {
    x: 10,
    y: 10,
    value: 80
  }
  ];
  if (map.hasLayer(heatLayer)) {
    map.removeLayer(heatLayer);
  };
  var config = {
    container: document.getElementById('map-one'),
    radius: 10,
    maxOpacity: .5,
    minOpacity: 0,
    gradient: {
      '.5': 'red',
      '.9': 'white'
    }
  };
  var heatmapInstance = h337.create(config);
  var data = {
    max: 100,
    min: 0,
    data: points
  };
  heatmapInstance.setData(data);
}