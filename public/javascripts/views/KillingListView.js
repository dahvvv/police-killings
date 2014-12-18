var KillingListView = Backbone.View.extend({

  events: {
    // display selectors
    "dblclick #heatmaps-selector" : "heatMap",
    "dblclick #markers-selector" : "markerMap",
    "dblclick #graphs-selector" : "graph",
    // type filters
    "dblclick #usPop-filter" : "usPop",
    "dblclick #race-filter" : "race",
    "dblclick #race-selection" : "raceCheckboxes",
    "dblclick #age-filter" : "age",
    "dblclick #age-range" : "ageHeat",
    "change #state-filter" : "state",
    "click #unarmed" : "armedOrUnarmed",
    // weights
    "dblclick #usPop-weight" : "usPopWeight"
  },


  // methods for grabbing which filters/displays/weights have been selected:

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

  // methods for the DISPLAY styles, to redirect more specifically:

  heatMap: function(){
    var filter = this.detectFilter();
    var weight = this.detectWeight();
    if (weight === "none") {
      switch (filter) {
        case "usPop" : this.usPopHeat();
        case "race" : this.raceCheckboxes();
        case "age" : this.ageHeatDisplay();
        case "state" : this.stateHeat();
      };
    } else {
      switch (filter) {
        case "usPop" : this.usPopHeat();
        case "race" : this.raceCheckboxes();
        case "age" : this.ageHeatDisplay();
        case "state" : this.stateHeat();
      };
    }
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
      };
    } else {
      switch (filter) {
        case "usPop" : this.usPopMarker();
        case "race" : this.raceCheckboxes();
        case "age" : this.ageMarker();
        case "state" : this.stateMarker();
      };
    }
  },

  graph: function(){
    var filter = this.detectFilter();
    var weight = this.detectWeight();
    if (weight === "none") {
      switch (filter) {
        case "usPop" : this.usPopGraph();
        case "race" : this.raceGraph();
        case "age" : this.ageGraph();
        // case "state" : this.stateGraph();
      };
    } else if (weight === "usPop") {
      switch (filter) {
        case "race" : this.raceCheckboxesPopweight();
      };
    } else {
      switch (filter) {
        case "usPop" : this.usPopGraph();
        case "race" : this.raceGraph();
        case "age" : this.ageGraph();
        // case "state" : this.stateGraph();
      };
    }
  },

  // methods for the FILTERS, to redirect them more specifically:


  usPop: function(){
    var display = this.detectDisplayStyle();
    var weight = this.detectWeight();
    if (weight === "none") {
      switch (display) {
        case "heatmap" : this.usPopHeat();
        case "marker" : this.usPopMarker();
        case "graph" : this.usPopGraph();
      };
    } else {
      switch (display) {
        case "heatmap" : this.usPopHeat();
        case "marker" : this.usPopMarker();
        case "graph" : this.usPopGraph();
      };
    }
  },

  race: function(){
    var display = this.detectDisplayStyle();
    if (display != "graph") {
      this.raceDisplay();
    } else {
      this.raceGraph();
    }
  },

  raceDisplay: function(){
    var raceForm = $('#race-selection');
    if ($(raceForm).css('display') === "none") {
      $(raceForm).css({"display":"block"});
    };
  },

  raceCheckboxes: function(){
    var display = this.detectDisplayStyle();
    var weight = this.detectWeight();
    var checkedBoxes = $('#race-selection').children('input:checked');
    var checkedNames = $(checkedBoxes).map(function(){
      return this.name;
    })
    .get();
    var filteredCollection = this.collection.filterByRaces(checkedNames);

    if (weight === "none") {
      switch (display) {
        case "heatmap" : this.raceHeat(filteredCollection);
        case "marker" : this.raceMarker(filteredCollection);
      };
    } else if (weight === "usPop") {
      switch (display) {
        // case "heatmap" : this.usPopHeat();
        case "marker" : this.raceHeatPopweight();
        case "graph" : this.raceGraphPopweight();
      };
    } else {
      switch (display) {
        case "heatmap" : this.raceHeat(filteredCollection);
        case "marker" : this.raceMarker(filteredCollection);
      };
    };
  },

  age: function(){
    var display = this.detectDisplayStyle();
    var weight = this.detectWeight();
    if (weight === "none") {
      switch (display) {
        case "heatmap" : this.ageHeatDisplay();
        case "marker" : this.ageMarker();
        case "graph" : this.ageGraph();
      };
    } else {
      switch (display) {
        case "heatmap" : this.ageHeatDisplay();
        case "marker" : this.ageMarker();
        case "graph" : this.ageGraph();
      };
    }
  },

  ageHeatDisplay: function(){
    var ageForm = $('#age-range');
    if (ageForm.find('label:first-child').css('display') === "none") {
      ageForm.children().toggle().css({"display":"block"});
    };
  },

  state: function(e){
    e.preventDefault();
    var that = this;
    replaceFilter(that);
    var display = this.detectDisplayStyle();
    var weight = this.detectWeight();
    if (weight === "none") {
      switch (display) {
        case "heatmap" : this.stateHeat();
        case "marker" : this.stateMarker();
        // case "graph" : this.stateGraph();
      };
    } else {
      switch (display) {
        case "heatmap" : this.stateHeat();
        case "marker" : this.stateMarker();
        // case "graph" : this.stateGraph();
      };
    }
  },

  armedOrUnarmed: function(){
    var filteredCollection = this.collection.armedOrUnarmedKillings();
    this.filteredToGeoMap(filteredCollection);
  },

  // methods for WEIGHTS, to redirect the more specifically

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

  /////// methods for settings to call upon their info (aka filter) (or call it and use it, if display === graph)

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

  usPopGraph: function(){
    this.graphProgram("city");
    emptyGraph("city");
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

  raceGraph: function(){
    this.graphProgram("race");
    emptyGraph("race");
  },

  raceHeatPopweight: function(){
    debugger;
  },

  raceMarkerPopweight: function(){
    debugger;
  },

  raceGraphPopweight: function(){
    this.graphProgram("race_popWeight");
    emptyGraph("race_popWeight");
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

  ageGraph: function(){
    this.graphProgram("age");
    emptyGraph("age");
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

///////AAAAND calling it

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

});
