L.mapbox.accessToken = 'pk.eyJ1IjoibWFycGJvcnhtYXJycnBib3JycnJyeCIsImEiOiJ3Y0hUd3ZZIn0.VNcoUZ2TFXUuID8JQ2-t2A';

function geoJSONify(geoFeatureArr){
  return [
    {
      "type": "FeatureCollection",
      "features": geoFeatureArr
    }
  ]
};

function featureToGeoFormat(lat,lon){
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
        "title": "The White House",
        "marker-color": "#9c89cc",
        "marker-size": "medium",
        "marker-symbol": "building"
      }
    };
  return geoFeature;
};

var geojsonMarkerOptions = {
    radius: 3,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

function makeMap(map, geojson){
  var layer = L.geoJson(geojson, {
    pointToLayer: function(feature, latlng){
      return L.circleMarker(latlng, geojsonMarkerOptions);
    }
  });
  layer.addTo(map);
  map.fitBounds(layer.getBounds());
};

var killingList = new KillingList;
var geoFeatureArr = [];
var geoJSON;
var map;
var markerList = document.getElementById('marker-list');


// map.featureLayer.eachLayer(function(layer) {
//           var item = markerList.appendChild(document.createElement('li'));
//           item.innerHTML = layer.toGeoJSON().properties.title;
//           item.onclick = function() {
//              map.setView(layer.getLatLng(), 14);
//              layer.openPopup();
//           };
//       });

$(function(){

  var map = L.mapbox.map('map-one', 'examples.map-i86l3621', {
    scrollWheelZoom: false,
    legendControl: {
      position: 'topright'
    }
  });
  // heat = L.heatLayer([], { maxZoom: 12 }).addTo(map);

  killingList.fetch({
    reset: true,
    success: function(data){
      data.toJSON().forEach(function(elem){
        console.log(elem.lat);
        var lat = elem.lat;
        var lon = elem.lng;
        var geoFeature = featureToGeoFormat(lat,lon);
        geoFeatureArr.push(geoFeature);
      });
      var geoJSON = geoJSONify(geoFeatureArr);
      makeMap(map, geoJSON);
    }
  });
});