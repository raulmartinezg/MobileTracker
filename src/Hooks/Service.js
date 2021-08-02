import axios from 'axios';
const baseUrl = "https://portal.tum.com.mx/DatumRestMasKota/api/";

export const login = async request => {
    const response = await axios.post(`${baseUrl}loginsp`,request);
    return response ;
}

export const viajes = async (request,token) =>{
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    const response = await axios.post(`${baseUrl}querytablesreturn`,request,config);
    return response ;
}