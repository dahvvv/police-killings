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
        "name": options.name,
        "age": options.age,
        "unarmed": options.unarmed,
        "filter": options.filter
      }
    };
  return geoFeature;
};

var geoStyle = {
  fillColor: 'red',
  color: 'black',
  radius: 7,
  fillOpacity: 0.8,
  opacity: 0.8,
};

function styleVictimUnarmed(feature){
  switch (feature.properties.unarmed){
    case true: return {fillColor: 'black'};
    case false: return {fillColor: 'lightblue'};
  }
};

function addGeoLayer(geoData){
  if (map.hasLayer(heatLayer)) {
    map.removeLayer(heatLayer);
  };
  if (map.hasLayer(geoLayer)) {
    map.removeLayer(geoLayer);
  };
  geoLayer = L.geoJson(geoData, {
    pointToLayer: function(feature, latlng){
      return L.circleMarker(latlng, geoStyle);
    },
    style: function(feature){
      switch (feature.properties.filter){
        case "victim_unarmed": return styleVictimUnarmed(feature);
      }
    }
  });
  geoLayer.addTo(map);
};

function makeGeoMap(){
  var geoFeatureArr = [];
  var filter = this.filter;
  this.toJSON().forEach(function(elem){
    var options = {
      filter: filter,
      lat: elem.lat,
      lon: elem.lng,
      address: elem.formatted_address,
      name: elem.victim_name,
      age: elem.victim_age,
      gender: elem.victim_gender,
      img: elem.url_victim_image,
      source: elem.source,
      description: elem.description,
      unarmed: elem.victim_unarmed,
      shots: elem.shots_fired,
      illness: elem.symptoms_of_mental_illness
    };
    var geoFeature = featureToGeoFormat(options);
    geoFeatureArr.push(geoFeature);
  });
  var geoData = geoJSONify(geoFeatureArr);
  addGeoLayer(geoData);
};