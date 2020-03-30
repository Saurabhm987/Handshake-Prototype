import {UPDATE_STUDENT_PROFILE} from './types';
import {API_ENDPOINT} from '../components/controller/endpoint';
import axios from 'axios';

export const  updateStudentProfile = (profleInfo, accessString) => dispatch => {
    axios.put(API_ENDPOINT+"/updateUserProfile",{
      params:{
        requestInfo: "LOGIN",
        data: profleInfo
      }
    }, { 
        headers: {
            Authorization: `JWT ${accessString}`
        }
    } ).then(response => {
              if(response.status === 200){
                      if(response.data === "jwt expired"){
                              localStorage.removeItem('JWT');
                              dispatch({
                                type : UPDATE_STUDENT_PROFILE,
                                message: "jwt expired"
                    });
                 }
                 dispatch({
                    type : UPDATE_STUDENT_PROFILE,
                    message: "Profile Updated"
                 });
              }else{
                console.log("bad request!")
              }
          })
  }