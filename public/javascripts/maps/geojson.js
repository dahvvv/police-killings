var geoStyleGeneric = {
  fillColor: 'red',
  color: 'black',
  radius: 7,
  fillOpacity: 0.8,
  opacity: 0.8,
};

function addGeoLayer(geoData){
  geoLayer = L.geoJson(geoData, {
    pointToLayer: function(feature, latlng){
      return L.circleMarker(latlng, geoStyleGeneric);
    },
    style: function(feature){
      switch (feature.properties.query){
        case "race": return styleVictimRace(feature);
        case "race_popweight": return styleVictimRacePopweight(feature);
        case "race_arrestsweight": return styleVictimRaceArrestsweight(feature);
        case "victim_age": return styleVictimAge(feature);
        case "victim_unarmed": return styleVictimUnarmed(feature);
      }
    },
    onEachFeature: function(feature,layer){
      var template = _.template($('#popup-template').html());
      var popupContent = template(feature.properties);
      layer.bindPopup(popupContent, {
        maxHeight: 400,
        maxWidth: 700
      });
      // layer.bindPopup(template(feature.properties));
    }
  });
  if ($('#map-one').css('display') === "none") {
    $('#infovis-canvaswidget').remove();
    $('#map-one').slideToggle(750, function(e){
      geoLayer.addTo(map);
    });
  } else {
    geoLayer.addTo(map);
  }
};

function geoJSONify(geoFeatureArr){
  return [
    {
      "type": "FeatureCollection",
      "features": geoFeatureArr
    }
  ]
};

function featureToGeoFormat(options){
  var geoFeature = 
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          options.lon,
          options.lat
        ]
      },
      "properties": {
        "marker-size": "small",
        "query": options.query,
        "name": options.name,
        "race": options.race,
        "age": options.age,
        "gender": options.gender,
        "unarmed": options.unarmed,
        "shots": options.shots,
        "illness": options.illness,
        "address": options.address,
        "description": options.description,
        "img": options.img,
        "source": options.source,
      }
    };
  return geoFeature;
};

function jsonElemToObjLiteral(elem,query){
  var options = {
    query: query,
    lat: elem.lat,
    lon: elem.lng,
    address: elem.formatted_address,
    name: elem.victim_name,
    race: elem.victim_race,
    age: elem.victim_age,
    gender: elem.victim_gender,
    img: elem.url_victim_image,
    source: elem.source,
    description: elem.description,
    unarmed: elem.victim_unarmed,
    shots: elem.shots_fired,
    illness: elem.symptoms_of_mental_illness
  };
  return options;
};

function makeGeoMap(){
  var query = this.query;
  var that = this;
  setGeoMap(that,query);
};

function setRaceQuery(){
  var query = "race";
  var that = this;
  setGeoMap(that,query);
};

function setRacePopweightQuery(){
  var query = "race_popweight";
  var that = this;
  setGeoMap(that,query);
};

function setRaceArrestsweightQuery(){
  var query = "race_arrestsweight";
  var that = this;
  setGeoMap(that,query);
};

function setGeoMap(context,query){
  var geoFeatureArr = [];  
  context.toJSON().forEach(function(elem){
    var options = jsonElemToObjLiteral(elem,query);
    var geoFeature = featureToGeoFormat(options);
    geoFeatureArr.push(geoFeature);
  });
  var geoData = geoJSONify(geoFeatureArr);
  while (map.hasLayer(heatLayer)) {
    map.removeLayer(heatLayer);
  };
  while (map.hasLayer(geoLayer)) {
    map.removeLayer(geoLayer);
  };
  if (query==="state") {
    // $('.display-selector').animate({"top":"73%"},500);
    // $('#infovis').animate({"height":"73%"},500);    
    var state = context.state;
    setMapToStateView(state);
  } else {
    // $('.display-selector').animate({"top":"65%"},500);
    // $('#infovis').animate({"height":"65%"},100);
    map.setView([defaultLat,defaultLon],defaultZoom);
  };
  addGeoLayer(geoData);
};
