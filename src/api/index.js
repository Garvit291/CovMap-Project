import axios from 'axios';

export const fetchData = async () => {
  const response = await axios.get('https://api.covid19india.org/state_district_wise.json');
  return response  
}

export const fetchgeojson = async () =>{
  const response = await axios.get('http://localhost:8000/api/district/?lng=77.015076&lat=28.990160');
  return response
}

