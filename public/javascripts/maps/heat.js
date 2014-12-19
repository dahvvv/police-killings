function setMapToStateView(state){
  var view = stateViews[state];
  map.setView([view.lat, view.lon],view.zoom);
};

function makeHeatMap(){
  var query = this.query;
  var that = this;
  setHeatMap(that,query);
};

function setRacePopweightHeatQuery(){
  var query = "race_popweight";
  var that = this;
  setHeatMap(that,query);
};

function setHeatMap(context,query){
  var coords = [];
  var numDatapoints = context.toJSON().length;
  context.toJSON().forEach(function(elem, i){
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
    $('.display-selector').animate({"top":"73%"},500);
    $('#infovis').animate({"height":"73%"},500);   
    $('.program-text').animate({"top":"3.2em"},500);   
    var state = context.state;
    setMapToStateView(state);
  } else {
    $('.display-selector').animate({"top":"65%"},500);
    $('#infovis').animate({"height":"65%"},100);
    $('.program-text').animate({"top":"1.5em"},500);   
    map.setView([defaultLat,defaultLon],defaultZoom);
  };
  heatLayer = L.heatLayer(coords, {
    radius: 27,
    gradient: selectGradient(query),
    maxZoom: setMaxZoom(numDatapoints,query),
    max: 1
  });
  if ($('#map-one').css('display') === "none") {
    $('#infovis-canvaswidget').remove();
    $('#map-one').slideToggle(750, function(e){
      heatLayer.addTo(map);
    });
  } else {
    heatLayer.addTo(map);
  }
};
