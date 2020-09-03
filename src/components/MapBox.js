import React , {useState} from 'react';
import  MapGL, {
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl
    } from 'react-map-gl';

import SearchBox from './SearchBox.js';
import OnUserLocation from './OnUserLocation';


const MAPBOX_TOKEN = 'pk.eyJ1IjoiZ2Fydml0MiIsImEiOiJja2U1Z3lvZWcxMnF2MzduN3FyZmtzaDViIn0.-XsOlUf85kWRRFa88u6aLQ';


const geolocateStyle = {
  position: 'absolute',
  bottom: '100px',
  right: 0,
  padding: '10px'
};

const fullscreenControlStyle = {
  position: 'absolute',
    bottom: 10,
  right: 0,
  padding: '10px'
};

const navStyle = {
  position: 'absolute',
  bottom:'100px',
  left: 0,
  padding: '10px'
};

const scaleControlStyle = {
  position: 'absolute',
  bottom: 36,
  left: 0,
  padding: '10px'
};



const MapBox = () => {
    const [viewport, setViewport] = useState({
        latitude: 25.275005879170045,
        longitude: 78.97082512588096,
        zoom: 3.8325797292588644,
        bearing: 0,
        pitch: 0
      });
    
  return (
    <div>
      <div className="searchbox">
            <SearchBox handleSearch/>
      </div>
    
      <MapGL
      {...viewport}
      width="100vw"
      height="100vh"
      mapStyle="mapbox://styles/garvit2/cke5j2o2c1oej19qo843rhfi4"
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapboxApiAccessToken={MAPBOX_TOKEN}
      >

      <OnUserLocation setViewport={setViewport}/>

      <div style={geolocateStyle}>
          <GeolocateControl
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
          />
        </div>
        <div style={fullscreenControlStyle}>
          <FullscreenControl />
        </div>
        <div style={navStyle}>
          <NavigationControl />
        </div>
        <div style={scaleControlStyle}>
          <ScaleControl />
        </div>
        
      </MapGL>
      </div>
  )
}

export default MapBox;
