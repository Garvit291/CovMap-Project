import React , {useEffect,useSate} from 'react';
import {Doughnut} from 'react-chartjs-2';
import axios from 'axios'

import * as jp from 'jsonpath';




const DataCard = ({stats , name}) => {
    

  




    

    const doughnut = <Doughnut 
        data={
            {
	labels: [
		'Active',
		'Recovered',
		'Deceased'
	],
	datasets: [{
		data: [stats[1],stats[2],stats[3]],
		backgroundColor: [
		'#ec0101',
		'#b6eb7a',
		'#a2d5f2'
		],
		hoverBackgroundColor: [
		'#eb8f8f',
		'#a8df65',
		'#40a8c4'
		]
	}]
}
        }/>

    return (
        <div>
            
        <h2 className='name'>{name}</h2>
        
        {doughnut}
        
        
        
            
        
      </div>

    );
}

export default DataCard;
