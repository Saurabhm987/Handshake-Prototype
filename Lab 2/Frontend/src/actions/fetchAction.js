import {FETCH_DASHBOARD, FETCH_EVENT} from './types';
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