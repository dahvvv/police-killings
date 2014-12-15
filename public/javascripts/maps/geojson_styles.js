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
  switch(true){
    case (x < 6): return {fillColor: "#FFFFFF", radius: (5 + (Math.abs(x  -21)) * 0.3)};
    case (x < 11 && x > 5): return {fillColor: "#FAE6F0", radius: (5 + (Math.abs(x  -21)) * 0.3)};
    case (x < 16 && x > 10): return {fillColor: "#F5CCE0", radius: (5 + (Math.abs(x  -21)) * 0.3)};
    case (x < 21 && x > 15): return {fillColor: "#F0B2D1", radius: (5 + (Math.abs(x  -21)) * 0.3)};
    case (x < 26 && x > 20): return {fillColor: "#EB99C2", radius: 5};
    case (x < 31 && x > 25): return {fillColor: "#E680B2", radius: 5};
    case (x < 36 && x > 30): return {fillColor: "#E066A3", radius: 5};
    case (x < 41 && x > 35): return {fillColor: "#DB4D94", radius: 5};
    case (x < 46 && x > 40): return {fillColor: "#D63385", radius: 5};
    case (x < 51 && x > 45): return {fillColor: "#D11975", radius: 5};
    case (x < 57 && x > 50): return {fillColor: "#CC0066", radius: 5};
    case (x < 62 && x > 56): return {fillColor: "#B8005C", radius: 5};
    case (x < 67 && x > 61): return {fillColor: "#A30052", radius: 5};
    case (x < 72 && x > 66): return {fillColor: "#8F0047", radius: 5};
    case (x < 77 && x > 71): return {fillColor: "#7A003D", radius: 5};
    case (x < 82 && x > 76): return {fillColor: "#660033", radius: 5};
    case (x < 87 && x > 81): return {fillColor: "#520029", radius: 5};
    case (x < 92 && x > 86): return {fillColor: "#3D001F", radius: 5};
    case (x < 97 && x > 91): return {fillColor: "#290014", radius: 5};
    case (x < 102 && x > 96): return {fillColor: "#14000A", radius: 5};
    case (x > 101): return {fillColor: "#000000", radius: 5};
  }
};