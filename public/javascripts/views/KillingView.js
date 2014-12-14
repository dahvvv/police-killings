var KillingView = Backbone.View.extend({

  // events: {
  //   "dblclick" : "youClicked",
  //   "click button" : "toggleVisibility"
  // },

  // youClicked: function(e){
  //   alert('holy shit this worked?');
  // },

  // toggleVisibility: function(){
  //   this.model.toggleVisibility();
  // },

  initialize: function(){
    this.listenTo(this.model, 'change', this.render);
  },

  render: function(){
    var lat = this.model.get('lat');
    var lon = this.model.get('lng');
    var geoMarker = {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          lon,
          lat
        ]
      },
      "properties": {
        "marker-color": "#9c89cc",
        "marker-size": "small",
      }
    };
    console.log(geoMarker);
    return geoMarker;
  },

  // geoMarker: function(lat,lon){
  //   var geoMarker = 
  //     {
  //       "type": "Feature",
  //       "geometry": {
  //         "type": "Point",
  //         "coordinates": [
  //           lon,
  //           lat
  //         ]
  //       },
  //       "properties": {
  //         "title": i,
  //         "marker-color": "#9c89cc",
  //         "marker-size": "small",
  //       }
  //     };
  //   return geoMarker;
  // }
});

