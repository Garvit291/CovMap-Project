import React , {useState} from 'react';
import './SearchBox.css';
import namedata from '../data/csvjson.js';
import Paper from '@material-ui/core/Paper';


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
        setText(item.c19oName);
        console.log(item);
        setDisplay(false);
    }

        
    return ( 
    <div className = 'container'>
        <input type='text' className='input' onChange={onChange} value={text}  />
        {display && ( <div className = 'ol'>
                {items.filter((namedata)=> namedata.apiName.indexOf(text.toLowerCase())>-1).slice(0,8).map((item,i)=> {
            return(
                <Paper>
                <div key = {i} onClick = {() => optionSelected(item)} className='li'>
                    <span className = 'optionName'>{item.c19oName} <span className='statecode'>({item.statecode})</span></span>
                </div>
                </Paper>
            );
        })}
        </div>)}
    </div>
    );
}

export default SearchBox;