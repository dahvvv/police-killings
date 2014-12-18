var deathsByAge = 
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

function raceGraphData(){
  var data = {
    'color': ['#0066CC'],
    'label': ['race'],
    'values': [
      {
        'label': 'other',
        'values': [24],
      },
      {
        'label': 'alaskan/p.i.',
        'values': [29],
      },
      {
        'label': 'asian',
        'values': [44],
      },
      {
        'label': 'hispanic/latin',
        'values': [302],
      },
      {
        'label': 'black',
        'values': [889],
      },
      {
        'label': 'white',
        'values': [1252],
      }
    ]
  };
  return data;
};

function cityGraphData(){
  var data = {
    'color': ['#0066CC'],
    'label': [''],
    'values': [
      {
        'label': 'NYC',
        'values': [220], // 44,44,44,44,44
      },
      {
        'label': 'Las Vegas',
        'values': [136] // 44,44,44,4
      },
      {
        'label': 'LA',
        'values': [57] // 44,13
      },
      {
        'label': 'Chicago',
        'values': [53] // 44,9
      },
      {
        'label': 'Albuquerque',
        'values': [52] // 44,8
      },
      {
        'label': 'Portland',
        'values': [51] // 44,7
      },
      {
        'label': 'Oakland',
        'values': [40]
      },
      {
        'label': 'Cleveland',
        'values': [38]
      }
      // {
      //   'label': 'Baltimore',
      //   'values': [34]
      // },
      // {
      //   'label': 'Houston',
      //   'values': [31]
      // }
    ]
  };
  return data;
};

function ageGraphValues(){
  var values = [];
  for (var age = 0; age < 110; age++) {
    var value = {
      'label': [age],
      'values': deathsByAge[age]
    };
    values.push(value);
  };
  return values;
};

function ageGraphData(){
  var data = {
    'label': ['age'],
    'values': ageGraphValues()
  };
  return data;
};

function unarmedGraphData(){
  var data = {
    'label': [''],
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

