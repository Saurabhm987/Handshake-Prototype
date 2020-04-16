import {LOGIN, LOGOUT} from './types';
import {API_ENDPOINT} from '../components/controller/endpoint';
import axios from 'axios';

export const  login = (email, password) => dispatch => {
    axios.post(API_ENDPOINT+'/login', {
        email, 
        password
      }).then((response) =>{
        if(response.data.error){
              dispatch({
                type : LOGIN,
                payload: response.data,
                loginError: response.data.error,
                isLogin: false
            });
          }else{
              localStorage.setItem('JWT', response.data.token);
              console.log("loginActionToken: ", localStorage.getItem('JWT'))
              const token = localStorage.getItem('JWT')
              dispatch({
                    type : LOGIN,
                    payload: response.data,
                    loginError: response.data.message,
                    isLogin: true,
                    token: token
              });
          }
     })
    .catch( error => {
        console.log(`error : ${error}`)
        dispatch({
          type : LOGIN,
          isLogin: false,
          token: null
      });
    })
  }

  export const  companyLogin = (email, password) => dispatch => {
    axios.post(API_ENDPOINT+'/companyLogin', 
      { email, password }
      ).then((response) =>{
          console.log("Action: response_data: ", response.data);
          localStorage.setItem('JWT', response.data.token);

            if(response.status === 200){
              if(response.data === "jwt expired" || response.data.message !== "success"){
                    dispatch({
                      type: LOGIN,
                      payload: response.data,
                      loginError: response.data.message,
                      isLogin: false
                    })
              }else if(response.status === 200){
                    dispatch({
                      type: LOGIN,
                      payload: response.data,
                      loginError: response.data.message,
                      isLogin: true
                    })
                }
            } else{
                console.log("response_error!");
        }
    })
  }

  export const logout = () =>dispatch =>{
              localStorage.removeItem('JWT');
              localStorage.removeItem('profileInfo')
              dispatch({
                  type: LOGOUT,
                  isLogin: false,
                  message: "Logged Out!"
              })
  }