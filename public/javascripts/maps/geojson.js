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
        // "marker-color": "#9c89cc",
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
  var layer = L.geoJson(geoData, {
    pointToLayer: function(feature, latlng){
      return L.circleMarker(latlng, geoStyle);
    },
    style: function(feature){
      switch (feature.properties.unarmed){
        case true: return {fillColor: 'black'};
        case false: return {fillColor: 'lightblue'};
      }
    }
  }).addTo(map);
};

function makeGeoMap(){
  var filter = this.filter;
  var collection = this.collection;
  var geoFeatureArr = [];
  collection.toJSON().forEach(function(elem, i){
    var lat = elem.lat;
    var lon = elem.lng;
    var unarmed = elem.victim_unarmed;
    if (unarmed===true || unarmed===false){
      var geoFeature = featureToGeoFormat(lat,lon,i,unarmed);
      geoFeatureArr.push(geoFeature);
    };    
  });
  var geoData = geoJSONify(geoFeatureArr);
  addGeoLayer(geoData);
};