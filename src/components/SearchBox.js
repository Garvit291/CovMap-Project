import React , {useState} from 'react';
import './SearchBox.css';

const SearchBox = ({zoomToLocation}) => {

    const [option,setOption] = useState('');
    const [items , setItems] = useState([
        {   
            id:1,
            name:'sonipat',
            lat:28.993082,
            long:77.015076
        },
        {   
            id:2,
            name:'chandigarh',
            lat:30.733315,
            long:76.779419
        },
        {
            id:3,
            name:'mumbai',
            lat:19.075983,
            long:72.877655
        }
    ]);

    const [text, setText] = useState('');
    const [display , setDisplay] = useState(false);

    const onChange = (e) =>{
       setText(e.target.value);
       if (e.target.value !== ''){
       setDisplay(true);
       }
       else 
       setDisplay(false);
    }

    const optionSelected  = (item) =>{
        setText(item.name);
        zoomToLocation(item.lat , item.long);
        setDisplay(false);
    }

        
    return ( 
    <div className = 'container'>
        <input type='text' className='input' onChange={onChange} value={text}  />
        {display && ( <div>
                {items.filter(({name})=>name.indexOf(text.toLowerCase())>-1).map((item)=> {
            return(
                <div key={item.id} onClick = {() => optionSelected(item)} className='li'>
                <span>{item.name}</span>
                </div>
            );
        })}
        </div>)}
    </div>
    );
}

export default SearchBox;