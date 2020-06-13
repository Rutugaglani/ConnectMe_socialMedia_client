import { createStore , combineReducers , applyMiddleware , compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducer/userReducer';
import uiReducer from './reducer/uiReducer';
import dataReducer from './reducer/dataReducer';
const initialState ={};

const middleware = [thunk];

const reducer = combineReducers ({
        user : userReducer,
        data : dataReducer,
        ui : uiReducer
});
const store = createStore(  
                        reducer, 
                            initialState ,
                             applyMiddleware(...middleware)
                             
                        );

export default store;
