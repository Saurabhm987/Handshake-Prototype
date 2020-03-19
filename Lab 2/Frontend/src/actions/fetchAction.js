import {FETCH_DASHBOARD} from './types';
import {API_ENDPOINT} from '../components/controller/endpoint';
import axios from 'axios';

const accessString = localStorage.getItem('JWT');

export const  fetchDashboard = () => dispatch => {
  axios.get(API_ENDPOINT+"/getJobBoard/board", { 
        headers: {
            Authorization: `JWT ${accessString}`
        }
    } ).then(response => {
            if(response.status === 200){
                    if(response.data === "jwt expired"){
                            localStorage.removeItem('JWT');
                            this.props.history.push("/companyLogin");
                    }
                    dispatch({
                                type : FETCH_DASHBOARD,
                                payload: response.data
                    });
            }else{
                console.log("ERROR");
            }
        })
}