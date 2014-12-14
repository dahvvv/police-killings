var gradient1 = {
  0: 'transparent',
  0.5: 'blue',
  0.75: 'red',
  0.8: 'yellow',
  1: 'white'
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

