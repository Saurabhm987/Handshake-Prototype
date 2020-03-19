import { combineReducers } from 'redux';
import authReducers from './authReducers'

export default combineReducers( {
    Handshake_User_Info: authReducers
});
