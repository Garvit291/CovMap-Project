import React , {useState} from 'react';
import {Layer,Source,FlyToInterpolator} from 'react-map-gl';
import { fetchgeojson} from '../api/index.js';
import{geoJsonLayer} from './layers.js';

const OnUserLocation =({setViewport}) => {

    const [ulon,setUlon] = useState();
      const [ulat,setUlat] = useState();
      const [geodata ,setGeodata] = useState([]);
      const getGeojson = async (ulon,ulat) =>{
          const response = await fetchgeojson(ulon , ulat);
          const data = response.data.features[0].geometry.coordinates[0][0]
          setGeodata([...geodata,...data])
      }

      const  successCallback = async function (position) {
    const lon = position.coords.longitude;
    const lat = position.coords.latitude;
    console.log(lon,lat);
      setUlat(lat);
      setUlon(lon);
      getGeojson(ulon,ulat)
    setViewport({
      latitude:ulat,
      longitude:ulon,
      zoom:9,
      transitionInterpolator: new FlyToInterpolator({speed: 1}),
      transitionDuration: '.2s'
    });
  }

  const failureCallback = () =>{
        console.log('failed')
  }

    const getUserLocation = () =>{
  window.navigator.geolocation
  .getCurrentPosition(successCallback,failureCallback,{maximumAge:60000, timeout:5000, enableHighAccuracy:true});
    console.log('done')
 
}     



    return (
        <div>

        <div className='get_button'>
         <button onClick = {() => getUserLocation()}>get</button>
         </div>
         <Source
          type="geojson"
          data={
{    "type": "FeatureCollection",
    "features": [
        {
            "id": "sonipat",
            "type": "Feature",
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [[geodata]]
            },
            "properties": {
                "name_2": "Sonipat",
                "name_1": "Haryana",
                "state": "haryana",
                "engtype_2": "District",
                "statecode": "HR"
            }
        }
    ]
}}
        >
        <Layer {...geoJsonLayer}/>
      </Source>
            
        </div>
    )
}




export default OnUserLocation

