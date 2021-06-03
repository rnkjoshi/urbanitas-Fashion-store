import {combineReducers} from 'redux';

import user from './user_reducer';
import dresses from './product_reducer';
const rootReducer = combineReducers({
    user,dresses
});

export default rootReducer;