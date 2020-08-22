import React , {useState} from 'react';
import  MapGL, {Source, Layer} from 'react-map-gl';
import {clusterLayer, clusterCountLayer, unclusteredPointLayer} from './layers';
import data from '../data/TestingCentres.geojson';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZ2Fydml0MiIsImEiOiJja2U1Z3lvZWcxMnF2MzduN3FyZmtzaDViIn0.-XsOlUf85kWRRFa88u6aLQ';

const MapBox = () => {
    const [viewport, setViewport] = useState({
        latitude: 25.275005879170045,
        longitude: 78.97082512588096,
        zoom: 3.8325797292588644,
        bearing: 0,
        pitch: 0
      });

      const _sourceRef = React.createRef();

      const _onClick = event => {
        const feature = event.features[0];
        const clusterId = feature.properties.cluster_id;
    
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
    <MapGL
    {...viewport}
    width="100vw"
    height="100vh"
    mapStyle="mapbox://styles/garvit2/cke5j2o2c1oej19qo843rhfi4"
    onViewportChange={nextViewport => setViewport(nextViewport)}
    mapboxApiAccessToken={MAPBOX_TOKEN}
    onClick={_onClick}
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
        
      </MapGL>
  )
}

export default MapBox;
