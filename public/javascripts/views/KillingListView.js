var KillingListView = Backbone.View.extend({

  events: {
    "click #heatmaps-selector" : "heatMap",
    "click #markers-selector" : "markerMap",
    "click #graph-selector" : "graph",
    "click #usPop" : "usPop",
    "click #heatmap" : "usPopHeat",
    "click #markers" : "usPopMarker",
    "submit #age-range" : "ageHeat",
    "click #age-marker" : "ageMarker",
    "change #state" : "stateHeat",
    "click #unarmed" : "armedOrUnarmed",
  },

  heatMap: function(){
    var filter = $('.filter-type').attr('id');
    if (filter==="usPop") {
      this.usPopHeat();
    } else if (filter==="age") {
      this.ageHeat();
    } else if (filter==="state") {
      this.stateHeat();
    };
  },

  markerMap: function(){
    var filter = $('.filter-type').attr('id');
    if (filter==="usPop") {
      this.usPopMarker();
    } else if (filter==="age") {
      this.ageMarker();
    } else if (filter==="state") {
      this.stateMarker();
    };
  },

  graph: function(){
    var filter = $('.filter-type').attr('id');
    if (filter==="usPop") {
      this.usPopGraph();
    } else if (filter==="age") {
      this.ageGraph();
    } else if (filter==="state") {
      this.stateGraph();
    };
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
    debugger;
    var filteredCollection = this.collection.usPopMarker();
    this.filteredToGeoMap(filteredCollection);
  },

  usPopGraph: function(){
    alert('fun');
  },

  ageHeat: function(e){
    e.preventDefault();
    var ageMin = this.$el.find($('#age-min')).val();
    var ageMax = this.$el.find($('#age-max')).val();
    $('#age-range').children().toggle().css;
    var filteredCollection = this.collection.ageHeat(ageMin,ageMax);
    this.filteredToHeatMap(filteredCollection);
  },

  ageMarker: function(){
    var filteredCollection = this.collection.ageMarker();
    this.filteredToGeoMap(filteredCollection);
  },

  ageGraph: function(){
    alert('agegraph!');
  },

  stateHeat: function(e){
    e.preventDefault();
    var state = this.$el.find('#state').val();
    var filteredCollection = this.collection.stateHeat(state);
    this.filteredToHeatMap(filteredCollection);
  },

  stateMarker: function(){
    alert('statemarker!');
  },

  stateGraph: function(){
    alert('stategraph!');
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
