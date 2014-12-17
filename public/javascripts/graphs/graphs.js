var labelType, useGradients, nativeTextSupport, animate;

function selectGraphData(query){
  switch(query){
    case "city": return cityGraphData();
    case "victim_unarmed": return unarmedGraphData();
    case "victim_age": return ageGraphData();
  }
};

function selectGraphStyle(query){
  switch(query){
    case "victim_unarmed": return unarmedGraphStyle();
    case "victim_age": return ageGraphStyle();
    case "city": return cityGraphStyle();
  }
};

function makeGraph(query){
  var graphData = selectGraphData(query);
  var graphStyle = selectGraphStyle(query);
  var graph = new $jit.BarChart(graphStyle);
  graph.loadJSON(graphData);
};

function emptyGraph(query){
  if ($('#map-one').css('display') != "none") {
    $('#map-one').slideToggle(1000, function(e){
      makeGraph(query);
    });
  } else {
    $('#infovis-canvaswidget').remove();
    makeGraph(query);
  }
};


// function makeChart(){
//   $('#infovis').empty();
//   var query = this.query;
//   var chartStyle = selectChartStyle(query);
//   var chartData = selectChartData(query);
//   if (chartStyle != undefined) {
//     var newChart = new $jit.BarChart(chartStyle);
//     newChart.loadJSON(chartData);
//   };
// };

$(function(){

  var ua = navigator.userAgent,
  iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
  typeOfCanvas = typeof HTMLCanvasElement,
  nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
  textSupport = nativeCanvasSupport 
    && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
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
  
});