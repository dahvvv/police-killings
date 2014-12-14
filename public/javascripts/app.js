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


  var killingList = new KillingList({search: ""});
  killingList.listenToOnce(killingList, 'reset', makeHeatMap);
  var killingListView = new KillingListView({collection: killingList, el: $('body')});
  killingList.fetch({reset: true});
  
});