import React , {useState} from 'react';
import  MapGL, {
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl,Layer,Source
    } from 'react-map-gl';
import{geoJsonLayer} from './layers.js';
import SearchBox from './SearchBox.js';
import OnUserLocation from './OnUserLocation';
import {fetchData,fetchgeojson,fetchstate,fetchdistrict} from '../api/index.js';
import DataCard from './DataCard.js';
import namedata from '../data/csvjson.js';



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
    const [data,setData] = useState([]);
    const [flag,setFlag] = useState(false)
    const [coords, setCoords] = useState([]);
    const [geodata ,setGeodata] = useState([]);
    const [items , setItems] = useState([...namedata]);
    const [district,setDistrict] = useState('');
    const [viewport, setViewport] = useState({
        latitude: 25.275005879170045,
        longitude: 78.97082512588096,
        zoom: 3.8325797292588644,
        bearing: 0,
        pitch: 0
      });

      const getItem = (dist) =>{
          items.map((item)=>{
            if(item.apiName===dist){
              handleSearch(item)
            }
          })
      }

    const fetchForDistrict = async (dist) =>{
      const res = await fetchdistrict(dist)
      console.log(res.data.geometry.coordinates)
      const dta = res.data.geometry.coordinates
      setCoords(dta)
      getGeojson(coords[0],coords[1])

    }

    const fetchForState = async (state) =>{
      const res = await fetchstate(state)
      const dta = res.data.geometry.coordinates
      setCoords(dta)
      getGeojson(coords[0],coords[1])
    }

    const getGeojson = async (ulon,ulat) =>{
          const response = await fetchgeojson(ulon , ulat);
          const data = response.data.features[0].geometry.coordinates[0][0]
          setGeodata([...data])
          console.log(response.data.features[0].id)
          const dist = response.data.features[0].id
          setDistrict(dist)
          getItem(district)
          
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
        if (flag){
        fetchForDistrict(item.apiName)
        }
      }

      else if (item.type==='State'){
        let state = capitalizeFirstLetter(item.state)
        handleState(state)
        if(flag){
          fetchForState(item.state)
        }
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
  return (
    <div>
      <div className="searchbox">
            <SearchBox handleSearch={handleSearch} setFlag= {setFlag}/>
      </div>
    
      <MapGL
      {...viewport}
      width="100vw"
      height="100vh"
      mapStyle="mapbox://styles/garvit2/cke5j2o2c1oej19qo843rhfi4"
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapboxApiAccessToken={MAPBOX_TOKEN}
      >

      <OnUserLocation setViewport={setViewport} getGeojson={getGeojson} setFlag= {setFlag}/>
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

        <div className='statcard'>
        <DataCard data={data}/>
      </div>
        
      </MapGL>
      </div>
  )
}

export default MapBox;
