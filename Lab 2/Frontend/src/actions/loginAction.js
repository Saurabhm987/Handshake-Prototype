import {LOGIN, LOGOUT} from './types';
import {API_ENDPOINT} from '../components/controller/endpoint';
import axios from 'axios';

export const  login = (email, password) => dispatch => {
    axios.post(API_ENDPOINT+'/studentLogin', {
        email, 
        password
      }).then((response) =>{
            if(
              response.data.message === "Email doesn't match"
              || response.data.message === 'password doesnt match'
            ){
              console.log("login_error: ", response.data.message);
                dispatch({
                      type : LOGIN,
                      payload: response.data,
                      loginError: response.data.message,
                      isLogin: false
                  });
            }else{
              localStorage.setItem('JWT', response.data.token);
                  dispatch({
                        type : LOGIN,
                        payload: response.data,
                        loginError: response.data.message,
                        isLogin: true
                  });
        }
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
              dispatch({
                  type: LOGOUT,
                  isLogin: false,
                  message: "Logged Out!"
              })
  }