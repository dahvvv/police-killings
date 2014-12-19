function rScaleLower(i,lowerBound,lowStandDev,regR,maxR){
  var r = Math.floor(((lowStandDev - i)/lowStandDev) * (maxR - regR) + regR);
  return r;
};

function rScaleUpper(i,upperBound,highStandDev,regR,maxR){
  var r = Math.floor(((i - highStandDev)/highStandDev) * (maxR - regR) + regR);
  return r;
};

function colorScaleLower(i,lowerBound,lowStandDev,regRGB,maxRGB){
  var r = Math.floor(((lowStandDev - i)/lowStandDev) * (maxRGB.r - regRGB.r) + regRGB.r);
  var g = Math.floor(((lowStandDev - i)/lowStandDev) * (maxRGB.g - regRGB.g) + regRGB.g);
  var b = Math.floor(((lowStandDev - i)/lowStandDev) * (maxRGB.b - regRGB.b) + regRGB.b);
  var color = "rgb(" + r + "," + g + "," + b + ")";
  return color;
};

function colorScaleUpper(i,upperBound,highStandDev,regRGB,maxRGB){
  var r = Math.floor(((i - highStandDev)/highStandDev) * (maxRGB.r - regRGB.r) + regRGB.r);
  var g = Math.floor(((i - highStandDev)/highStandDev) * (maxRGB.g - regRGB.g) + regRGB.g);
  var b = Math.floor(((i - highStandDev)/highStandDev) * (maxRGB.b - regRGB.b) + regRGB.b);
  var color = "rgb(" + r + "," + g + "," + b + ")";
  return color;
};

function raceToFillColor(race){
  switch (race) {
    case "alaskan and/or pacific islander": return "red";
    case "asian": return "orange";
    case "black": return "yellow";
    case "hispanic and/or latin": return "green";
    case "white": return "blue";
    case "other": return "purple";
  }
};

// each race's multiplier is the average race percent-slice of the population divided by that race's percent-slice of the population
function racePopweightToRadius(race){
  var regR = 7;
  var scaler = 0.2;  // scaler of 0 means no scaling, scale of 1 means everything is scaled down to its regR value
  switch (race) {
    case "alaskan and/or pacific islander": return Math.floor(regR * (13.9 - ((13.9 - 1)*scaler)));
    case "asian": return Math.floor(regR * (3.1 - ((3.1 - 1)*scaler)));
    case "black": return Math.floor(regR * (1.2 - ((1.2 - 1)*scaler)));
    case "hispanic and/or latin": return Math.floor(regR * (1));
    case "white": return Math.floor(regR * (0.2 + ((1-0.2)*scaler)));
    case "other": return Math.floor(regR * (6.9 - ((6.9-1)*scaler)));
  }
};

// each race's multiplier is their percentage-slice of the u.s. annual arrest record, divided by their percentage-slice of people who get killed by police
function raceArrestsweightToRadius(race){
  var regR = 7;
  var scaler = 0.5;  // scaler of 0 means no scaling, scale of 1 means everything is scaled down to its regR value
  switch (race) {
    case "alaskan and/or pacific islander": return Math.floor(regR * (9.8 - ((9.8 - 1)*scaler)));
    case "asian": return Math.floor(regR * (13.9 - ((13.9 - 1)*scaler)));
    case "black": return Math.floor(regR * (0.5 + ((1 - 0.5)*scaler)));
    case "hispanic and/or latin": return Math.floor(regR * 1);
    case "white": return Math.floor(regR * (0.2 + ((1 - 0.2)*scaler)));
    case "other": return Math.floor(regR * 1);
  }
};


function styleVictimRace(feature){
  return {
    fillColor: raceToFillColor(feature.properties.race),
    color: '#646668',
    radius: 7,
  }
};

function styleVictimRacePopweight(feature){
  return {
    fillColor: raceToFillColor(feature.properties.race),
    color: '#646668',
    radius: racePopweightToRadius(feature.properties.race),
  }
};

function styleVictimRaceArrestsweight(feature){
  return {
    fillColor: raceToFillColor(feature.properties.race),
    color: '#646668',
    radius: raceArrestsweightToRadius(feature.properties.race),
  }
};

function styleVictimAge(feature){
  var i = feature.properties.age;
  var lowerBound = 0;
  var upperBound = 107;
  var lowStandDev = 21;
  var highStandDev = 48;
  var regR = 3;
  var maxR = 16;
  var regRGB = {r: 0, g: 76, b: 153};
  var maxRGB = {r: 255, g: 51, b: 51};
  if (i < lowStandDev) {
    return {
      fillColor: colorScaleLower(i,lowerBound,lowStandDev,regRGB,maxRGB),
      radius: rScaleLower(i,lowerBound,lowStandDev,regR,maxR)
    };
  } else if (i >= lowStandDev && i <= highStandDev) {
    var r = regRGB.r;
    var g = regRGB.g;
    var b = regRGB.b;
    return {
      fillColor: "rgb(" + r + "," + g + "," + b + ")",
      radius: regR
    }
  } else if (i > highStandDev) {
    return {
      fillColor: colorScaleUpper(i,upperBound,highStandDev,regRGB,maxRGB),
      radius: rScaleUpper(i,upperBound,highStandDev,regR,maxR)
    }
  }
};

function styleVictimUnarmed(feature){
  switch (feature.properties.unarmed){
    case true: return {fillColor: 'black'};
    case false: return {
      fillColor: 'lightblue',
      radius: 15
    };
  }
};
