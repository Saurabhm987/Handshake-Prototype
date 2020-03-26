import {JOB_APPLY} from './types';
import {API_ENDPOINT} from '../components/controller/endpoint';
import axios from 'axios';

const accessString = localStorage.getItem('JWT');

export const  applyJob = (details) => dispatch => {
  axios.post(API_ENDPOINT+"/applyJob",{
    params:{
      id: details.JobId,
      company: details.company,
      title: details.title,
      profile_pic: details.profile_pic
    }
  }, { 
      headers: {
          Authorization: `JWT ${accessString}`
      }
  } ).then(response => {
            if(response.status === 200){
                    if(response.data === "jwt expired"){
                            localStorage.removeItem('JWT');
                    }
                    dispatch({
                                type : JOB_APPLY,
                                message: "Applied"
                    });
            }else{
                console.log("ERROR");
            }
        })
}