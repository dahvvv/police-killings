function geoJSONify(geoFeatureArr){
  return [
    {
      "type": "FeatureCollection",
      "features": geoFeatureArr
    }
  ]
};

function featureToGeoFormat(lat,lon,i,unarmed){
  var geoFeature = 
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          lon,
          lat
        ]
      },
      "properties": {
        "title": i,
        "marker-size": "small",
        "unarmed": unarmed
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
    filter: function(feature, layer){
      var unarmed = feature.properties.unarmed
      return unarmed === true || unarmed === false
    },
    style: function(feature){
      switch (feature.properties.unarmed){
        case true: return {fillColor: 'black'};
        case false: return {fillColor: 'lightblue'};
      }
    }
  });
  geoLayer.addTo(map);
};

function makeGeoMap(){
  var filter = this.filter;
  var collection = this.collection;
  var geoFeatureArr = [];
  collection.toJSON().forEach(function(elem, i){
    var lat = elem.lat;
    var lon = elem.lng;
    var unarmed = elem.victim_unarmed;
    var geoFeature = featureToGeoFormat(lat,lon,i,unarmed);
    geoFeatureArr.push(geoFeature);
  });
  var geoData = geoJSONify(geoFeatureArr);
  addGeoLayer(geoData);
};