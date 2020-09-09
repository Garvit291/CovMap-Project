import React , {useState} from 'react';
import './SearchBox.css';
import namedata from '../data/csvjson.js';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';


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
        <div className='searchdiv'>
        <input type='text' className='input' onChange={onChange} value={text}  placeholder='Search district or state' />
        <SearchIcon color = 'primary' style={{fontSize:'30'}}/>
        </div>
        {display && ( <div className = 'ol'>
                {items.filter((namedata)=> namedata.apiName.indexOf(text.toLowerCase())>-1).slice(0,8).map((item,i)=> {
            return(
                <Paper elevation ={3}>
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