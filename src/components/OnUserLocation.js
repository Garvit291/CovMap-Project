import React , {useState} from 'react';
import {Layer,Source,FlyToInterpolator} from 'react-map-gl';
import { fetchgeojson} from '../api/index.js';
import{geoJsonLayer} from './layers.js';
import MyLocationIcon from '@material-ui/icons/MyLocation';



const OnUserLocation =({setViewport ,getGeojson }) => {

    const [ulon,setUlon] = useState();
      const [ulat,setUlat] = useState();
      
      
      

    const  successCallback = async function (position) {
    const lon = position.coords.longitude;
    const lat = position.coords.latitude;
    console.log(lon,lat)
        setViewport({
        latitude:lat,
        longitude:lon,
        zoom:9,
        transitionInterpolator: new FlyToInterpolator({speed: 1}),
        transitionDuration: '.2s'
        })

      if (lon && lat){
        getGeojson(lon,lat)    
      }
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
          <div className='get_button_container'>
          <button className='get_button' onClick = {() => getUserLocation()}><MyLocationIcon color='primary'/></button>
          </div>  
        </div>
    );
}




export default OnUserLocation

