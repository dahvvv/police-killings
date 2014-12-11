var KillingListView = Backbone.View.extend({

  initialize: function(){
    this.collection.on('change', this.addOne, this);
  },

  render: function(){
    this.$el.empty();
    this.collection.forEach(this.addOne, this);
  },

  addOne: function(killing){
    alert('changed');
    var killingView = new KillingView({model: killing});
    this.$el.append(killingView.render().el);
  }
});
