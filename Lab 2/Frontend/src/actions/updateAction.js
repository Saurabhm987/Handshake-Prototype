import {UPDATE_STUDENT_PROFILE,UPDATE_SUMMARY, ADD_EDUCATION, UPDATE_EDUCATION, ADD_EXPERIENCE, UPDATE_EXPERIENCE } from './types';
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
                    message: "Profile Updated",
                    payload: profleInfo
                 });
              }else{
                console.log("bad request!")
              }
          })
  }


  export const  updateSummary = (summary, accessString) => dispatch => {
    axios.put(API_ENDPOINT+"/updateUserProfile",{
      params:{
        requestInfo: "SUMMARY",
        data: summary
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
                                type : UPDATE_SUMMARY,
                                message: "jwt expired"
                    });
                 }
                 dispatch({
                    type : UPDATE_SUMMARY,
                    message: "Summary Updated",
                    payload: summary
                 });
              }else{
                console.log("bad request!")
              }
          })
  }


  export const  addEducation = (educationInfo, accessString) => dispatch => {
    console.log("add_education_action.....");
    axios.post(API_ENDPOINT+"/addEduExp",{
      params:{
        requestInfo: "EDU",
        data: educationInfo
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
                                type : ADD_EDUCATION,
                                message: "jwt expired"
                    });
                 }
                 console.log("dispating_action...");
                 console.log("response: ", response);
                 console.log("message: ", response.data.message);
                 dispatch({
                    type : ADD_EDUCATION,
                    message: response.data.message,
                 });
              }else{
                console.log("bad request!")
              }
          })
  }


  export const  addExperience = (experiencInfo, accessString) => dispatch => {
    axios.post(API_ENDPOINT+"/addEduExp",{
      params:{
        requestInfo: "EXP",
        data: experiencInfo
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
                                type : ADD_EXPERIENCE,
                                message: "jwt expired"
                    });
                 }
                 dispatch({
                    type : ADD_EXPERIENCE,
                    message: response.data.message,
                    // payload: educationInfo
                 });
              }else{
                console.log("bad request!")
              }
          })
  }


  export const  updateEducation = (eduInfo, accessString) => dispatch => {
    axios.put(API_ENDPOINT+"/updateUserProfile",{
      params:{
        requestInfo: "EDU",
        data: eduInfo
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
                                type : UPDATE_EDUCATION,
                                message: "jwt expired"
                    });
                 }
                 dispatch({
                    type : UPDATE_EDUCATION,
                    message: "Education Updated",
                    // payload: eduInfo
                 });
              }else{
                console.log("bad request!")
              }
          })
  }


  export const  updateExperience = (expInfo, accessString) => dispatch => {
    axios.put(API_ENDPOINT+"/updateUserProfile",{
      params:{
        requestInfo: "EXP",
        data: expInfo
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
                                type : UPDATE_EXPERIENCE,
                                message: "jwt expired"
                    });
                 }
                 dispatch({
                    type : UPDATE_EXPERIENCE,
                    message: "Experience Updated",
                    // payload: eduInfo
                 });
              }else{
                console.log("bad request!")
              }
          })
  }