import axios from 'axios';
import { LOGIN_USER,
          REGISTER_USER,AUTH_USER,LOGOUT_USER} from './types';
import { USER_SERVER } from '../component/utils/misc';
//axios.defaults.withCredentials = true;
export function loginUser(dataToSubmit){
    const request = axios.post(`http://127.0.0.1:5000/api/users/login`,dataToSubmit)
    .then(response => response.data);

    return {
        type:LOGIN_USER,
        payload:request
    }
}
const headers = {
    'Content-Type': 'application/json',
    'mode':'no-cors'
};
export function registerUser(dataToSubmit){
    console.log("calling register user")
    console.log(`${USER_SERVER}/register`);
    const request = axios.post(`http://127.0.0.1:5000/api/users/register`,dataToSubmit)
    .then(response=>response.data);
    return {
        type:REGISTER_USER,
        payload:request
    }
}

export function auth(){
    const request = axios.get(`http://127.0.0.1:5000/api/users/auth`)
    .then(response =>response.data);

    return{
        type:AUTH_USER,
        payload:request
    }
}

export function logoutUser (){
    const request = axios.get(`http://127.0.0.1:5000/api/users/logout`)
    .then(response => response.data)
    return{
        type:LOGOUT_USER,
        payload:request
    }
}