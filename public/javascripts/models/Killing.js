var Killing = Backbone.Model.extend({
  urlRoot: '/api/killings',
  defaults: {
    visible: true,
    color: 'red'
  },

  toggleVisibility: function(){
    if (this.get('visible')===true) {
      this.set({'visible': false})
    } else {
      this.set({'visible': true})
    };
  }
})
