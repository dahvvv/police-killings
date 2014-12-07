var KillingListView = Backbone.View.extend({
  render: function(){
    this.$el.empty();

    for (var i = 0; i < 3; i++) {
      var killing = _.sample(this.collection.models);
      var view = new KillingView({model: killing});
      this.$el.append(view.render().$el);
    };
    return this;
  }
});
