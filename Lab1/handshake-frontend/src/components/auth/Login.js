import React, {Component} from 'react';
import axios from 'axios';
import logo from '../auth/sjsulogo.png';
import { Redirect } from 'react-router';
import {API_ENDPOINT} from '../controller/endpoint';


export default class Login extends Component{
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password:"",
            name:"",
            msg: "",
            isLogin: false,
            showError: false,
            showNullError: false
        };

        this.instance = axios.create({
          baseURL: API_ENDPOINT,
          timeout: 1000,
        });

        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);

    }

    //handle email and name
   handleChange = (e) => {
      this.setState({
        [ e.target.name ] : e.target.value
      });
   }

    submit = async (e) => {
        e.preventDefault();

        const {email, password} = this.state;

        if(email === '' || password === ''){
          this.setState({
            showError: false,
            showNullError: true,
            isLogin: false
          });
        }else{
              this.instance.post('/studentLogin', {
                email, 
                password
              }).then((response) =>{
                    if(
                      response.data.message === "Email doesn't match"
                      || response.data.message === 'password doesnt match'
                    ){

                      console.log("login_error: ", response.data.message);

                      this.setState({
                        showError: true,
                        showNullError: false
                      });
                    }else{
                      console.log("responseData: ", response.data);

                      localStorage.setItem('JWT', response.data.token);
  
                      this.setState({
                        isLogin: true,
                        showNullError: false,
                        showError: false
                      }, () => {
                        this.props.history.push("/jobBoard");
                      });
                    }
                  })
            }
        }

    render(){

      const {showError, isLogin, showNullError}= this.state;

      if(!isLogin){
        return(
          <div class="ui middle aligned center aligned grid" style={{marginTop: "5%"}}>
              <div class="column" id="loginStud">

            <form action=" " method="POST" class="ui large form">
              <div class="ui stacked secondary  segment login" style={{padding: "10px"}}>

                <div id="logo-id" style= {{marginTop: "10%" , marginBottom: "8%"}}>
                    <img src={logo}   class="logo-class"  />
                </div>
                <div class="ui divider"></div>
                <h1 class="ui image header">
                    <div class="content">
                        Sing In
                    </div>
                  </h1>
            
                <div class="field" >
                 <span class="ui left icon input" style={{margin: "10px"}}><h4>SJSU Email ID</h4></span>
                  <div class="ui left icon input">
                    <i class="user icon"></i>
                      <input onChange={this.handleChange}  id="email" type="text" name="email" placeholder="Email address" />
                  </div>
                  {/* <div  style={{marginTop:"5%"}}>
                      <span style={{color: "red"}}>{this.state.errMsg1}</span>
                  </div> */}
                </div>
                <div class="field" >
                <span class="ui left icon input" style={{margin: "10px"}}><h4>Password</h4></span>
                  <div class="ui left icon input">
                    <i class="lock icon"></i>
                    <input onChange={this.handleChange} id="password" type="password" name="password" placeholder="Password" />
                  </div>
                  {/* <div style={{marginTop:"5%"}}>
                      <span style={{color: "red"}}>{this.state.errMsg2}</span>
                  </div> */}
                </div>
                <div style={{marginBottom:"5%"}}>
                    <span style={{color: "red"}}>{this.state.msg}</span>
                  </div>
                <div onClick={this.submit} class="ui fluid large blue submit button" style={{fontSize: "1.3em"}}>Login</div>
                <br/>
              </div>          
            </form>
            {showNullError && (
            <div className="ui large message">
              <span style={{color: "red"}}><p>The username or password cannot be null.</p></span>
            </div>
            )}
            {showError && (
            <div className="ui large message">
             <span style={{color: "red"}}> <p>The username or password doesnt match. Please try again</p></span>
            </div>
            )}
            <div class="ui message regStud">
                <a href="/register">Register</a>
            </div>
          </div>
        </div>
        )
      }else{
        return (
          <Redirect to="/jobBoard "/>    
        )
      }
    }
}














    //     console.log("userInfo",userInfo);

    //     if(this.state.email === ""){
    //       this.setState({
    //         errMsg1: "Please enter email!",
    //         errMsg2: "",
    //         msg:""
    //       })
    //     }else if(this.state.password === ""){
    //       this.setState({
    //         errMsg2: "Please enter password!",
    //         errMsg1:"",
    //         msg:""
    //       })
    //     }else{

    //     axios.defaults.withCredentials = true;

    //      await axios.post('/studentLogin', userInfo)
    //         .then(response => {

    //                 this.setState({
    //                   errMsg2: "",
    //                   errMsg1: "",
    //                   msg: "",
    //                 })

    //                 console.log("response: ", response);

    //                if(response.status === 200 && response.data === "Email doesn't match") {
    //                   this.setState({
    //                     msg:  response.data,
    //                     login: false
    //                   })
    //                   console.log("SUCCESS: ", response.data);
    //                 }else if(response.status === 200 && response.data === "password doesnt match" ) {
    //                   this.setState({
    //                     msg: response.data,
    //                     login: false
    //                   })
    //                 }else if(response.status === 200 && response.data ==="Missing credentials"){
    //                     this.setState({
    //                       msg:response.data,
    //                       login: false
    //                     })
    //                 }
    //                  else {
    //                   console.log("response token: ",  response.data.token);
    //                   localStorage.setItem('JWT', response.data.token);
    //                   this.setState({
    //                     msg: response.data.message,
    //                     isLogin: true
    //                   })
    //                 }
    //         })
    //       }
    // }
