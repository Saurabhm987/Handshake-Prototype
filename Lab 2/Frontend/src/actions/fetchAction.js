import {FETCH_COMPANY, LOGOUT, GET_APPLICATIONS, JOB_APPLIED_STUDENT,FETCH_DASHBOARD, FETCH_COMPANY_PROFILE, FETCH_EVENT, FETCH_APPLIED_EVENT, FETCH_STUDENT_PROFILE, FETCH_EXPERIENCE, FETCH_EDUCATION, SEARCH, FETCH_STUDENT, ERROR, FETCH_SKILL} from './types';
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
                                type : ERROR,
                                message: "jwt expired"
                    });
                    }else{
                        dispatch({
                            type : FETCH_DASHBOARD,
                            payload: response.data,
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
                dispatch({
                    type: ERROR,
                    message: 'Error while fetching events'
                })
            }
        })
}


export const  fetchStudentProfile = (accessString, email) => dispatch => {
    axios.get(API_ENDPOINT+"/profileStudent/userInfo", { 
        headers: {
            Authorization: `JWT ${accessString}`
        },
        params: {
            email: email
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
                        
                        localStorage.setItem('profileInfo', JSON.stringify(response.data))

                        dispatch({
                            type : FETCH_STUDENT_PROFILE,
                            payload: response.data,
                            message: "fetched student profile!"
                         });
                    }  
            }else{
                dispatch({
                    type: ERROR,
                    message: 'Error while fetching student profile'
                })
            }
        })
}

export const  fetchCompanyProfile = (accessString, email) => dispatch => {
    axios.get(API_ENDPOINT+"/profileCompany/companyInfo", { 
        headers: {
            Authorization: `JWT ${accessString}`
        },
        params: {
            email: email
        }
    } ).then(response => {
            if(response.status === 200){
                    if(response.data === "jwt expired"){
                            localStorage.removeItem('JWT');
                            dispatch({
                                type: FETCH_COMPANY_PROFILE,
                                message: "jwt expired",
                                isLogin: false
                            })
                    }else{
                        
                        localStorage.setItem('profileInfo', JSON.stringify(response.data))

                        dispatch({
                            type : FETCH_COMPANY_PROFILE,
                            payload: response.data,
                            message: "fetched company profile!",
                            isLogin: true
                         });
                    }  
            }else{
                console.log("ERROR");
            }
        })
}


export const  fetchExperience = (accessString, email) => dispatch => {
    axios.get(API_ENDPOINT+"/profileStudent/expInfo", { 
        headers: {
            Authorization: `JWT ${accessString}`
        },
        params:{
            email: email
        }
    } ).then(response => {
            if(response.status === 200){
                    console.log(`response : ${response}`)
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

export const  fetchEducation = (accessString, email) => dispatch => {
    axios.get(API_ENDPOINT+"/profileStudent/eduInfo", { 
        headers: {
            Authorization: `JWT ${accessString}`
        },
        params: {
            email: email
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


export const  fetchStudent = (accessString) => dispatch => {
    axios.get(API_ENDPOINT+"/getStudents", { 
        headers: {
            Authorization: `JWT ${accessString}`
        }
    } ).then(response => {
            if(response.status === 200){
                    if(response.data === "jwt expired"){
                            localStorage.removeItem('JWT');
                            dispatch({
                                type: FETCH_STUDENT,
                                message: "jwt expired"
                            })
                    }else{
                        dispatch({
                            type : FETCH_STUDENT,
                            payload: response.data,
                            message: "fetched student!"
                         });
                    }  
            }else{
                console.log("ERROR");
            }
    })
    .catch( error => {
        console.log('error : ', error)
    })
}


export const  fetchCompanies = (accessString) => dispatch => {
    console.log('hitting fetch companies')
    axios.get(API_ENDPOINT+"/getCompanies", { 
        headers: {
            Authorization: `JWT ${accessString}`
        }
    } ).then(response => {
            if(response.status === 200){
                    if(response.data === "jwt expired"){
                            localStorage.removeItem('JWT');
                            dispatch({
                                type: FETCH_COMPANY,
                                message: "jwt expired"
                            })
                    }else{
                        dispatch({
                            type : FETCH_COMPANY,
                            payload: response.data,
                            message: "fetched student!"
                         });
                    }  
            }else{
                console.log("ERROR");
            }
    })
    .catch( error => {
        console.log('error : ', error)
    })
}


export const fetchCompanyPostedEvent =(accessString) => dispatch => {
    axios.get(API_ENDPOINT+"/getJobPosted/postedevent", { 
    headers: {
        Authorization: `JWT ${accessString}`
      }
  })
  .then(response => {
          if(response.status === 200){
              console.log('posted event - ', response)
            if(response.data === "jwt expired" && response.data === "jwt malformed"){
              localStorage.removeItem('JWT');
              dispatch({
                  type: FETCH_EVENT,
                  isLogin: false
              })
            }else{
                dispatch({
                    type: FETCH_EVENT,
                    message: 'Event Fetched',
                    payload: response.data,
                })
            }
          }
      })
      .catch((err)=>{
          console.error(err);
      })
}



export const getJobAppliedStudents = (accessString) => dispatch => {
    axios.get(API_ENDPOINT+"/getJobAppliedStudents",{
        headers: {
          Authorization: `JWT ${accessString}`
      }} ).then(response => {
                if(response.status === 200){
                    const {data} = response
                  if(data === "jwt expired"){
                    localStorage.removeItem('JWT');
                    dispatch({
                        type: ERROR,
                        message: data
                    })
                  }else{
                      dispatch({
                          type: JOB_APPLIED_STUDENT,
                          payload: data
                      })
                  }
                }else{
                    dispatch({
                        type: ERROR,
                        message: 'Error while changing status'
                    })
                }
            })
}


export const getApplications = (accessString) => dispatch => {
    axios.get(API_ENDPOINT+"/getDetails",{ 
        headers: {
            Authorization: `JWT ${accessString}`
        },
        params: {
            info: 'appliedJob'
        }
    }).then(response => {
            if(response.status === 200){
                if(response.data === "jwt expired"){
                localStorage.removeItem('JWT');
                dispatch({
                    type: LOGOUT,
                    message: response.data,
                    loggedIn : false,
                })
                }else{
                    dispatch({
                        type: GET_APPLICATIONS,
                        payload: response.data
                    })
                }
            }else{
                dispatch({
                    type: ERROR,
                    message: 'Error while fetching applications'
                })
            }
        })
}


export const fetchSkill = (accessString, email) => dispatch => {
    axios.get( API_ENDPOINT+ "/fetchSkill", 
    {
        headers: {
            Authorization: `JWT ${accessString}`
        },
        params: {
            email: email
        }
    }
    )
    .then( response => {
        if(response.status === 200){
            const { data } = response
            if(data === "jwt expired"){
                dispatch({
                    type: ERROR,
                    message: data
                })
            }else{
                dispatch({
                    type: FETCH_SKILL,
                    payload: data
                })
            }
        }
    })
    .catch( err  =>{
        console.log('error - ', err)
        dispatch({
            type: ERROR,
            message: 'Error while fetching skills'
        })
    })
}

export const  search = (searchText,data) => dispatch => {
    if(searchText){
        var result = data.filter( item => item.title.includes(searchText))
    }

    dispatch({
        type: FETCH_DASHBOARD,
        payload: result
    })
}

export const searchEvent = (searchText, data) => dispatch => {
        if(searchText){
            var result  = data.filter( item => item.eventName.includes(searchText) )
        }

        dispatch({
            type: FETCH_EVENT,
            payload: result
        })
}

export const searchJobType = (searchText, data) => dispatch => {
    if(searchText){
        var result  = data.filter( item => item.job_type.includes(searchText) )
    }

    dispatch({
        type: FETCH_DASHBOARD,
        payload: result
    })
}


export const filterStudent = (searchText, data) => dispatch => {
    if(searchText){
        var result  = data.filter( item => item.profileInfo.major.includes(searchText) )
    }

    dispatch({
        type: FETCH_STUDENT,
        payload: result
    })
}


