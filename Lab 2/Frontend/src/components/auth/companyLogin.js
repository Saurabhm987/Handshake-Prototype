import React, {Component} from 'react';
import axios from 'axios';
import logo from '../auth/sjsulogo.png';
import {API_ENDPOINT} from '../controller/endpoint';


export default class CompanyLogin extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            email : "",
            password: "",
            isLogin: false,
            message_email: "",
            message_psw: "",
            message_try:""
        }

        this.instance = axios.create({
          baseURL: API_ENDPOINT,
          timeout: 1000,
        });

        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);

    }

    handleChange = (e) => {
      e.preventDefault();
       this.setState({
         [e.target.name] : e.target.value
       })
    }

    submit = async (e) => {
        e.preventDefault();

        const userInfo = {
            email: this.state.email,
            password: this.state.password
        }

        console.log("userInfo",userInfo);
        
        axios.defaults.withCredentials = true;
        if(userInfo.email ===""){
            this.setState({
                message_email: "Please enter email!"
            })
        }else if(userInfo.password === ""){
            this.setState({
              message_psw: "Please enter password!",
              message_email:""
            })
        }else{
          await this.instance.post('/companyLogin', userInfo)
          .then(response => {

                console.log("response_data: ", response.data);
                localStorage.setItem('JWT', response.data.token);

                  if(response.status === 200){
                    if(response.data === "jwt expired"){

                      this.props.history.push("companyLogin");

                    } else if(response.data === "Email doesn't match"){
                        this.setState({
                          message_email: "Email doesn't match!"
                        })
                    }else if(response.data === "password doesnt match"){
                        this.setState({
                          message_psw: "Password doesn't match!"
                        })
                    }else{
                      this.props.history.push("companyProfile");
                    }
                  } else{
                      console.log("response_error!");
                  }
          })
        }
    }

    render(){
      return(
        <div class="ui middle aligned center aligned grid" style={{marginTop: "5%"}}>
            <div class="column" id="loginStud" >
          <form action=" " method="POST" class="ui large form" >
            <div class="ui stacked secondary  segment login" >

              <div id="logo-id" style= {{marginTop: "8%" , marginBottom: "8%"}}>
                  <img src={logo}   class="logo-class"  />
              </div>

              <div class="ui divider"></div>

              <h1 class="ui image header">
                  <div class="content">
                      Sing In
                  </div>
                </h1>
          
              <div class="field">
               <span class="ui left icon input"><h4>Employee Email ID</h4></span>
                <div class="ui left icon input">
                  <i class="user icon"></i>
                    <input onChange={this.handleChange}  id="email" type="text" name="email" placeholder="E-mail address" />
                </div>
                <div>
                  <span style={{color: "red"}}> {this.state.message_email}</span>
                </div>
              </div>

              <div class="field">
              <span class="ui left icon input"><h4>Password</h4></span>
                <div class="ui left icon input">
                  <i class="lock icon"></i>
                  <input onChange={this.handleChange} id="password" type="password" name="password" placeholder="Password" />
                </div>
                <div>
                  <span  style={{color: "red"}}>{this.state.message_psw}</span>
                </div>
              </div>
              <div onClick={this.submit} class="ui fluid large blue submit button" style={{fontSize: "1.5em"}}>Login</div>
              <div>
                <span  style={{color: "red"}}>{this.state.message_try}</span>
              </div>
            </div>          
          </form>
          <div class="ui message">
              <a href="/companyReg">Register</a>
          </div>
        </div>
      </div>
      )
    }
}
