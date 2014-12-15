var KillingListView = Backbone.View.extend({

  events: {
    "click .home" : "home",
    "click .markers" : "markerMap",
    // "click .age-heat" : "ageHeatMap",
    "click .age-marker" : "ageMarkMap",
    "click .unarmed" : "armedOrUnarmed",
  },

  markerMap: function(){
    var filteredCollection = this.collection.markerMap();
    this.filteredToGeoMap(filteredCollection);
  },

  ageHeatMap: function(){
    var filteredCollection = this.collection.ageHeatMap();
    this.filteredToGeoMap(filteredCollection);
  },

  ageMarkMap: function(){
    var filteredCollection = this.collection.ageMarkMap();
    this.filteredToGeoMap(filteredCollection);
  },

  armedOrUnarmed: function(){
    var filteredCollection = this.collection.armedOrUnarmedKillings();
    this.filteredToGeoMap(filteredCollection);
  },

  filteredToGeoMap: function(filter){
    filter.listenToOnce(filter, 'reset', makeChart);
    filter.listenToOnce(filter, 'reset', makeGeoMap);
    filter.fetch({reset: true});
  },

  filteredToHeatMap: function(){
    this.listenToOnce(this, 'reset', makeHeatMap);
    this.fetch({reset: true});
  },

  home: function(){
    var context = {
      collection: this.collection,
      filter: "none"
    };
    this.collection.listenToOnce(this.collection, 'reset', makeHeatMap);
    // this.collection.listenToOnce(this.collection, 'reset', makeJSHeat);
    this.collection.fetch({reset: true});
  },
});
