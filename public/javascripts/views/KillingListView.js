var KillingListView = Backbone.View.extend({

  events: {
    "click .button-unarmed" : "armedOrUnarmed",
    "click .button-markers" : "markerMap",
    "click .button-home" : "home"
  },

  armedOrUnarmed: function(){
    var filteredCollection = this.collection.armedOrUnarmedKillings();
    this.filteredToGeoMap(filteredCollection);
  },

  filteredToGeoMap: function(filter){
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
    this.collection.fetch({reset: true});
  },
});
