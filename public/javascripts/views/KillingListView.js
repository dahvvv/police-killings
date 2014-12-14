var KillingListView = Backbone.View.extend({

  initialize: function(){
    this.listenTo(this.collection.models, 'sync', this.render);
  },

  render: function(){
    alert('synced!');
    this.$el.empty();
    this.collection.forEach(this.addOne, this);
  },

  addOne: function(killing){
    alert('changed');
    var killingView = new KillingView({model: killing});
    this.$el.append(killingView.render().el);
  }
});
