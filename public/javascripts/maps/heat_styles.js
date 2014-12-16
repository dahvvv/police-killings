var gradientMain = {
  0: 'black',
  0.3: 'purple',
  0.4: 'blue',
  0.5: 'green',
  0.9: 'yellow',
  0.995: 'orange',
  1: 'red'
};

var gradientStateView = {
  0: 'purple',
  0.1: 'blue',
  0.2: 'green',
  0.4: 'yellow',
  1: 'red'
};

var gradientAgeRange = {
  0: 'black',
  0.1: 'purple',
  0.25: 'blue',
  0.4: 'green',
  0.6: 'yellow',
  1: 'red'
}

function setMaxZoom(numDatapoints){
  switch (true){
    case (numDatapoints <= 10): return 1;
    case (numDatapoints > 10 && numDatapoints <= 35): return 4;
    case (numDatapoints > 35 && numDatapoints <= 130): return 5;
    case (numDatapoints > 130 && numDatapoints <= 350) : return 6;
    case (numDatapoints > 350 && numDatapoints <= 750): return 7;
    case (numDatapoints > 750 && numDatapoints <= 1750): return 8;
    default: return 10
  }
};