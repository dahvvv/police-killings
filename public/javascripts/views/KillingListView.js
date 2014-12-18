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
    "dblclick #usPop-weight" : "usPopWeight"
  },

  detectDisplayStyle: function(){
    var displayStyle = $('.display-type').attr('id');
    if (displayStyle==="heatmaps-selector") {
      return "heatmap";
    } else if (displayStyle==="markers-selector") {
      return "marker";
    } else {
      return "graph";
    };
  },

  detectFilter: function(){
    var filter = $('.filter-type').attr('id');
    if (filter==="usPop-filter") {
      return "usPop";
    } else if (filter==="race-filter") {
      return "race";
    } else if (filter==="age-filter") {
      return "age";
    } else if (filter==="state-filter") {
      return "state";
    };
  },

  detectWeight: function(){
    var weight = $('.weight-type').attr('id');
    if (weight===undefined) {
      return "none";
    } else if (weight==="usPop-weight") {
      return "usPop";
    } else if (weight==="race-weight") {
      return "race";
    } else if (weight==="age-weight") {
      return "age";
    } else if (weight==="state-weight") {
      return "state";
    };
  },

  heatMap: function(){
    var filter = $('.filter-type').attr('id');
    if (filter==="usPop-filter") {
      this.usPopHeat();
    } else if (filter==="race-filter") {
      this.raceCheckboxes();
    } else if (filter==="age-filter") {
      this.ageHeatDisplay();
    } else if (filter==="state-filter") {
      this.stateHeat();
    };
  },

  markerMap: function(){
    var filter = this.detectFilter();
    var weight = this.detectWeight();
    if (weight === "none") {
      switch (filter) {
        case "usPop" : this.usPopMarker();
        case "race" : this.raceCheckboxes();
        case "age" : this.ageMarker();
        case "state" : this.stateMarker();
      };
    } else if (weight === "usPop") {
      switch (filter) {
        case "race" : this.raceCheckboxesPopweight();
      }
    }
  },

  graph: function(){
    var filter = $('.filter-type').attr('id');
    if (filter==="usPop-filter") {
      this.graphProgram("city");
      emptyGraph("city");
    } else if (filter==="race-filter") {
      this.graphProgram("race");
      emptyGraph("race");
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
    var checkedBoxes = $('#race-selection').children('input:checked');
    var checkedNames = $(checkedBoxes).map(function(){
      return this.name;
    })
    .get();
    var filteredCollection = this.collection.filterByRaces(checkedNames);
    var displayStyle = $('.display-type').attr('id');
    if (displayStyle==="heatmaps-selector") {
      this.raceHeat(filteredCollection);
    } else if (displayStyle==="markers-selector") {
      this.raceMarker(filteredCollection);
    };
  },

  raceCheckboxesPopweight: function(){
    debugger;
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
    var that = this;
    replaceFilter(that);
    var displayStyle = $('.display-type').attr('id');
    if (displayStyle==="heatmaps-selector") {
      this.stateHeat();
    } else if (displayStyle==="markers-selector") {
      this.stateMarker();
    };
  },

  usPopWeight: function(){
    var display = this.detectDisplayStyle();
    var filter = this.detectFilter();
    if (display === "heatmap") {
      // switch (filter) {
      //   case "race" : this.raceHeatPopweight();
      //   case "age" : this.ageHeatPopweight();
      //   case "state" : this.stateHeatPopweight();
      // };
    } else if (display === "marker") {
      // switch (filter) {
      //   case "race" : this.raceMarkerPopweight();
      //   case "age" : this.ageMarkerPopweight();
      //   case "state" : this.stateMarkerPopweight();
      // };
    } else if (display === "graph") {
      switch (filter) {
        case "race" : this.raceGraphPopweight();
        // case "age" : this.ageGraphPopweight();
        // case "state" : this.stateGraphPopweight();
      };
    }
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

  raceHeat: function(filteredCollection){
    this.$el.find($('.program-text')).text(programs.heatmaps["race"]);
    filteredCollection.listenToOnce(filteredCollection, 'change', makeHeatMap);
    filteredCollection.trigger('change');
  },

  raceMarker: function(filteredCollection){
    this.$el.find($('.program-text')).text(programs.markermaps["race"]);
    filteredCollection.listenToOnce(filteredCollection, 'change', setRaceQuery);
    filteredCollection.trigger('change');
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

  raceGraphPopweight: function(){
    this.graphProgram("race_popWeight");
    emptyGraph("race_popWeight");
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
