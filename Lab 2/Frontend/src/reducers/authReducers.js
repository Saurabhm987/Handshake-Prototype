    import {FETCH_SKILL, ADD_SKILL, GET_APPLICATIONS, JOB_APPLIED_STUDENT,MESSAGE,ERROR, LOGIN, UPDATE_DESCRIPTION, REGISTER,FETCH_COMPANY_PROFILE,  FETCH_DASHBOARD, LOGOUT, JOB_APPLY, FETCH_EVENT, FETCH_APPLIED_EVENT, UPDATE_STUDENT_PROFILE, FETCH_STUDENT_PROFILE, UPDATE_SUMMARY, ADD_EDUCATION, FETCH_EXPERIENCE, UPDATE_EDUCATION, FETCH_EDUCATION, ADD_EXPERIENCE, UPDATE_EXPERIENCE, SEARCH, FETCH_STUDENT} from '../actions/types';

    const initialState = {
        regdetails : {},
        loginDetails: {},
        profileInfo: {},
        jobDetails: [],
        eventDetails: [],
        studentDetails:[],
        companyDetails: {},
        educationInfo: [],
        experienceInfo:[],
        appliedEvents: [],
        job_applied_student: [],
        applications:[],
        skills: [],
        message: "",
        actionMessage:"",
        loginError:"",
        isLogin: false,
        isRegistered: false,
        token: null,
        loggedIn: true,
        error: ""
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
                    isLogin : action.isLogin,
                    token: action.token
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
                    educationInfo: action.payload
                }

            case UPDATE_EDUCATION:
                return{
                    ...state,
                    message:action.message,
                    educationInfo: action.payload
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
                    message: action.message,
                    experienceInfo: action.payload
                }
            
            case UPDATE_EXPERIENCE:
                return {
                    ...state,
                    experienceInfo: action.payload
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

            case FETCH_COMPANY_PROFILE:
                return{
                    ...state,
                    message: action.message,
                    isLogin: action.isLogin,
                    companyDetails: action.payload
                }

            case UPDATE_DESCRIPTION:
                return{ 
                    ...state,
                    message:action.message,
                    companyDetails : {
                        ...state.companyDetails, description:action.payload
                    }
                }

            case ERROR:
                return{
                    ...state,
                    error: action.message
                }

            case MESSAGE:
                return{
                    ...state,
                    actionMessage: action.message
                }

            case JOB_APPLIED_STUDENT:
                return{
                    ...state,
                    job_applied_student: action.payload
                }

            case GET_APPLICATIONS:
                return{
                    ...state,
                    applications: action.payload
                }

            case LOGOUT:
                return{
                    ...state, 
                    loggedIn: action.message
                }

            case ADD_SKILL:
                return{
                    ...state, 
                    skills: action.payload
                }
            
            case FETCH_SKILL:
                return{
                    ...state,
                    skills: action.payload
                }
            
            default:
                return state;
        }
    }