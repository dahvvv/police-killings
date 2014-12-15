function unarmedChartStyle(){
  var style = {
    injectInto: 'infovis',
    animate: true,
    orientation: 'vertical',
    barsOffset: 20,
    Margin: {
      top:5,
      left: 5,
      right: 5,
      bottom:5
    },
    labelOffest: 5,
    type: useGradients? 'stacked:gradient' : 'stacked',
    showAggregates: true,
    showLabels: true,
    Label: {
      type: labelType,
      size: 13,
      family: 'Arial',
      color: 'white'
    },
    Tips: {
      enable: true,
      onShow: function(tip, elem) {
        tip.innerHTML = "<b>" + elem.name + "</b>: " + elem.value;
      }
    },
  };
  return style;
};