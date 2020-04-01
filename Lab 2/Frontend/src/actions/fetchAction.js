import {FETCH_DASHBOARD, FETCH_EVENT, FETCH_APPLIED_EVENT, FETCH_STUDENT_PROFILE, FETCH_EXPERIENCE, FETCH_EDUCATION} from './types';
import {API_ENDPOINT} from '../components/controller/endpoint';
import axios from 'axios';

export const  fetchDashboard = (accessString) => dispatch => {
    axios.get(API_ENDPOINT+"/getJobBoard/board", { 
        headers: {
            Authorization: `JWT ${accessString}`
        }
    } ).then(response => {
            if(response.status === 200){
                    if(response.data === "jwt expired"){
                            localStorage.removeItem('JWT');
                            dispatch({
                                type : FETCH_DASHBOARD,
                                message: "jwt expired"
                    });
                    }else{
                        dispatch({
                            type : FETCH_DASHBOARD,
                            payload: response.data,
                            message:"job fetched!"  
                         });
                    }
            }else{
                console.log("ERROR");
            }
        })
}


export const  fetchEvent = (accessString) => dispatch => {
    axios.get(API_ENDPOINT+"/getEventBoard/board", { 
        headers: {
            Authorization: `JWT ${accessString}`
        }
    } ).then(response => {
            if(response.status === 200){
                    if(response.data === "jwt expired"){
                            localStorage.removeItem('JWT');
                            dispatch({
                                type: FETCH_EVENT,
                                message: "jwt expired"
                            })
                    }else{
                        dispatch({
                            type : FETCH_EVENT,
                            payload: response.data,
                            message: "event fetched!"
                         });
                    }  
            }else{
                console.log("ERROR");
            }
        })
}


export const  fetchAppliedEvent = (accessString) => dispatch => {
    axios.get(API_ENDPOINT+"/getEventBoard/appliedevents", { 
        headers: {
            Authorization: `JWT ${accessString}`
        }
    } ).then(response => {
            if(response.status === 200){
                    if(response.data === "jwt expired"){
                            localStorage.removeItem('JWT');
                            dispatch({
                                type: FETCH_APPLIED_EVENT,
                                message: "jwt expired"
                            })
                    }else{
                        dispatch({
                            type : FETCH_APPLIED_EVENT,
                            payload: response.data,
                            message: "fetched applied events"
                         });
                    }  
            }else{
                console.log("ERROR");
            }
        })
}


export const  fetchStudentProfile = (accessString) => dispatch => {
    axios.get(API_ENDPOINT+"/profileStudent/userInfo", { 
        headers: {
            Authorization: `JWT ${accessString}`
        }
    } ).then(response => {
            if(response.status === 200){
                    if(response.data === "jwt expired"){
                            localStorage.removeItem('JWT');
                            dispatch({
                                type: FETCH_STUDENT_PROFILE,
                                message: "jwt expired"
                            })
                    }else{
                        dispatch({
                            type : FETCH_STUDENT_PROFILE,
                            payload: response.data,
                            message: "fetched student profile!"
                         });
                    }  
            }else{
                console.log("ERROR");
            }
        })
}


export const  fetchExperience = (accessString) => dispatch => {
    axios.get(API_ENDPOINT+"/profileStudent/expInfo", { 
        headers: {
            Authorization: `JWT ${accessString}`
        }
    } ).then(response => {
            if(response.status === 200){
                    if(response.data === "jwt expired"){
                            localStorage.removeItem('JWT');
                            dispatch({
                                type: FETCH_EXPERIENCE,
                                message: "jwt expired"
                            })
                    }else{
                        dispatch({
                            type : FETCH_EXPERIENCE,
                            payload: response.data,
                            message: "fetched experience!"
                         });
                    }  
            }else{
                console.log("ERROR");
            }
        })
}

export const  fetchEducation = (accessString) => dispatch => {
    axios.get(API_ENDPOINT+"/profileStudent/eduInfo", { 
        headers: {
            Authorization: `JWT ${accessString}`
        }
    } ).then(response => {
            if(response.status === 200){
                    if(response.data === "jwt expired"){
                            localStorage.removeItem('JWT');
                            dispatch({
                                type: FETCH_EDUCATION,
                                message: "jwt expired"
                            })
                    }else{
                        dispatch({
                            type : FETCH_EDUCATION,
                            payload: response.data,
                            message: "fetched student profile!"
                         });
                    }  
            }else{
                console.log("ERROR");
            }
    })
}