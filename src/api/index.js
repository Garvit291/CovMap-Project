import axios from 'axios';

export const fetchData = async () => {
  const response = await axios.get('https://api.covid19india.org/state_district_wise.json');
  return response  
}

export const fetchgeojson = async () =>{
  const response = await axios.get('http://54.211.144.29:8080/api/state/chandigarh');
  return response
}

