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
    "dblclick #usPop-weight" : "usPopWeightDetector",
    "dblclick #arrests-weight" : "arrestsWeightDetector"
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
    } else if (weight==="arrests-weight") {
      return "arrests";
    };
  },

  // methods for the DISPLAY styles, to redirect more specifically:

  heatMap: function(){
    var filter = this.detectFilter();
    var weight = this.detectWeight();
    if (weight === "none") {
      if (filter === "usPop") {
        this.usPopHeat();
      } else if (filter === "race") {
        this.raceCheckboxes();
      } else if (filter === "age") {
        this.ageHeatDisplay();
      } else if (filter === "state") {
        this.stateHeat();
      }
    } else if (weight === "usPop") {
      if (filter === "race") {
        this.raceCheckboxes();
      }
    } else {
      if (filter === "usPop") {
        this.usPopHeat();
      } else if (filter === "race") {
        this.raceCheckboxes();
      } else if (filter === "age") {
        this.ageHeatDisplay();
      } else if (filter === "state") {
        this.stateHeat();
      }
    }
  },

  markerMap: function(){
    var filter = this.detectFilter();
    var weight = this.detectWeight();
    if (weight === "none") {
      if (filter === "usPop") {
        this.usPopMarker();
      } else if (filter === "race") {
        this.raceCheckboxes();
      } else if (filter === "age") {
        this.ageMarker();
      } else if (filter === "state") {
        this.stateMarker();
      }
    } else if (weight === "usPop") {
      if (filter === "race") {
        this.raceCheckboxes();
      }
    } else {
      if (filter === "usPop") {
        this.usPopMarker();
      } else if (filter === "race") {
        this.raceCheckboxes();
      } else if (filter === "age") {
        this.ageMarker();
      } else if (filter === "state") {
        this.stateMarker();
      }
    }
  },

  graph: function(){
    var filter = this.detectFilter();
    var weight = this.detectWeight();
    if (weight === "none") {
      if (filter === "usPop") {
        this.usPopGraph();
      } else if (filter === "race") {
        this.raceGraph();
      } else if (filter === "age") {
        this.ageGraph();
      // } else if (filter === "state") {
      //   this.stateGraph();
      }
    } else if (weight === "usPop") {
      if (filter === "race") {
        this.raceGraphPopweight();
      }
    } else if (weight === "arrests") {
      if (filter === "race") {
        this.raceGraphArrestsweight();
      }
    } else {
      if (filter === "usPop") {
        this.usPopGraph();
      } else if (filter === "race") {
        this.raceGraph();
      } else if (filter === "age") {
        this.ageGraph();
      // } else if (filter === "state") {
      //   this.stateGraph();
      };
    }
  },


  // methods for the FILTERS, to redirect them more specifically:


  usPop: function(){
    var display = this.detectDisplayStyle();
    var weight = this.detectWeight();
    if (weight === "none") {
      if (display === "heatmap") {
        this.usPopHeat();
      } else if (display === "marker") {
        this.usPopMarker();
      } else if (display === "graph") {
        this.usPopGraph();
      }
    } else {
      if (display === "heatmap") {
        this.usPopHeat();
      } else if (display === "marker") {
        this.usPopMarker();
      } else if (display === "graph") {
        this.usPopGraph();
      }
    };
  },

  race: function(){
    var display = this.detectDisplayStyle();
    var weight = this.detectWeight();
    if (display != "graph") {
      this.raceDisplay();
    } else {
      if (weight === "none") {
        this.raceGraph();
      } else if (weight === "usPop") {
        this.raceGraphPopweight();
      } else if (weight === "arrests") {
        this.raceGraphArrestsweight();
      }      
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
      if (display === "heatmap") {
        this.raceHeat(filteredCollection);
      } else if (display === "marker") {
        this.raceMarker(filteredCollection);
      }
    } else if (weight === "usPop") {
      if (display === "heatmap") {
        this.raceHeatPopweight(filteredCollection);
      } else if (display === "marker") {
        this.raceMarkerPopweight(filteredCollection);
      } else if (display === "graph") {
        this.raceGraphPopweight();
      }
    } else if (weight === "arrests") {
      if (display === "graph") {
        this.raceGraphArrestsweight();
      }
    } else {
      if (display === "heatmap") {
        this.raceHeat(filteredCollection);
      } else if (display === "marker") {
        this.raceMarker(filteredCollection);
      }
    };
  },

  age: function(){
    var display = this.detectDisplayStyle();
    var weight = this.detectWeight();
    if (weight === "none") {
      if (display === "heatmap") {
        this.ageHeatDisplay();
      } else if (display === "marker") {
        this.ageMarker();
      } else if (display === "graph") {
        this.ageGraph();
      }
    } else {
      if (display === "heatmap") {
        this.ageHeatDisplay();
      } else if (display === "marker") {
        this.ageMarker();
      } else if (display === "graph") {
        this.ageGraph();
      }
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
      if (display === "heatmap") {
        this.stateHeat();
      } else if (display === "marker") {
        this.stateMarker();
      // } else if (display === "graph") {
      //   this.stateGraph();
      }
    } else {
      if (display === "heatmap") {
        this.stateHeat();
      } else if (display === "marker") {
        this.stateMarker();
      // } else if (display === "graph") {
      //   this.stateGraph();
      }
    }
  },

  armedOrUnarmed: function(){
    var filteredCollection = this.collection.armedOrUnarmedKillings();
    this.filteredToGeoMap(filteredCollection);
  },

  // methods for WEIGHTS, to redirect the more specifically

  usPopWeightDetector: function(){
    var weight = this.detectWeight();
    if (weight === "usPop") {
      this.usPopWeight();
    } else {
      this.couldGoAnywhere();
    }
  },

  usPopWeight: function(){
    var display = this.detectDisplayStyle();
    var filter = this.detectFilter();
    if (display === "heatmap") {
      if (filter === "race") {
        this.raceCheckboxes();
      }
      // switch (filter) {
      //   case "race" : this.raceHeatPopweight();
      //   case "age" : this.ageHeatPopweight();
      //   case "state" : this.stateHeatPopweight();
      // };
    } else if (display === "marker") {
      if (filter === "race") {
        this.raceCheckboxes();
      }
      // switch (filter) {
      //   case "age" : this.ageMarkerPopweight();
      //   case "state" : this.stateMarkerPopweight();
      // };
    } else if (display === "graph") {
      if (filter === "race") {
        this.raceGraphPopweight();
      // } else if (filter === "age") {
      //   this.ageGraphPopweight();
      // } else if (filter === "state") {
      //   this.stateGraphPopweight();
      }
    }
  },

  arrestsWeightDetector: function(){
    var weight = this.detectWeight();
    if (weight === "arrests") {
      this.arrestsWeight();
    } else {
      this.couldGoAnywhere();
    }
  },

  arrestsWeight: function(){
    var display = this.detectDisplayStyle();
    var filter = this.detectFilter();
    if (display === "graph") {
      if (filter === "race") {
        this.raceGraphArrestsweight();
      }
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

  raceHeatPopweight: function(filteredCollection){
    this.$el.find($('.program-text')).text(programs.heatmaps["race_popWeight"]);
    filteredCollection.listenToOnce(filteredCollection, 'change', makeHeatMap);
    filteredCollection.trigger('change');
  },

  raceMarkerPopweight: function(filteredCollection){
    this.$el.find($('.program-text')).text(programs.markermaps["race_popWeight"]);
    filteredCollection.listenToOnce(filteredCollection, 'change', setRacePopweightQuery);
    filteredCollection.trigger('change');
  },

  raceGraphPopweight: function(){
    this.graphProgram("race_popWeight");
    emptyGraph("race_popWeight");
  },

  raceGraphArrestsweight: function(){
    this.graphProgram("arrestsWeight");
    emptyGraph("arrestsWeight");
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

  couldGoAnywhere: function(){
    var display = this.detectDisplayStyle();
    var filter = this.detectFilter();
    var weight = this.detectWeight();
    if (display === "heatmap") {
      this.heatMap();
    } else if (display === "marker") {
      this.markerMap();
    } else if (display === "graph") {
      this.graph();
    }
  },

});
