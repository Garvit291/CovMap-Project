import React , {useState,useEffect} from 'react';
import  MapGL, {
    NavigationControl,
    FullscreenControl,
    ScaleControl,FlyToInterpolator,
    GeolocateControl,Layer,Source
    } from 'react-map-gl';
import{geoJsonLayer,testCenLayer} from './layers.js';
import SearchBox from './SearchBox.js';
import OnUserLocation from './OnUserLocation';
import {fetchData,fetchgeojson,fetchstate,fetchdistrict,fetchtestcen} from '../api/index.js';
import DataCard from './DataCard.js';
import namedata from '../data/csvjson.js';
import {stateCoords} from '../data/Coords/stateCoords.js';
import {districtCoords} from '../data/Coords/districtCoords.js';
import {covmap} from '../api/index';
import apiDict from './csvjsonX.js';
import axios from 'axios';
import ClusterLayer from './ClusterLayer';
import TCard from './Card.js';
import Switch from '@material-ui/core/Switch';

import * as jp from 'jsonpath';



const MAPBOX_TOKEN = 'pk.eyJ1IjoiZ2Fydml0MiIsImEiOiJja2U1Z3lvZWcxMnF2MzduN3FyZmtzaDViIn0.-XsOlUf85kWRRFa88u6aLQ';






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
  const [check,setCheck] = useState(true)
  const [testcen,setTestcen]=useState([]);
  const [layername , setLayerName] = useState('');
  const [type,setType] = useState('district');
  const [name,setName] = useState('India');
  const [processed,setProcessed] = useState(false);
  const [geodata ,setGeodata] = useState([]);
  const [clusterType,setClusterType] = useState('confirmed');
  const [items , setItems] = useState([...namedata]);
  const [viewport, setViewport] = useState({
      latitude: 25.275005879170045,
      longitude: 78.97082512588096,
      zoom: 3.8325797292588644,
      bearing: 0,
      pitch: 0
    });


  const handleChange = (e) =>{
    setCheck(e.target.checked)
    toggle()
  }

  const toggle = () =>{
    if(check){
      setClusterType('')
    }
    else{
      setClusterType('confirmed')
    }
  }

  const Testcendetd = async (d) =>{
    
    const response = await fetchtestcen(d,'district')
    console.log(response.data.features)
    const data = response.data.features
    setTestcen(data)
    return(
      <div>
      </div>
    );

  }

  const Testcendets = async (s) =>{
    
    const response = await fetchtestcen(s,'state')
    console.log(response.data.features)
    const data = response.data.features
    setTestcen(data)
    return(
      <div>
      </div>
    );

  }


  const getItem = (dist) =>{
      items.map((item)=>{
        if(item.apiName===dist){
          
          setLayerName(item.apiName)
          if(item.type==='d'){
          setType('district')
          Testcendetd(item.apiName)
          }
          else{
            setType('state')
            Testcendets(item.apiName)
          }
          handleSearch(item,false)
        }

        else {
          return(<div></div>)
        }
      })
  }

  const fetchForDistrict = async (dist) =>{
    const res = await fetchdistrict(dist)
    console.log(res.data.geometry.coordinates)
    const dta = res.data.geometry.coordinates
    setViewport({
      latitude:dta[1],
      longitude:dta[0],
      zoom:9,
      transitionInterpolator: new FlyToInterpolator({speed: 1}),
      transitionDuration: '.2s'
      })
      Testcendetd(dist)

  }

  const fetchForState = async (state) =>{
    const res = await fetchstate(state)
    const dta = res.data.geometry.coordinates
    setViewport({
      latitude:dta[1],
      longitude:dta[0],
      zoom:7,
      transitionInterpolator: new FlyToInterpolator({speed: 1}),
      transitionDuration: '.2s'
      })
      Testcendets(state)
  }

  const getGeojson = async (ulon,ulat) =>{
    const response = await fetchgeojson(ulon , ulat);
    const data = response.data.features[0].geometry.coordinates[0][0]
    setGeodata([...data])
    console.log(response.data.features[0].id)
    const dist = response.data.features[0].id
    const buf = response.data.features[0].properties.state
    console.log(buf)
    if (buf!=='nct_of_delhi')
    getItem(dist)        
  }


  function capitalizeFirstLetter(str) { 
    str = str.split("_");

  for (var i = 0, x = str.length; i < x; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1);
  }

  return str.join(" ");

}

  const handleSearch = (item,flag) =>
  {  
    setName(item.c19oName)
    if (item.type==='d'){
      if(item.state==='daman_and_diu'|| item.state==='dadra_and_nagar_haveli'){
        item.state='Dadra and Nagar Haveli and Daman and Diu'
      }
      if(item.state==='andaman_and_nicobar'){
        item.state='Andaman and Nicobar Islands'
      }
      if(item.state==='jammu_and_kashmir'){
        item.state='Jammu and Kashmir'
      }


      let state = capitalizeFirstLetter(item.state)
      handleDistrict(item.c19oName, state)
      if (flag){
      setType('district')
      setLayerName(item.apiName)
      fetchForDistrict(item.apiName)
      }
    }
    else if (item.type==='s'){
      let state = capitalizeFirstLetter(item.state)
      handleState(item.c19oName)
      if(flag){
        setType('state')
        setLayerName(item.apiName)
        fetchForState(item.apiName)
      }
    }
    else if(item.type ==='u'){
      handleState(item.c19oName)
      if(flag){
        setType('state')
        setLayerName(item.apiName)
        fetchForState(item.apiName)
      }
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
    r.push(totalconfirmed,totalactive,totalrecovered,totaldeceased)
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
  
    r.push(totalconfirmed,totalactive, totalrecovered,totaldeceased)
    setData(r)
    console.log(r)
  }



  const _sourceRef = React.createRef();
  const   mapRef= React.useRef();

  const refactorStateCoords = (data) => {
    let stateCodes=jp.query(data, '$..statecode');
    for (let sc of stateCodes) {
            // let obj=jp.query(stateCoords,`$.features[*][?(@.statecode=="${sc}")]`)[0]
      jp.apply(stateCoords, `$.features[*][?(@.statecode=="${sc}")]`,(obj)=>{
          let properties = {
              ...obj,
              active: jp.query(data,`$[?(@.statecode=="${sc}")].districtData[*].active`).reduce((a, b) => a + b, 0),
              confirmed: jp.query(data,`$[?(@.statecode=="${sc}")].districtData[*].confirmed`).reduce((a, b) => a + b, 0),
              recovered: jp.query(data,`$[?(@.statecode=="${sc}")].districtData[*].recovered`).reduce((a, b) => a + b, 0),
              deceased: jp.query(data,`$[?(@.statecode=="${sc}")].districtData[*].deceased`).reduce((a, b) => a + b, 0)
          };
          return properties;
      });
    }
    setProcessed(true)
        // console.log(stateCoords);

    }


  const refactorDistrictCoords =(data)=>{
        let districts=jp.query(districtCoords,'$..id');
        for (let district of districts){
            let confirmed=[0],
                active=[0],
                deceased=[0],
                recovered=[0];
            for (let c19Dist of jp.query(apiDict,`$[?(@.apiName=="${district}" && @.type=="d")]`)){
                confirmed.push(parseInt(jp.query(data,`$[?(@.statecode=="${c19Dist.statecode}")]..["${c19Dist.c19oName}"].confirmed`)));
                active.push(parseInt(jp.query(data,`$[?(@.statecode=="${c19Dist.statecode}")]..["${c19Dist.c19oName}"].active`)));
                deceased.push(parseInt(jp.query(data,`$[?(@.statecode=="${c19Dist.statecode}")]..["${c19Dist.c19oName}"].deceased`)));
                recovered.push(parseInt(jp.query(data,`$[?(@.statecode=="${c19Dist.statecode}")]..["${c19Dist.c19oName}"].recovered`)));
            }
            jp.apply(districtCoords,`$.features[?(@.id=="${district}")].properties`,(obj) => {
                let properties = {
                    ...obj,
                    confirmed: confirmed.reduce((a, b) => a + b, 0),
                    active: active.reduce((a, b) => a + b, 0),
                    deceased: deceased.reduce((a, b) => a + b, 0),
                    recovered: recovered.reduce((a, b) => a + b, 0),
                };
                return properties;
            });
        }
        setProcessed(true)
        // console.log(JSON.stringify(districtCoords));
    }

  const getIndStats=(data)=>{
    return {
        confirmed:  jp.query(data,"$..districtData[*].confirmed").reduce((a, b) => parseInt(a) + parseInt(b), 0),
        active:     jp.query(data,   "$..districtData[*].active").reduce((a, b) => parseInt(a) + parseInt(b), 0),
        recovered:  jp.query(data,`$..districtData[*].recovered`).reduce((a, b) => parseInt(a) + parseInt(b), 0),
        deceased:   jp.query(data, `$..districtData[*].deceased`).reduce((a, b) => parseInt(a) + parseInt(b), 0)
    }
  }


  async function a (){
      // const stateCo = await covmap.get('/stateCoords/');
      const response = await axios.get('https://api.covid19india.org/state_district_wise.json')
      // setTimeout(
        // () => setClusterType('active'), 
        // 8000
      // );
      if(response['status']===200){
          // this.refactorStateCoords(response.data)
          refactorDistrictCoords(response.data)
      }
  }
  async function b (){
      // const stateCo = await covmap.get('/stateCoords/');
    const response = await axios.get('https://api.covid19india.org/state_district_wise.json')
    if(response['status']===200){
        // this.refactorStateCoords(response.data)
        const dta = getIndStats(response.data);
        let i = []
        let c = dta.confirmed
        let a = dta.active
        let r = dta.recovered
        let d = dta.deceased
        i.push(c,a,r,d)
        console.log(i)
        setData(i)
    
    }
  }

  useEffect(() => {
    a();
    b();
    
  }, [])

  const renderCoords = (coords,clusterType)=>{
    if(processed===true){
            // console.log(coords);
            return(
                <Source
                    id="coords"
                    type="geojson"
                    // data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
                    data={districtCoords}
                    cluster={true}
                    clusterMaxZoom={14}
                    clusterRadius={100}
                    // ref={this._sourceRef}
                    ref={ref => _sourceRef.current = ref && ref.getSource()}
                    clusterProperties={{
                        "confirmed": ["+", ["get", "confirmed"]],
                        "active": ["+", ["get", "active"]],
                        "recovered": ["+", ["get", "recovered"]],
                        "deceased": ["+", ["get", "deceased"]]
                    }}
                >
                    <ClusterLayer type={clusterType} sourceId="coords"/>
                </Source>);
        }
        return <div></div>;
    }

  const renderLayer = ( Name,type) =>{
    // map.loadImage('/map-pin.png', (error, image) => {
      // if (error) throw error;
      // if (!map.hasImage('map-pin')) map.addImage('map-pin', image, { sdf: true });
    // });
    return(
       <Source
          id ='data'
          type="geojson"
          data={`http://54.211.144.29/api/${type}/${Name}`}
      >
        <Layer {...geoJsonLayer}/>
      </Source>
    );
  }

  const renderTestCen = ( Name,type) =>{
    // console.log(Name,type)
    let map=mapRef.current.getMap();
    // map.loadImage('/map-pin.png', (error, image) => {
    //   if (error) throw error;
    //   if (!map.hasImage('map-pin')) map.addImage('map-pin', image, { sdf: true });
    // });
    return(
       <Source
          id ='testCen'
          type="geojson"
          data={`http://54.211.144.29/api/testCen/?${type}=${Name}`}
      >
        <Layer {...testCenLayer}/>
      </Source>
    );
  }


  
    
  const mapOnLoad=()=>{
    if (!mapRef.current) return
    const map = mapRef.current.getMap();
    map.loadImage('https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png', (error, image) => {
                  if (error) return
                    map.addImage('pin', image)
                  })
  }

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
        ref={mapRef}
        onLoad={mapOnLoad}
      >
      

      {clusterType === "active" ? renderCoords(districtCoords,"active"):<div></div>}
      {clusterType === "recovered" ? renderCoords(districtCoords,"recovered"):<div></div>}
      {clusterType === "deceased" ? renderCoords(districtCoords,"deceased"):<div></div>}
      {clusterType === "confirmed" ? renderCoords(districtCoords,"confirmed"):<div></div>}

      <OnUserLocation setViewport={setViewport} getGeojson={getGeojson}/>

      {layername?renderLayer(layername,type):<div></div>}
      {layername?renderTestCen(layername,type):<div></div>}
      
      {/* <Source
          type="geojson"
          data={}
      >
        <Layer {...geoJsonLayer}/>
      </Source> */}
        
        <div style={navStyle}>
          <NavigationControl />
        </div>
        <div style={scaleControlStyle}>
          <ScaleControl />
        </div>

    
        <div className='layerswitch'>

        <div className='button-box'> 
          <div  className='switch_button blue' onClick={()=>setClusterType('confirmed')}>
              <h4 className = 'glow_blue'> Confirmed </h4>
              <h4 className= 'glow_blue'> {data[0]}</h4>
          </div>
          </div>

          <div className='button-box '>
          <div  className='switch_button red' onClick={()=>setClusterType('active')}>
              <h4 className='glow_red'> Active </h4>
              <h4 className='glow_red'> {data[1]}</h4>
          </div>
          </div>

          <div className='button-box '>
          <div className='switch_button  green' onClick={()=>setClusterType('recovered')}>
              <h4 className ='glow_green'> Recovered </h4>
              <h4 className='glow_green'> {data[2]}</h4>
          </div>
          </div>

          <div className='button-box'> 
          <div  className='switch_button purple'onClick={()=>setClusterType('deceased')}>
              <h4 className='glow_purple'> Deceased </h4>
              <h4 className='glow_purple'> {data[3]}</h4>
          </div>
          </div>
          
         </div>
      <div className='card-container'>
        {testcen.slice(0,10).map((centre)=>{
          return(
            <TCard centre = {centre}/>
          )
        })}
      </div>  

        <div className='statcard'>
        <DataCard stats={data} name = {name}/>
      </div>
    <div className='switch'>

      <h3 className='cl'> ClusterLayer </h3>
      <Switch
            checked={check}
            onChange={e=>handleChange(e)}
            name="checked"
            color="primary"
          
          />
     </div>     
        
      </MapGL>
      </div>
  )
}


export default MapBox;
