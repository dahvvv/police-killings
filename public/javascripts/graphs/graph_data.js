var baseColor = '#0066CC';
var addColor = '#2f82d5';
var subColor = '#001F3D';

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
    'color': [baseColor],
    'label': ['race'],
    'values': [
      {
        'label': 'other',
        'values': [0.9], //24
      },
      {
        'label': 'alaskan/p.i.',
        'values': [1.1], //29
      },
      {
        'label': 'asian',
        'values': [1.7], //44
      },
      {
        'label': 'hispanic/latin',
        'values': [11.9], //302
      },
      {
        'label': 'black',
        'values': [35.0], //889
      },
      {
        'label': 'white',
        'values': [49.3], //1252
      }
    ]
  };
  return data;
};

function race_popWeightGraphData(){
  var data = {
    'color': [baseColor,addColor,subColor],
    'label': ['unweighted portion','additional portion gained by weighting against us population','portion lost by weighting against us population'],
    'values': [
      {
        'label': 'other',
        'values': [0.9,5.4], //24, total weighted percent 6.3
      },
      {
        'label': 'alaskan/p.i.', //29, total weight 15.3%
        'values': [1.1,14.2],
      },
      {
        'label': 'asian',
        'values': [1.7,3.6], //44, total weight 5.3%
      },
      {
        'label': 'hispanic/latin', //302, total weight 11.6
        'values': [11.6,0,0.3],
      },
      {
        'label': 'black', //889, total weight 44.2
        'values': [35.0,9.2],
      },
      {
        'label': 'white', //1252, total weight 10.6, -38.7
        'values': [10.6,0,38.7], // add extra 38.7 to all
      }
    ]
  };
  return data;
};

function arrestsWeightGraphData(){
  var data = {
    'color': [baseColor,addColor,subColor],
    'label': ['unweighted portion','additional portion gained by weighting against us population','portion lost by weighting against us population'],
    'values': [
      {
        'label': 'alaskan/p.i.', //arrest rate 1.7%, cop kill rate 1.1%, total weight 10.8%
        'values': [1.1,9.7],
      },
      {
        'label': 'asian',
        'values': [1.7,21.9], //arrest rate 1.2%, cop kill rate 1.7%, total weight 23.6%
      },
      {
        'label': 'black', //arrest rate 28.3%, cop kill rate 35%, total weight 44.2
        'values': [35.0,9.2],
      },
      {
        'label': 'white', //arrest rate 68.9%, cop kill rate 49.3%, total weight 11.9, 
        'values': [10.6,1.3], // add extra 38.7 to all
      }
    ]
  };
  return data;
};

function cityGraphData(){
  var data = {
    'color': [baseColor],
    'label': [''],
    'values': [
      {
        'label': 'Houston',
        'values': [31]
      },
      {
        'label': 'Baltimore',
        'values': [34]
      },
      {
        'label': 'Cleveland',
        'values': [38]
      },
      {
        'label': 'Oakland',
        'values': [40]
      },
      {
        'label': 'Portland',
        'values': [51] // 44,7
      },
      {
        'label': 'Albuquerque',
        'values': [52] // 44,8
      },
      {
        'label': 'Chicago',
        'values': [53] // 44,9
      },
      {
        'label': 'LA',
        'values': [57] // 44,13
      },
      {
        'label': 'Las Vegas',
        'values': [136] // 44,44,44,4
      },
      {
        'label': 'NYC',
        'values': [220], // 44,44,44,44,44
      },
    ]
  };
  return data;
};

function city_popWeightGraphData(){
  var data = {
    'color': [baseColor],
    'label': ['Deaths Per Ten Thousand'],
    'values': [
      {
        'label': 'Houston',
        'values': [05]
      },
      {
        'label': 'Baltimore',
        'values': [54]
      },
      {
        'label': 'Cleveland',
        'values': [97]
      },
      {
        'label': 'Oakland',
        'values': [98]
      },
      {
        'label': 'Portland',
        'values': [83] // 44,7
      },
      {
        'label': 'Albuquerque',
        'values': [93] // 44,8
      },
      {
        'label': 'Chicago',
        'values': [19] // 44,9
      },
      {
        'label': 'LA',
        'values': [14] // 44,13
      },
      {
        'label': 'Las Vegas',
        'values': [225] // 44,44,44,4
      },
      {
        'label': 'NYC',
        'values': [26], // 2.6 (per hundred thousand)
      }
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


