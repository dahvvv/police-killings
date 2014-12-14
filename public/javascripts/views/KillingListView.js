var KillingListView = Backbone.View.extend({

  events: {
    "click .button-unarmed" : "victimUnarmed",
    "click .button-home" : "home"
  },

  victimUnarmed: function(){
    var context = {
      collection: this.collection,
      filter: "victimUnarmed"
    };
    this.collection.listenToOnce(this.collection, 'reset', makeGeoMap.call(context));
    this.collection.fetch({reset: true});
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
