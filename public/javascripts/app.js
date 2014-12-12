L.mapbox.accessToken = 'pk.eyJ1IjoibWFycGJvcnhtYXJycnBib3JycnJyeCIsImEiOiJ3Y0hUd3ZZIn0.VNcoUZ2TFXUuID8JQ2-t2A';

function geoJSONify(geoFeatureArr){
  return [
    {
      "type": "FeatureCollection",
      "features": geoFeatureArr
    }
  ]
};

function featureToGeoFormat(lat,lon,i){
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
        "marker-color": "#9c89cc",
        "marker-size": "small",
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
  var layer = L.mapbox.featureLayer().addTo(map);
  layer.setGeoJSON(geojson);
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
      data.toJSON().forEach(function(elem, i){
        console.log(elem.lat);
        var lat = elem.lat;
        var lon = elem.lng;
        var geoFeature = featureToGeoFormat(lat,lon,i);
        geoFeatureArr.push(geoFeature);
      });
      var geoJSON = geoJSONify(geoFeatureArr);
      makeMap(map, geoJSON);
    }
  });
});