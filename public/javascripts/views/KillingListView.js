var KillingListView = Backbone.View.extend({

  events: {
    "click .button-unarmed" : "armedOrUnarmed",
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

  // initialize: function(){
  //   // this.listenTo(this.collection.models, 'sync', this.render);
  //   this.collection.on('reset', this.addAll, this);
  // },

  // render: function(){
  //   alert('renderin da collection');
    // this.$el.empty();
  //   this.collection.forEach(this.addOne, this);
  // },

  // addAll: function(){
  //   this.collection.forEach(this.addOne, this);
  // },

  // addOne: function(killing){
  //   var killingView = new KillingView({model: killing, el: $('body')});
  //   killingView.render();
    // this.$el.append(killingView.render().el);
  // }
});
