import {ERROR, UPDATE_STUDENT_PROFILE, UPDATE_DESCRIPTION, UPDATE_SUMMARY, ADD_EDUCATION, UPDATE_EDUCATION, ADD_EXPERIENCE, UPDATE_EXPERIENCE } from './types';
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
                    payload: response.data
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
                      if(response.data.error === "jwt expired"){
                              localStorage.removeItem('JWT');
                              dispatch({
                                type : ADD_EXPERIENCE,
                                message: "jwt expired"
                    });
                 }
                 dispatch({
                    type : ADD_EXPERIENCE,
                    // message: response.data.message,
                    payload: response.data
                    // payload: response.data
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
                    payload: response.data
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
                    payload: response.data
                 });
              }else{
                console.log("bad request!")
              }
          })
  }


  export const updateDescription = (email, headers, description ) => dispatch => {
    console.log('hitting')
      axios.post(API_ENDPOINT+"/updateCompanyProfile", {
        params: {
            requestInfo: "DESCR",
            data: description,
            email: email
        }
        }, 
        {
            headers: headers
        }
    )
    .then( response => {
        if(response.status === 200){
            dispatch({
              type: UPDATE_DESCRIPTION,
              message: 'Description Updated!',
              payload: response.data
            })
        }
    })
    .catch( error => {
        console.log(`Error : ${error}`)
        alert('Error while updating description')
        dispatch({
          type: ERROR,
          message: 'Error while processing request'
        })
    })
  }


  export const updateProfileInfo = (companyInfo, headers ) => dispatch => {
      axios.post(API_ENDPOINT+"/updateCompanyProfile", {
        params: {
            requestInfo: "LOGIN",
            data: companyInfo
        }
      }, {
        headers: headers
      })
        .then( response => {
            if(response.status === 200){
                this.setState({
                    editMode: !this.state.editMode,
                })
            }else{
                console.log("BAD_REQUEST");
            }
        })
        .catch( error => {
            console.log('error : ', error)
        })
  }


  export const changeStatus = (statusBody) => dispatch => {
     axios.post(API_ENDPOINT+"/changeStatus",  statusBody)
        .then(res=>{
            if(res.status === 200){
              const {data} = res
              console.log('change data - ', data)
                console.log("Status changed!");
                alert("Status changed");
            }else{
                console.log("error!");
                alert("Can't change status!");
            }
        })
        .catch( error => {
          console.log('error - ', error)
        })
  }