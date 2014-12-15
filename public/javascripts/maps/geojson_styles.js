function rScaleLower(i,lowStandDev,regR,maxR){
  var r = ((regR - i)/lowStandDev) * (maxR - regR);
  return r;
};

function rScaleUpper(i,highStandDev,upperBound,regR,maxR){
  var r = ((regR + i)/(upperBound - highStandDev)) * (maxR - regR);
  return r;
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

// color gradient at http://www.w3schools.com/tags/ref_colorpicker.asp
// average is 34.5 and standard dev is 13.5
// so <= 21 and >= 48 deserve measuring /20
function styleVictimAge(feature){
  var x = feature.properties.age;
  var lowStandDev = 21;
  var highStandDev = 48;
  var upperBound = 107;
  var regR = 5;
  var maxR = 10;
  switch(true){
    case (x < 6): return {fillColor: "#0D0000", radius: rScaleLower(x,lowStandDev,regR,maxR)};
    case (x < 11 && x > 5): return {fillColor: "#260000", radius: rScaleLower(x,lowStandDev,regR,maxR)};
    case (x < 16 && x > 10): return {fillColor: "#5A0000", radius: rScaleLower(x,lowStandDev,regR,maxR)};
    case (x < 21 && x > 15): return {fillColor: "#A64D4D", radius: rScaleLower(x,lowStandDev,regR,maxR)};
    case (x < 26 && x > 20): return {fillColor: "#F2E6E6", radius: regR};
    case (x < 31 && x > 25): return {fillColor: "#F2E6E6", radius: regR};
    case (x < 36 && x > 30): return {fillColor: "#F2E6E6", radius: regR};
    case (x < 41 && x > 35): return {fillColor: "#F2E6E6", radius: regR};
    case (x < 46 && x > 40): return {fillColor: "#F2E6E6", radius: rScaleUpper(x,highStandDev,upperBound,regR,maxR)};
    case (x < 51 && x > 45): return {fillColor: "#D9B2B2", radius: rScaleUpper(x,highStandDev,upperBound,regR,maxR)};
    case (x < 57 && x > 50): return {fillColor: "#C08080", radius: rScaleUpper(x,highStandDev,upperBound,regR,maxR)};
    case (x < 62 && x > 56): return {fillColor: "#A64D4D", radius: rScaleUpper(x,highStandDev,upperBound,regR,maxR)};
    case (x < 67 && x > 61): return {fillColor: "#993333", radius: rScaleUpper(x,highStandDev,upperBound,regR,maxR)};
    case (x < 72 && x > 66): return {fillColor: "#8D1919", radius: rScaleUpper(x,highStandDev,upperBound,regR,maxR)};
    case (x < 77 && x > 71): return {fillColor: "#800000", radius: rScaleUpper(x,highStandDev,upperBound,regR,maxR)};
    case (x < 82 && x > 76): return {fillColor: "#730000", radius: rScaleUpper(x,highStandDev,upperBound,regR,maxR)};
    case (x < 87 && x > 81): return {fillColor: "#660000", radius: rScaleUpper(x,highStandDev,upperBound,regR,maxR)};
    case (x < 92 && x > 86): return {fillColor: "#4D0000", radius: rScaleUpper(x,highStandDev,upperBound,regR,maxR)};
    case (x < 97 && x > 91): return {fillColor: "#330000", radius: rScaleUpper(x,highStandDev,upperBound,regR,maxR)};
    case (x < 102 && x > 96): return {fillColor: "#1A0000", radius: rScaleUpper(x,highStandDev,upperBound,regR,maxR)};
    case (x > 101): return {fillColor: "#0D0000", radius: rScaleUpper(x,highStandDev,upperBound,regR,maxR)};
  }
};