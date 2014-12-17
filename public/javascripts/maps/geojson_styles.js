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


function styleVictimRace(feature){
  return {
    fillColor: raceToFillColor(feature.properties.race),
    radius: 7
  }
};

function styleVictimAge(feature){
  var i = feature.properties.age;
  var lowerBound = 0;
  var upperBound = 107;
  var lowStandDev = 21;
  var highStandDev = 48;
  var regR = 3;
  var maxR = 13;
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
