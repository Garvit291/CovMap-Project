import React from 'react'

const DataCard = ({data}) => {
    return (
        <div>
            {data.map((stats)=>{
                return(
                    <h1> {stats}</h1>
                );
            })}            
        </div>
    );
}

export default DataCard;
