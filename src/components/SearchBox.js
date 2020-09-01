import React , {useState,useEffect} from 'react';
import './SearchBox.css';
import data from '../data/csvjson.js';

const SearchBox = ({handleSearch}) => {

    const [option,setOption] = useState('');
    const [items , setItems] = useState([...data]);


    
    const [text, setText] = useState('');
    const [display , setDisplay] = useState(false);

    
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
    </div>
    );
}

export default SearchBox;