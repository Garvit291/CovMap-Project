import React , {useEffect,useSate} from 'react';
import {Doughnut} from 'react-chartjs-2';
import axios from 'axios'
import * as jp from 'jsonpath';



const DataCard = ({stats , name}) => {

	const p1= Math.round(stats[1]/stats[0]*100)
	const p2= Math.round(stats[2]/stats[0]*100)
	const p3= Math.round(stats[3]/stats[0]*100)
    const doughnut = <Doughnut 
        				data={{
							labels: [
								`Active : ${p1} %`,
								`Recovered : ${p2} %`,
								`Deceased : ${p3} %`
							],
							datasets: [{
								data: [stats[1],stats[2],stats[3]],
								backgroundColor: [
								'#ec0101',
								'#79d70f',
								'#8675a9'
								],
								hoverBackgroundColor: [
								'#eb8f8f',
								'#a8df65',
								'#40a8c4'
								]
							}]
						}
        			}
					options={{ 
                legend : {display:true},
                title : {display:true , text: `Current Situation in ${name}`}
            }}

			width={15}
			height= {6}
					/>
    return (
    
		<div>
        <h2 className='name'>{name}</h2>
        {doughnut}
		
      </div>
	  
    );
}

export default DataCard;
