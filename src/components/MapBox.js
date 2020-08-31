import React , {useState} from 'react';
import  MapGL, {Source, Layer,FlyToInterpolator,
NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl
} from 'react-map-gl';
import {clusterLayer, clusterCountLayer, unclusteredPointLayer,geoJsonLayer} from './layers';
import geojson from '../data/India GADM/IND_level1_states.geojson';
import SearchBox from './SearchBox.js';
import axios from 'axios';
import {fetchData} from '../api/index.js';
import DataCard from './DataCard.js';

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

      const [data , setData] = useState ([])

      
      

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

      function capitalizeFirstLetter(str) {
      
     str = str.split("_");

    for (var i = 0, x = str.length; i < x; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(" ");

}

    const handleSearch = (item) =>
    {  
      if (item.type==='District'){
        if(item.state==='daman_and_diu'|| item.state==='dadra_and_nagar_haveli'){
          item.state='Dadra and Nagar Haveli and Daman and Diu'
        }
        let state = capitalizeFirstLetter(item.state)
        handleDistrict(item.c19oName, state)
      }

      else if (item.type==='State'){
        let state = capitalizeFirstLetter(item.state)
        handleState(state)
      }

      else if(item.type ==='Union Territory'){
        handleState(item.c19oName)
      }
    }  

    const handleState = async (state) =>{
      const response = await fetchData();
        let totalconfirmed=0
        let totalactive = 0
        let totaldeceased = 0
        let totalrecovered = 0 
        let totaldeltaconfirmed = 0
        let r=[]

      const data = response.data
        Object.entries(data[state]['districtData']).map((district)=>{
          let c=district[1].confirmed
          totalconfirmed=totalconfirmed+c
          let a = district[1].active 
          totalactive = totalactive + a
          let d = district[1].deceased
          totaldeceased = totaldeceased + d
          let r = district[1].recovered
          totalrecovered = totalrecovered + r
          

          let deltac = Object.entries(district[1].delta)[0][1]
          totaldeltaconfirmed = totaldeltaconfirmed + deltac
  })
  r.push(totalconfirmed,totalactive,totaldeceased,totalrecovered,totaldeltaconfirmed)

        setData(r);
        console.log(r)
        
      }

      const handleDistrict = async (d , state) =>{
        const response = await fetchData();
        const data = response.data
 let totalconfirmed=0
  let totalactive = 0
  let totaldeceased = 0
  let totaldeltaconfirmed = 0
  let totalrecovered = 0 
  let r=[]
 Object.entries(data[state]['districtData']).map((district)=>{
    if (d===district[0]){
        totalconfirmed =   district[1].confirmed
        totalactive = district[1].active
        totaldeceased = district[1].deceased
        totalrecovered = district[1].recovered
        totaldeltaconfirmed=Object.entries(district[1].delta)[0][1]
    }
  })
  
  r.push(totalconfirmed,totalactive,totaldeceased, totalrecovered,totaldeltaconfirmed)
        setData(r)
        console.log(r)
      }

      const _sourceRef = React.createRef();

    const  successCallback = async function (position) {
    const ulon = position.coords.longitude;
    const ulat = position.coords.latitude;
    console.log(ulon,ulat);
    setViewport({
      latitude:ulat,
      longitude:ulon,
      zoom:14,
      transitionInterpolator: new FlyToInterpolator({speed: 2}),
      transitionDuration: '.2s'
    });
    const response = await axios.get(`https://eu1.locationiq.com/v1/reverse.php?key=1406ec0cbf52a3&lat=${ulat}&lon=${ulon}&format=json`)
    const {county} = response.data.address;
    console.log(county);
  }

  const failureCallback = () =>{

  }

const getUserLocation = () =>{
  window.navigator.geolocation
  .getCurrentPosition(successCallback,failureCallback,{maximumAge:60000, timeout:5000, enableHighAccuracy:true});
 
}

      

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
            <SearchBox handleSearch={handleSearch}/>
      </div>
    
      <MapGL
      {...viewport}
      width="100vw"
      height="100vh"
      mapStyle="mapbox://styles/garvit2/cke5j2o2c1oej19qo843rhfi4"
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapboxApiAccessToken={MAPBOX_TOKEN}
      >

      <div className='statcard'>
        <DataCard data={data}/>
      </div>
    
      <Source
          type="geojson"
          data={geojson}
        >
        <Layer {...geoJsonLayer}/>
      </Source>

      <div style={geolocateStyle}>
          <GeolocateControl
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
          />
         <button onClick = {getUserLocation}>get</button>
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
