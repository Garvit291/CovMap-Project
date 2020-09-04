























const colors={
  recovered: ['step',
  ['get', 'recovered'],
  '#f7fcf5',
  1000,
  '#e5f5e0',
  5000,
  '#c7e9c0',
  10000,
  '#a1d99b',
  25000,
  '#74c476',
  50000,
  '#41ab5d',
  100000,
  '#238b45',
  500000,
  '#006d2c',
  1000000,
  '#00441b'],
  active:['step',
  ['get', 'active'],
  '#fff5f0',
  1000,
  '#fee0d2',
  5000,
  '#fcbba1',
  10000,
  '#fc9272',
  25000,
  '#fb6a4a',
  50000,
  '#ef3b2c',
  100000,
  '#cb181d',
  500000,
  '#a50f15',
  1000000,
  '#67000d'],
  confirmed:['step',
  ['get', 'confirmed'],
  '#f7fbff',
  1000,
  '#deebf7',
  5000,
  '#c6dbef',
  10000,
  '#9ecae1',
  25000,
  '#6baed6',
  50000,
  '#4292c6',
  100000,
  '#2171b5',
  500000,
  '#08519c',
  1000000,
  '#08306b'],
  deceased:['step',
  ['get', 'deceased'],
  '#fcfbfd',
  100,
  '#efedf5',
  1000,
  '#dadaeb',
  2500,
  '#bcbddc',
  5000,
  '#9e9ac8',
  10000,
  '#807dba',
  20000,
  '#6a51a3',
  50000,
  '#54278f',
  100000,
  '#3f007d'],
}




export const clusterLayer = (sourceId,type)=>  {
    // console.log(sourceId)
    return {
      id: 'clusters',
      type: 'circle',
      source: `${sourceId}`,
      filter: ['has', 'point_count'],
      paint: {
        'circle-color': colors[type],
        'circle-radius': ["*", 3 ,["log2", ['get','confirmed'] ]]
      }
    }
  };
  
  export const clusterCountLayer = (sourceId,type) => {
    return {
      id: 'cluster-count',
      type: 'symbol',
      source: `${sourceId}`,
      filter: ['has', 'point_count'],
      layout: {
        'text-field': ['get',`${type}`],
        // 'text-field': '{}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 16
      }
    }
  };
  
  export const unclusteredPointLayer = (sourceId,type) => {
    return {
      id: 'unclustered-point',
      type: 'circle',
      source: `${sourceId}`,
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': colors[type],
        'circle-radius': ["*", 3 ,["log2", ['get','confirmed']]]
      }
    }
  };

  export const unclusteredCountLayer = (sourceId,type) => {
    return {
      id: 'unclustered-count',
      type: 'symbol',
      source: `${sourceId}`,
      filter: ['!', ['has', 'point_count']],
      layout: {
        'text-field': ['get',`${type}`],
        // 'text-field': '{}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 18
      }
    }
  };

  export const geoJsonLayer = {
      id:'geojson-layer',
      'type': 'fill',
      'source': 'data',
      'layout': {},
      'paint': { 'fill-color': 'red', 'fill-opacity': 0.8 }
  };