function raceGraphStyle(){
  var style = {
    injectInto: 'infovis',
    animate: true,
    orientation: 'horizontal',
    barsOffset: 10,
    Margin: {
      top:5,
      left: 0,
      right: 15,
      bottom:5
    },
    labelOffest:5,
    type: 'stacked:gradient',
    showAggregates: true,
    showLabels: true,
    Label: {
      type: 'HTML',
      size: 12,
      family: 'Helvetica',
      color: '#c8cdcf',
      // weight: 'bold'
    },
    Tips: {
      enable: true,
      onShow: function(tip, elem) {
        tip.innerHTML = elem.label + ": " + (Number((elem.value/2450).toFixed(3))*100) + "%";
      }
    },
  };
  return style;
};

function cityGraphStyle(){
  var style = {
    injectInto: 'infovis',
    animate: true,
    orientation: 'horizontal',
    barsOffset: 10,
    Margin: {
      top:5,
      left: 0,
      right: 15,
      bottom:5
    },
    labelOffest:5,
    type: 'stacked:gradient',
    showAggregates: true,
    showLabels: true,
    Label: {
      type: 'HTML',
      size: 12,
      family: 'Helvetica',
      color: '#c8cdcf',
      // weight: 'bold'
    },
    Tips: {
      enable: true,
      onShow: function(tip, elem) {
        tip.innerHTML = elem.value + " people killed in " + elem.label;
      }
    },
  };
  return style;
};

function ageGraphStyle(){
  var style = {
    injectInto: 'infovis',
    animate: true,
    orientation: 'vertical',
    barsOffset: 0,
    Margin: {
      top:2,
      left: 0,
      right: 0,
      bottom:2
    },
    labelOffest: 0,
    type: 'stacked:gradient',
    showAggregates: false,
    showLabels: function(i){
      if (i%10===0) {
        return true
      } else {
        return false
      }
    },
    Label: {
      type: 'HTML',
      size: 13,
      family: 'Helvetica',
      color: 'white',
      weight: 'bold'
    },
    Tips: {
      enable: true,
      onShow: function(tip, elem) {
        tip.innerHTML = "<p>Age: " + elem.label + "</p><p>Total: " + elem.value;
      }
    },
  };
  return style;
};

function unarmedGraphStyle(){
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
      color: 'black'
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