var KillingListView = Backbone.View.extend({

  events: {
    "dblclick #heatmaps-selector" : "heatMap",
    "dblclick #markers-selector" : "markerMap",
    "dblclick #graphs-selector" : "graph",
    "dblclick #usPop-filter" : "usPop",
    "dblclick #race-filter" : "race",
    "dblclick #race-selection" : "raceCheckboxes",
    "dblclick #age-filter" : "age",
    "dblclick #age-range" : "ageHeat",
    "change #state-filter" : "state",
    "click #unarmed" : "armedOrUnarmed",
  },

  heatMap: function(){
    var filter = $('.filter-type').attr('id');
    if (filter==="usPop-filter") {
      this.usPopHeat();
    } else if (filter==="age-filter") {
      this.ageHeatDisplay();
    } else if (filter==="state-filter") {
      this.stateHeat();
    };
  },

  markerMap: function(){
    var filter = $('.filter-type').attr('id');
    if (filter==="usPop-filter") {
      this.usPopMarker();
    } else if (filter==="race-filter") {
      this.raceMarker();
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
    } else if (filter==="age-filter") {
      this.graphProgram("age");
      emptyGraph("age");
    };
  },

  usPop: function(){
    var displayStyle = $('.display-type').attr('id');
    if (displayStyle==="heatmaps-selector") {
      this.usPopHeat();
    } else if (displayStyle==="markers-selector") {
      this.usPopMarker();
    } else {
      this.graphProgram("city");
      emptyGraph("city");
    };
  },

  race: function(){
    var displayStyle = $('.display-type').attr('id');
    if (displayStyle==="heatmaps-selector" || displayStyle==="markers-selector") {
      this.raceDisplay();
    } else {
      alert("make a race graph!");
      // this.graphProgram("race");
      // emptyGraph("race");
    }
  },

  raceCheckboxes: function(){
    var displayStyle = $('.display-type').attr('id');
    if (displayStyle==="heatmaps-selector") {
      this.raceHeat();
    } else if (displayStyle==="markers-selector") {
      this.raceMarker();
    };
  },

  age: function(){
    var displayStyle = $('.display-type').attr('id');
    if (displayStyle==="heatmaps-selector") {
      this.ageHeatDisplay();
    } else if (displayStyle==="markers-selector") {
      this.ageMarker();
    } else {
      this.graphProgram("age");
      emptyGraph("age");
    };
  },

  state: function(e){
    e.preventDefault();
    var displayStyle = $('.display-type').attr('id');
    if (displayStyle==="heatmaps-selector") {
      this.stateHeat();
    } else if (displayStyle==="markers-selector") {
      this.stateMarker();
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

  raceDisplay: function(){
    var raceForm = $('#race-selection');
    if ($(raceForm).css('display') === "none") {
      $(raceForm).css({"display":"block"});
    };
  },

  raceHeat: function(){
    var checkedBoxes = $('#race-selection').children('input:checked');
    var checkedNames = $(checkedBoxes).map(function(){
      return this.name;
    })
    .get();
    var filteredCollection = this.collection.raceHeat(checkedNames);
    debugger;
    this.$el.find($('.program-text')).text(filteredCollection.program);
    this.filteredToHeatMap(filteredCollection);
  },

  raceMarker: function(){
    var filteredCollection = this.collection.raceMarker();
    this.$el.find($('.program-text')).text(filteredCollection.program);
    this.filteredToGeoMap(filteredCollection);
  },

  ageHeatDisplay: function(){
    var ageForm = $('#age-range');
    if (ageForm.find('label:first-child').css('display') === "none") {
      ageForm.children().toggle().css({"display":"block"});
    };
  },

  ageHeat: function(){
    var ageMin = this.$el.find($('#age-min')).val();
    var ageMax = this.$el.find($('#age-max')).val();
    var filteredCollection = this.collection.ageHeat(ageMin,ageMax);
    this.$el.find($('.program-text')).text(filteredCollection.program);
    this.filteredToHeatMap(filteredCollection);
  },

  ageMarker: function(){
    var filteredCollection = this.collection.ageMarker();
    this.$el.find($('.program-text')).text(filteredCollection.program);
    this.filteredToGeoMap(filteredCollection);
  },

  stateHeat: function(){
    var state = this.$el.find('#state-filter').val();
    var filteredCollection = this.collection.stateHeat(state);
    this.$el.find($('.program-text')).text(filteredCollection.program);

    this.filteredToHeatMap(filteredCollection);
  },

  stateMarker: function(){
    var state = this.$el.find('#state-filter').val();
    var filteredCollection = this.collection.stateMarker(state);
    this.$el.find($('.program-text')).text(filteredCollection.program);
    this.filteredToGeoMap(filteredCollection);
  },

  armedOrUnarmed: function(){
    var filteredCollection = this.collection.armedOrUnarmedKillings();
    this.filteredToGeoMap(filteredCollection);
  },

  filteredToHeatMap: function(filter){
    filter.listenToOnce(filter, 'reset', makeHeatMap);
    filter.fetch({reset: true});
  },
  
  filteredToGeoMap: function(filter){
    filter.listenToOnce(filter, 'reset', makeGeoMap);
    filter.fetch({reset: true});
  },

  graphProgram: function(query){
    this.$el.find($('.program-text')).html(programs.graphs[query]);
  },

  // filteredToGraph: function(filter){
  //   filter.listenToOnce(filter, 'reset', makeGraph);
  //   filter.fetch({reset: true});
  // },
});
