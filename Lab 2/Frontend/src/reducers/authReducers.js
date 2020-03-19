    import {LOGIN,REGISTER, FETCH_DASHBOARD, LOGOUT} from '../actions/types';

    const initialState = {
        regdetails : {},
        loginDetails: {},
        jobDetails: [],
        message: "",
        loginError:"",
        isLogin: false,
        isRegistered: false
    }

    export default function(state = initialState, action){
        switch(action.type){
            case FETCH_DASHBOARD:
                return {
                    ...state,
                    jobDetails: action.payload
                }
            
            case REGISTER:
                return {
                    ...state,
                    regdetails: action.details,
                    message: action.message,
                    isRegistered: action.isRegistered
                }

            case LOGIN:
                return {
                    ...state,
                    loginDetails: action.payload,
                    loginError : action.loginError,
                    isLogin : action.isLogin
                }
            
            case LOGOUT: 
                return {
                    ...state,
                    isLogin: action.isLogin
                }

            default:
                return state;
        }
    }