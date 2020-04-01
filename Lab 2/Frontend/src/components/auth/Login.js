import React, {Component} from 'react';
import logo from '../auth/sjsulogo.png';
import { Redirect } from 'react-router';
import {connect} from 'react-redux';
import {login} from '../../actions/loginAction';
import PropTypes from 'prop-types';

class Login extends Component{
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

        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

   handleChange = (e) => {
      this.setState({
        [ e.target.name ] : e.target.value
      });
   }

   componentWillReceiveProps(nextProps){
     console.log("calling willrecieveProps");
      if(nextProps.isLogin){
        this.setState({
          isLogin: nextProps.isLogin
        })
        console.log("props recieved", nextProps.isLogin);
      }
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
              await this.props.login(email, password);
         }

        //  if(this.state.isLogin){
        //       this.props.history.push("jobBoard");
        //  }
        }

    render(){

      const {showError, isLogin, showNullError}= this.state;

      if(!isLogin){
        return(
          <div className="ui middle aligned center aligned grid" style={{marginTop: "5%"}}>
              <div className="column" id="loginStud">

            <form action=" " method="POST" className="ui large form">
              <div className="ui stacked secondary  segment login" style={{padding: "10px"}}>

                <div id="logo-id" style= {{marginTop: "10%" , marginBottom: "8%"}}>
                    <img src={logo}   className="logo-class"  />
                </div>
                <div className="ui divider"></div>
                <h1 className="ui image header">
                    <div className="content">
                        Sing In
                    </div>
                  </h1>
            
                <div className="field" >
                 <span className="ui left icon input" style={{margin: "10px"}}><h4>SJSU Email ID</h4></span>
                  <div className="ui left icon input">
                    <i className="user icon"></i>
                      <input onChange={this.handleChange}  id="email" type="text" name="email" placeholder="Email address" />
                  </div>
                </div>
                <div className="field" >
                <span className="ui left icon input" style={{margin: "10px"}}><h4>Password</h4></span>
                  <div className="ui left icon input">
                    <i className="lock icon"></i>
                    <input onChange={this.handleChange} id="password" type="password" name="password" placeholder="Password" />
                  </div>
                </div>
                <div style={{marginBottom:"5%"}}>
                    <span style={{color: "red"}}>{this.state.msg}</span>
                  </div>
                <div onClick={this.submit} className="ui fluid large blue submit button" style={{fontSize: "1.3em"}}>Login</div>
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
            <div className="ui message regStud">
                <a href="/register">Register</a>
            </div>
          </div>
        </div>
        )
      }else{
        return (
          <Redirect to="jobBoard"/>    
        )
      }
    }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isLogin : PropTypes.bool.isRequired,
  loginError: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    isLogin: state.Handshake_User_Info.isLogin,
    loginError: state.Handshake_User_Info.loginError
})

export default connect(mapStateToProps, {login})(Login);
