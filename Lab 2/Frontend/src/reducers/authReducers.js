    import {LOGIN,REGISTER, FETCH_DASHBOARD, LOGOUT, JOB_APPLY, FETCH_EVENT, FETCH_APPLIED_EVENT, UPDATE_STUDENT_PROFILE, FETCH_STUDENT_PROFILE, UPDATE_SUMMARY, ADD_EDUCATION, FETCH_EXPERIENCE, UPDATE_EDUCATION, FETCH_EDUCATION, ADD_EXPERIENCE, UPDATE_EXPERIENCE, SEARCH, FETCH_STUDENT} from '../actions/types';

    const initialState = {
        regdetails : {},
        loginDetails: {},
        profileInfo: {},
        jobDetails: [],
        studentDetails:[],
        educationInfo: [],
        experienceInfo:[],
        eventDetails: [],
        appliedEvents: [],
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
            
            case FETCH_APPLIED_EVENT:
                return{
                    ...state, 
                    appliedEvents: action.payload,
                    message:action.message
                }
            
            case FETCH_STUDENT_PROFILE: 
                return{
                    ...state,
                    profileInfo: action.payload,
                    message: action.message
                }

            case UPDATE_STUDENT_PROFILE:
                return{
                    ...state,
                    message: action.message,
                    profileInfo: action.payload
                }
            
            case UPDATE_SUMMARY:
                return{
                    ...state,
                    message:action.message,
                    profileInfo : {
                        ...state.profileInfo,
                        summary : action.payload
                    }
                }

            case ADD_EDUCATION:
                return{
                    ...state,
                    message:action.message,
                }

            case UPDATE_EDUCATION:
                return{
                    ...state,
                    message:action.message
                    // educationInfo:[...state.educationInfo, action.payload]
                }   
            
            case FETCH_EDUCATION:
                return{
                    ...state,
                    message : action.message,
                    educationInfo : action.payload
                }

            case JOB_APPLY:
                return {
                    ...state,
                    message: action.message
                }

            case FETCH_EXPERIENCE:
                return {
                    ...state,
                    message: action.message,
                    experienceInfo: action.payload
                }

            case ADD_EXPERIENCE:
                return {
                    ...state,
                    message: action.message
                    // experienceInfo: [...state.experienceInfo, action.payload]
                }
            
            case UPDATE_EXPERIENCE:
                return {
                    ...state,
                    message: action.message
                    // educationInfo: [...state.experienceInfo, action.payload]
                }

            case FETCH_STUDENT:
                return {
                    ...state,
                    studentDetails: action.payload
                }

            case SEARCH:
                return{
                    ...state,
                    message: action.message,
                    jobDetails: action.payload
                }

            default:
                return state;
        }
    }