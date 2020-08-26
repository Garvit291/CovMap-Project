import React , {useState} from 'react';
import  MapGL, {Source, Layer,FlyToInterpolator,
NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl
} from 'react-map-gl';
import {clusterLayer, clusterCountLayer, unclusteredPointLayer} from './layers';
import data from '../data/TestingCentres.geojson';
import SearchBox from './SearchBox.js';

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
      const chandigarh = () =>{
      
      } 

      const zoomToLocation = (lat,long) =>{
          setViewport(
        {
          latitude: lat,
        longitude: long,
        zoom: 12,
        transitionInterpolator: new FlyToInterpolator({speed: 2}),
      transitionDuration: '.2s'
        }
      )
      }

      const _sourceRef = React.createRef();

      

      const _onClick = event => { 
        const feature = event.features[0];
        const clusterId = feature.properties.catid;
    
        const mapboxSource = _sourceRef.current.getSource();

        mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err) {
            return;
          }
          setViewport({
            ...viewport,
            longitude:feature.geometry.cordinates[0],
            latitude: feature.geometry.coordinates[1],
        zoom,
        transitionDuration: 500
          }
          )
            
          });
      };

  return (
    <div>
      <div className="searchbox">
            <SearchBox zoomToLocation={zoomToLocation}/>
      </div>
    
      <MapGL
      {...viewport}
      width="100vw"
      height="100vh"
      mapStyle="mapbox://styles/garvit2/cke5j2o2c1oej19qo843rhfi4"
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapboxApiAccessToken={MAPBOX_TOKEN}
      onClick={chandigarh}
      >
    
      <Source
          type="geojson"
          data={data}
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
          ref={_sourceRef}
        >
        <Layer {...clusterLayer} />
        <Layer {...clusterCountLayer} />
        <Layer {...unclusteredPointLayer} />
      </Source>

      <div style={geolocateStyle}>
          <GeolocateControl/>
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
