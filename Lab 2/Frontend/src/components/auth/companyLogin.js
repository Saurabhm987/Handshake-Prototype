import React, {Component} from 'react';
import { Redirect } from 'react-router';
import logo from '../auth/sjsulogo.png';
import {connect} from 'react-redux';
import {companyLogin} from '../../actions/loginAction';
import PropTypes from 'prop-types';

class CompanyLogin extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            email : "",
            password: "",
            isLogin: false,
            message:""
        }

        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);

    }

    handleChange = (e) => {
      e.preventDefault();
       this.setState({
         [e.target.name] : e.target.value
       })
    }

    componentWillReceiveProps(nextProps){
      if(nextProps.isLogin){

        console.log("nextPropsIsLogin: ", nextProps.isLogin);

        this.setState({
          isLogin: nextProps.isLogin
        })
      }
      if(nextProps.loginError){
        this.setState({
          message: nextProps.loginError
        })
      }
    }

    submit = async (e) => {
        e.preventDefault();
        const {email, password} = this.state;
        
        if(email ===""){
            this.setState({
                message: "Please enter email!"
            })
        }else if(password === ""){
            this.setState({
              message: "Please enter password!",
            })
        }else{
            await this.props.companyLogin(email, password);
        }
    }

    render(){

      const{isLogin} = this.state;

      if(!isLogin){
      return(
        <div className="ui middle aligned center aligned grid" style={{marginTop: "5%"}}>
            <div className="column" id="loginStud" >
          <form action=" " method="POST" className="ui large form" >
            <div className="ui stacked secondary  segment login" >

              <div id="logo-id" style= {{marginTop: "8%" , marginBottom: "8%"}}>
                  <img src={logo}   className="logo-class"  />
              </div>

              <div className="ui divider"></div>

              <h1 className="ui image header">
                  <div className="content">
                      Sing In
                  </div>
                </h1>
          
              <div className="field">
               <span className="ui left icon input"><h4>Employee Email ID</h4></span>
                <div className="ui left icon input">
                  <i className="user icon"></i>
                    <input onChange={this.handleChange}  id="email" type="text" name="email" placeholder="E-mail address" />
                </div>
                <div>
                  <span style={{color: "red"}}> {this.state.message_email}</span>
                </div>
              </div>
              <div className="field">
              <span className="ui left icon input"><h4>Password</h4></span>
                <div className="ui left icon input">
                  <i className="lock icon"></i>
                  <input onChange={this.handleChange} id="password" type="password" name="password" placeholder="Password" />
                </div>
                <div>
                  <span  style={{color: "red"}}>{this.state.message_psw}</span>
                </div>
              </div>
              <div onClick={this.submit} className="ui fluid large blue submit button" style={{fontSize: "1.5em"}}>Login</div>
              <div>
                <span  style={{color: "red"}}>{this.state.message}</span>
              </div>
            </div>          
          </form>
          <div className="ui message">
              <a href="/companyReg">Register</a>
          </div>
        </div>
      </div>
      )}else{
        return (
          <Redirect to="companyProfile"/>    
        )
      }
    }
}

CompanyLogin.propTypes  = {
  companyLogin: PropTypes.func.isRequired,
  isLogin : PropTypes.bool.isRequired,
  loginError: PropTypes.string.isRequired
}

const mapStateToProps = state =>({
    isLogin: state.Handshake_User_Info.isLogin,
    loginError: state.Handshake_User_Info.loginError
})

export default connect(mapStateToProps, {companyLogin})(CompanyLogin);