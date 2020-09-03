import React , {useState} from 'react';
import './SearchBox.css';
import namedata from '../data/csvjson.js';
import {fetchData,} from '../api/index.js';
import DataCard from './DataCard.js';

const SearchBox = () => {

    const [data,setData] = useState([]);
    const [items , setItems] = useState([...namedata]);


    
    const [text, setText] = useState('');
    const [display , setDisplay] = useState(false);

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
    const onChange = (e) =>{
       setText(e.target.value);
       console.log('changed')
       if (e.target.value !== ''){
       setDisplay(true);
       }
       else 
       setDisplay(false);
    }

    const optionSelected  = (item) =>{
        handleSearch(item);
        console.log(item)
        setDisplay(false);
    }

        
    return ( 
    <div className = 'container'>
        <input type='text' className='input' onChange={onChange} value={text}  />
        {display && ( <div>
                {items.filter((namedata)=> namedata.apiName.indexOf(text.toLowerCase())>-1).map((item,i)=> {
                    
            return(
                <div key = {i} onClick = {() => optionSelected(item)} className='li'>
                <span>{item.c19oName}</span>

                </div>
            );
        })}
        </div>)}

         <div className='statcard'>
        <DataCard data={data}/>
      </div>
    </div>
    );
}

export default SearchBox;