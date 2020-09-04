import axios from 'axios';

export const fetchData = async () => {
  const response = await axios.get('https://api.covid19india.org/state_district_wise.json');
  return response  
}

export const fetchgeojson = async (lon,lat) =>{
  const response = await axios.get(`http://54.211.144.29:8080/api/district/?lng=${lon}&lat=${lat}`);
  return response
}

export const fetchdistrict = async (dist) =>{
  const response = await axios.get(`http://54.211.144.29:8080/api/districtCoords/${dist}`);
  return response
}

export const fetchstate = async (state) =>{
  const response = await axios.get(`http://54.211.144.29:8080/api/state/${state}`);
  return response
}

export const covmap = axios.create({
    baseURL: 'http://54.211.144.29:8080/api',
    params:{
      format: 'json'
    }
});
