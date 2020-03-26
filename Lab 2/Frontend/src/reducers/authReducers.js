    import {LOGIN,REGISTER, FETCH_DASHBOARD, LOGOUT, JOB_APPLY, FETCH_EVENT} from '../actions/types';

    const initialState = {
        regdetails : {},
        loginDetails: {},
        jobDetails: [],
        eventDetails: [],
        message: "",
        loginError:"",
        isLogin: false,
        isRegistered: false
    }

    export default function(state = initialState, action){
        switch(action.type){
           
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

            case FETCH_DASHBOARD:
                return {
                    ...state,
                    jobDetails: action.payload,
                    message: action.message
                }

            case FETCH_EVENT: 
                return{
                    ...state,
                    eventDetails: action.payload,
                    message: action.message
                }

            case JOB_APPLY:
                return {
                    ...state,
                    message: action.message
                }

            default:
                return state;
        }
    }