import React , {useEffect,useSate} from 'react';
import {Doughnut} from 'react-chartjs-2';
import axios from 'axios'

import * as jp from 'jsonpath';




const DataCard = ({stats}) => {
    

  




    

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
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		]
	}]
}
        }/>

    return (
        <div>
            
        <h2>Doughnut Example</h2>
        
        {doughnut}
        
        
        
            
        
      </div>

    );
}

export default DataCard;
