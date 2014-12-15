var ageData = 
[0,1,0,0,2,
4,3,4,0,0,
0,2,3,9,5,
28,31,45,86,119,
93,168,158,110,132,
124,145,117,116,106,
93,101,114,83,94,
121,71,94,83,88,
82,65,84,82,50,
61,56,65,55,56,
53,45,43,38,36,
25,25,24,25,23,
21,24,11,9,12,
10,11,10,15,2,
5,7,7,7,3,
6,1,5,5,1,
2,1,0,1,0,
0,2,3,1,1,
0,0,1,2,0,
1,0,1,0,0,
0,0,0,0,0,
0,1,0,0,0];

function selectChartData(){
  var data = {
    'label': ['label A'],
    'values': [
      {
        'label': 'unarmed',
        'values': [223]
      }, 
      {
        'label': 'armed',
        'values': [801]
      }
    ]
  };
  return data;
};

// var chartJSONUnarmed = {
//   'label': ['label A'],
//   'values': [
//     {
//       'label': 'unarmed',
//       'values': [223]
//     }, 
//     {
//       'label': 'armed',
//       'values': [801]
//     }
//   ]
// };

function JSONAgeValues(){
  var values = [0,1];
  for (var age = 0; age < 110; age++) {
    var value = {
      'label': age,
      'values': ageData[age]
    };
    values.push(value);
  };
  return values;
};

chartJSONAge = {
  'label': [''],
  'values': JSONAgeValues()
};
