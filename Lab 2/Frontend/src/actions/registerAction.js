import {REGISTER} from './types';
import {API_ENDPOINT} from '../components/controller/endpoint';
import axios from 'axios';

export const registerCompany = (regObj) => (dispatch) =>{
    console.log("dispatching register action!!!");
    axios.defaults.withCredentials = true;
    axios.post( API_ENDPOINT+'/registerCompany', regObj)
        .then(response => {
            console.log("dispatching register body...");
            if(response.status === 200){
                alert("Registerd! Being Redirect to login!");
                console.log("successfully regiesterd!!!!!!!!!!");
                dispatch({
                    type : REGISTER,
                    details: regObj, 
                    message: response.data.message,
                    isRegistered: true
                });
            }else{
              console.log("bad response!!!!!!!");
            }
        })
}


export const registerStudent = (regObj) => dispatch => {
    console.log("dispathcing register student action!");
    axios.defaults.withCredentials = true;
    axios.post( API_ENDPOINT+'/registerStudent', regObj)
        .then(response => {
            console.log("dispatching register body...");
            if(response.status === 200){
                alert("Registerd! Being Redirect to login!");
                console.log("successfully regiesterd!!!!!!!!!!");
                dispatch({
                    type : REGISTER,
                    details: regObj, 
                    message: response.data.message,
                    isRegistered: true
                });
            }else{
              console.log("bad response!!!!!!!");
            }
        })
}