import React , {useState} from 'react';
import MapGL from 'react-map-gl';


const MAPBOX_TOKEN = 'pk.eyJ1IjoiZ2Fydml0MiIsImEiOiJja2U1Z3lvZWcxMnF2MzduN3FyZmtzaDViIn0.-XsOlUf85kWRRFa88u6aLQ';

const MapBox = () => {
    const [viewport, setViewport] = useState({
        latitude: 25.275005879170045,
        longitude: 78.97082512588096,
        zoom: 3.8325797292588644,
        bearing: 0,
        pitch: 0
      });
  return (
    <MapGL
    {...viewport}
    width="100vw"
    height="100vh"
    mapStyle="mapbox://styles/garvit2/cke5j2o2c1oej19qo843rhfi4"
    onViewportChange={nextViewport => setViewport(nextViewport)}
    mapboxApiAccessToken={MAPBOX_TOKEN}
  />
  )
}

export default MapBox;
