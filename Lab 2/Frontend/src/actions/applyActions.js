import {JOB_APPLY, ERROR, MESSAGE, LOGOUT, ADD_SKILL} from './types';
import {API_ENDPOINT} from '../components/controller/endpoint';
import axios from 'axios';

const accessString = localStorage.getItem('JWT');

export const  applyJob = (details) => dispatch => {
  axios.post(API_ENDPOINT+"/applyJob",{
    params:{
      id: details.Job_Id,
      name: details.name,
      title: details.title,
      profile_pic: details.profile_pic
    }
  }, { 
      headers: {
          Authorization: `JWT ${accessString}`
      }
  } ).then(response => {
      console.log('respone - ', response)
            if(response.status === 200){
                    if(response.data === "jwt expired"){
                            localStorage.removeItem('JWT');
                            dispatch({
                              type: ERROR,
                              message: response.data
                            })
                    }else if(response.data.error){
                      dispatch({
                        type: ERROR,
                        message: response.data.error
                      })
                    }else{
                      dispatch({
                        type : JOB_APPLY,
                        message: response.data.message
                      });
                    }
            }else{
                console.log("ERROR");
            }
        })
}




export const  postJob = (jobInfo, accessString) => dispatch => {
  axios.post(API_ENDPOINT+"/postJob",{
    params:{
      data: jobInfo
    }
  }, { 
      headers: {
          Authorization: `JWT ${accessString}`
      }
  } ).then(response => {
      console.log('respone - ', response)
            if(response.status === 200){
                    console.log('apply job response - ', response)
                    const { data } = response
                    if(data.error){
                        const {error} = data
                        dispatch({
                          type:ERROR,
                          message: error
                        })
                    }else{
                      dispatch({
                        type: MESSAGE,
                        message: data.message
                      })
                    }
            }
        })
        .catch(() => {
          dispatch({
            type: ERROR,
            message: 'Error while posting job'
          })
        })
}



export const  postEvent = (eventInfo, accessString) => dispatch => {
  axios.post(API_ENDPOINT+"/postEvent",{
    params:{
      data: eventInfo
    }
  }, { 
      headers: {
          Authorization: `JWT ${accessString}`
      }
  } ).then(response => {
      console.log('respone - ', response)
            if(response.status === 200){
                    console.log('apply event response - ', response)
                    const { data } = response
                    if(data.error){
                        const {error} = data
                        dispatch({
                          type:ERROR,
                          message: error
                        })
                    }else{
                      dispatch({
                        type: MESSAGE,
                        message: data.message
                      })
                    }
            }
        })
        .catch(() => {
          dispatch({
            type: ERROR,
            message: 'Error while posting event'
          })
        })
}


export const  applyEvent = (accessString, state) => dispatch => {
    console.log('applyevent')
     axios.post(API_ENDPOINT+"/applyEvent",{
      params:{
        event_id: state.appliedEventId,
        company_name: state.appliedEvCompany,
        event_name: state.appliedEvName, 
        event_status: "Applied",
        profile_pic: state.profile_pic,
        event_loc: state.event_loc
      }
    }, { 
        headers: {
            Authorization: `JWT ${accessString}`
        }
    } ).then(response => {
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
                  type: MESSAGE,  
                  message: 'Event Registerd!'
                })
              }
            }
        })
        .catch(() => {
          console.log('Error while registering event')
          dispatch({
            type: ERROR,
            message: 'Error while registering event'
          })
        })
}


export const addSkill = (accessString, skill) => dispatch => {
  axios.post(API_ENDPOINT+"/addSkill", 
  {
    params: {
      data: skill
    }
  },
  {
      headers: {
          Authorization: `JWT ${accessString}`
      }
  })
    .then( response => {
      console.log('response - ', response)  
      if(response.status === 200){
        const {data} = response
        if(data === 'jwt expired'){
          dispatch({
            type: LOGOUT,
            message: data
          })
        }
        dispatch({
          type: ADD_SKILL,
          payload: data
        })
      }
    })
    .catch(() => {
       dispatch({
         type: ERROR,
         message: 'Error while adding skills'
       })
    })

}