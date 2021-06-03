import axios from 'axios';
import { GET_PRODUCT_BY_SELL,
          GET_PRODUCT_BY_ARRIVAL} from './types';  
import {PRODUCT_SERVER} from '../component/utils/misc';

export function getProductsBySell(){
    const request = axios.get(`http://127.0.0.1:5000/api/dresses`)
    .then(response => response.data);
    console.log(request);
    return {
        type:GET_PRODUCT_BY_SELL,
        payload: request
    }
}
export function getProductByArrival(){

}