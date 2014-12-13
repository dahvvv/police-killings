var labelType, useGradients, nativeTextSupport, animate;

$(function(){

  var ua = navigator.userAgent,
  iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
  typeOfCanvas = typeof HTMLCanvasElement,
  nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
  textSupport = nativeCanvasSupport 
    && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
  

  var Log = {
    elem: false,
    write: function(text){
      if (!this.elem) 
        this.elem = document.getElementById('log');
      this.elem.innerHTML = text;
      this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
    }
  };

  var jsonUnarmed = {
    'label': ['label A'],
    'values': [
      {
        'label': 'unarmed',
        'values': [223]
      }, 
      {
        'label': 'armed',
        'values': [801]
      }
    ]
  };

  var barChart = new $jit.BarChart({
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
  });

  barChart.loadJSON(jsonUnarmed);
});