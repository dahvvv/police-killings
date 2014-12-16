var KillingListView = Backbone.View.extend({

  events: {
    "click #usPop" : "usPop",
    "click #heatmap" : "usPopHeat",
    "click #markers" : "usPopMarker",
    "submit #age-range" : "ageHeatMap",
    "click #age-marker" : "ageMarkMap",
    "change #state-selector" : "stateViewHeatMap",
    "click #unarmed" : "armedOrUnarmed",
  },

  usPop: function(){
    var displayStyle = $('.displayType').attr('id');
    if (displayStyle==="heatmaps-selector") {
      this.usPopHeat();
    } else if (displayStyle==="markers-selector") {
      this.usPopMarker();
    } else {
      this.usPopGraph();
    };
  },

  usPopHeat: function(){
    var filteredCollection = this.collection.usPopHeat();
    this.filteredToHeatMap(filteredCollection);
  },

  usPopMarker: function(){
    var filteredCollection = this.collection.usPopMarker();
    this.filteredToGeoMap(filteredCollection);
  },

  usPopGraph: function(){
    alert('fun');
  },

  ageHeatMap: function(e){
    e.preventDefault();
    var ageMin = this.$el.find($('#age-min')).val();
    var ageMax = this.$el.find($('#age-max')).val();
    $('#age-range').children().toggle().css;
    var filteredCollection = this.collection.ageHeatMap(ageMin,ageMax);
    this.filteredToHeatMap(filteredCollection);
  },

  ageMarkMap: function(){
    var filteredCollection = this.collection.ageMarkMap();
    this.filteredToGeoMap(filteredCollection);
  },

  stateViewHeatMap: function(e){
    e.preventDefault();
    var state = this.$el.find('#state-dropdown').val();
    var filteredCollection = this.collection.stateViewHeatMap(state);
    this.filteredToHeatMap(filteredCollection);
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

  filteredToHeatMap: function(filter){
    // filter.listenToOnce(filter, 'reset', makeChart);
    filter.listenToOnce(filter, 'reset', makeHeatMap);
    filter.fetch({reset: true});
  },
});
