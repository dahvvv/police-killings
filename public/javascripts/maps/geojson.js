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

var geoStyle = {
  fillColor: 'red',
  color: 'black',
  radius: 7,
  fillOpacity: 0.8,
  opacity: 0.8,
};

function popupImage(feature){
  if (feature.properties.img != null) {
    return '<img src="' + feature.properties.img + '"/>'
  };
};

function popupContent(feature){
  return '<h5>' + feature.properties.name + ', ' + feature.properties.age + '</h5>' + popupImage(feature) + '<p>' + feature.properties.description + '</p><a href="' + feature.properties.source + '" target="_blank">Source</a>'
};

function addGeoLayer(geoData){
  while (map.hasLayer(heatLayer)) {
    map.removeLayer(heatLayer);
  };
  while (map.hasLayer(geoLayer)) {
    map.removeLayer(geoLayer);
  };
  geoLayer = L.geoJson(geoData, {
    pointToLayer: function(feature, latlng){
      return L.circleMarker(latlng, geoStyle);
    },
    style: function(feature){
      switch (feature.properties.query){
        case "victim_unarmed": return styleVictimUnarmed(feature);
        case "victim_age": return styleVictimAge(feature);
      }
    },
    onEachFeature: function(feature,layer){
      // layer.bindPopup(feature.properties.description)
      var content = popupContent(feature);
      layer.bindPopup(content);
    }
  });
  geoLayer.addTo(map);
};

function makeGeoMap(){
  var geoFeatureArr = [];
  var query = this.query;
  this.toJSON().forEach(function(elem){
    var options = jsonElemToObjLiteral(elem,query);
    var geoFeature = featureToGeoFormat(options);
    geoFeatureArr.push(geoFeature);
  });
  var geoData = geoJSONify(geoFeatureArr);
  addGeoLayer(geoData);
};