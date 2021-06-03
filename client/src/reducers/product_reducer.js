import { GET_PRODUCT_BY_SELL,
    GET_PRODUCT_BY_ARRIVAL} from '../actions/types';

export default function(state={},action){
    switch(action.type){
        case GET_PRODUCT_BY_SELL:
            return {...state, bySell:action.payload}
        case GET_PRODUCT_BY_ARRIVAL:
            return {...state}
        default:
            return state;
    }
}