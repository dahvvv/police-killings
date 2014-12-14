var gradient1 = {
  0: 'purple',
  0.6: 'blue',
  0.8: 'green',
  0.98: 'yellow',
  1: 'red'
};

var gradient2 = {
  0: 'green',
  0.5: 'darkgreen',
  0.75: 'orange',
  0.8: 'brown',
  1: 'black'
};

function randomCoords(){
  var randomCoords = [];
  for (i = 0; i < 700; i++) {
    var lat = (Math.random()*44)+20;
    var lng = (Math.random()*100)-165;
    randomCoords.push([lat,lng]);
  };
  return randomCoords;
};

