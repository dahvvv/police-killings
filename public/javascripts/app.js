L.mapbox.accessToken = 'pk.eyJ1IjoibWFycGJvcnhtYXJycnBib3JycnJyeCIsImEiOiJ3Y0hUd3ZZIn0.VNcoUZ2TFXUuID8JQ2-t2A';

  // var tiles = L.tileLayer('http://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
  //     attribution: '<a href="https://www.mapbox.com/about/maps/">Terms and Feedback</a>',
  //     id: 'examples.map-20v6611k'
  // }).addTo(map);

// map.featureLayer.eachLayer(function(layer) {
//           var item = markerList.appendChild(document.createElement('li'));
//           item.innerHTML = layer.toGeoJSON().properties.title;
//           item.onclick = function() {
//              map.setView(layer.getLatLng(), 14);
//              layer.openPopup();
//           };
//       });

$(function(){

  map = L.mapbox.map('map-one', 'examples.map-i86l3621', {
    scrollWheelZoom: false,
  }).setView([37.2,-98.5795],4);

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


  var killingList = new KillingList({search: ""});
  killingList.listenToOnce(killingList, 'reset', makeHeatMap);
  var killingListView = new KillingListView({collection: killingList, el: $('body')});

  killingList.fetch({reset: true});

  // killingList.fetch({
  //   reset: true,
  //   success: function(data){
  //     var coordsArr = [];
  //     var randoCoordsArr = [];
  //     data.toJSON().forEach(function(elem, i){
  //       var lat = elem.lat;
  //       var lon = elem.lng;
  //       // var rand = Math.random();
  //       // if (rand > 0.2) {
  //       //   coordsArr.push([lat,lon]);
  //       // } else {
  //       //   randoCoordsArr.push([lat,lon]);
  //       // };
  //       // var geoFeature = featureToGeoFormat(lat,lon,i);
  //       // geoFeatureArr.push(geoFeature);
        
  //     });
  //     // var geoJSON = geoJSONify(geoFeatureArr);
  //     // addGeoLayer(map, geoJSON);
  //     makeHeatMap(map, coords, 25, gradient1);
  //   }
  // });

});