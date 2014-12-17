var KillingListView = Backbone.View.extend({

  events: {
    "change #heatmaps-selector" : "heatMap",
    "change #markers-selector" : "markerMap",
    "change #graphs-selector" : "graph",
    "click #usPop-filter" : "usPop",
    "click #age-filter" : "age",
    "submit #age-range" : "ageHeat",
    "change #state" : "stateHeat",
    "click #unarmed" : "armedOrUnarmed",
  },

  heatMap: function(){
    var filter = $('.filter-type').attr('id');
    if (filter==="usPop-filter") {
      this.usPopHeat();
    } else if (filter==="age-filter") {
      this.ageHeat();
    } else if (filter==="state-filter") {
      this.stateHeat();
    };
  },

  markerMap: function(){
    var filter = $('.filter-type').attr('id');
    if (filter==="usPop-filter") {
      this.usPopMarker();
    } else if (filter==="age-filter") {
      this.ageMarker();
    } else if (filter==="state-filter") {
      this.stateMarker();
    };
  },

  graph: function(){
    var filter = $('.filter-type').attr('id');
    if (filter==="usPop-filter") {
      this.graphProgram("city");
      emptyGraph("city");
    // } else if (filter==="age-filter") {
    //   this.ageGraph();
    // } else if (filter==="state-filter") {
    //   this.stateGraph();
    };
  },

  usPop: function(){
    var displayStyle = $('.displayType').attr('id');
    if (displayStyle==="heatmaps-selector") {
      this.usPopHeat();
    } else if (displayStyle==="markers-selector") {
      this.usPopMarker();
    } else {
      makeGraph("city");
    };
  },

  age: function(){
    var displayStyle = $('.displayType').attr('id');
    if (displayStyle==="heatmaps-selector") {
      return null
    } else if (displayStyle==="markers-selector") {
      this.ageMarker();
    } else {
      this.ageGraph();
    };
  },

  usPopHeat: function(){
    var filteredCollection = this.collection.usPopHeat();
    this.$el.find($('.program-text')).text(filteredCollection.program);
    this.filteredToHeatMap(filteredCollection);
  },

  usPopMarker: function(){
    var filteredCollection = this.collection.usPopMarker();
    this.$el.find($('.program-text')).text(filteredCollection.program);
    this.filteredToGeoMap(filteredCollection);
  },

  // usPopGraph: function(){
  //   var filteredCollection = this.collection.usPopGraph();
  //   this.filteredToGraph(filteredCollection);
  // },

  ageHeat: function(){
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
    var filteredCollection = this.collection.ageGraph();
    this.filteredToGraph(filteredCollection);
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
    // filter.listenToOnce(filter, 'reset', makeChart);
    filter.listenToOnce(filter, 'reset', makeGeoMap);
    filter.fetch({reset: true});
  },

  filteredToHeatMap: function(filter){
    // filter.listenToOnce(filter, 'reset', makeChart);
    filter.listenToOnce(filter, 'reset', makeHeatMap);
    filter.fetch({reset: true});
  },

  graphProgram: function(query){
    if (query === "city"){
      this.$el.find($('.program-text')).text(programs.graphs.us_pop);
    }
  },

  // filteredToGraph: function(filter){
  //   filter.listenToOnce(filter, 'reset', makeGraph);
  //   filter.fetch({reset: true});
  // },
});
