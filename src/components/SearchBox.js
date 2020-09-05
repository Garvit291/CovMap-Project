import React , {useState} from 'react';
import './SearchBox.css';
import namedata from '../data/csvjson.js';


const SearchBox = ({handleSearch , setFlag}) => {

    
    const [items , setItems] = useState([...namedata]);


    
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
        handleSearch(item,true);


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