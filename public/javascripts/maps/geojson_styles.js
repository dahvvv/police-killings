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
function styleVictimAge(feature){
  var x = feature.properties.age;
  switch(true){
    case (x < 6): return {fillColor: "#FFFFFF"};
    case (x < 11): return {fillColor: "#FAE6F0"};
    case (x < 16): return {fillColor: "#F5CCE0"};
    case (x < 21): return {fillColor: "#F0B2D1"};
    case (x < 26): return {fillColor: "#EB99C2"};
    case (x < 31): return {fillColor: "#E680B2"};
    case (x < 36): return {fillColor: "#E066A3"};
    case (x < 41): return {fillColor: "#DB4D94"};
    case (x < 46): return {fillColor: "#D63385"};
    case (x < 51): return {fillColor: "#D11975"};
    case (x < 57): return {fillColor: "#CC0066"};
    case (x < 62): return {fillColor: "#B8005C"};
    case (x < 67): return {fillColor: "#A30052"};
    case (x < 72): return {fillColor: "#8F0047"};
    case (x < 77): return {fillColor: "#7A003D"};
    case (x < 82): return {fillColor: "#660033"};
    case (x < 87): return {fillColor: "#520029"};
    case (x < 92): return {fillColor: "#3D001F"};
    case (x < 97): return {fillColor: "#290014"};
    case (x < 102): return {fillColor: "#14000A"};
    case (x < 107): return {fillColor: "#000000"};
  }
};