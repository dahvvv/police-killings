var gradientMain = {
  0: 'purple',
  0.15: 'blue',
  0.25: 'lightblue',
  0.35: 'green',
  0.85: 'yellow',
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
};

function selectGradient(query){
  if (query === "state") {
    return gradientStateView;
  } else {
    return gradientMain;
  }
};

function setMaxZoom(numDatapoints, query){
  if (query === "state") {
    if (numDatapoints > 25) {
      return 10;
    } else if (numDatapoints <= 25 && numDatapoints > 30) {
      return 9;
    } else if (numDatapoints <= 30 && numDatapoints > 35) {
      return 8;
    } else if (numDatapoints <= 35 && numDatapoints > 40) {
      return 7;
    } else if (numDatapoints <= 40 && numDatapoints > 50) {
      return 5;
    } else {
      return 3;
    }
  } else {
    switch (true) {
      case (numDatapoints <= 10): return 1;
      case (numDatapoints > 10 && numDatapoints <= 35): return 4;
      case (numDatapoints > 35 && numDatapoints <= 130): return 5;
      case (numDatapoints > 130 && numDatapoints <= 350) : return 6;
      case (numDatapoints > 350 && numDatapoints <= 750): return 7;
      case (numDatapoints > 750 && numDatapoints <= 1750): return 8;
      default: return 10
    }
  }
  
};