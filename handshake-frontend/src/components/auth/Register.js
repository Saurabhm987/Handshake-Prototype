import React, {Component} from 'react';
import axios from 'axios';
import {API_ENDPOINT} from '../controller/endpoint';


export default class Register extends Component{
    constructor(props){
        super(props);

        this.state = {
            name : "",
            email: "",
            password: "",
            uniName: "",
            access: "",
            authFlag: false
        }

        this.instance = axios.create({
            baseURL: API_ENDPOINT,
            timeout: 1000,
          });

        this.passwordHandler = this.passwordHandler.bind(this);
        this.uniNameHandler = this.uniNameHandler.bind(this)
        this.nameHandler = this.nameHandler.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.accessControlHandler = this.accessControlHandler.bind(this);
        
    }

    passwordHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    nameHandler = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    uniNameHandler = (e) => {
        this.setState({
            uniName: e.target.value
        })
    }

    emailHandler = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    
    accessControlHandler =(e) => {
      this.setState({
        access: e.target.value
      })
    }

    submitForm = async (e) => {
        e.preventDefault();

        const { name, uniName, email, password, access} = this.state;

        console.log("studentInfo: ", this.state);

        axios.defaults.withCredentials = true;

        await this.instance.post('/register', { name,uniName, email, password, access})
            .then(response => {
                console.log("responseRegister: ", response );
                if(response.status === 200){
                    console.log("successfully regiesterd!!!!!!!!!!");
                    alert("Successfully Registerd! You are being redirected to login!")
                    this.props.history.push('/login');

                }else{
                  console.log("bad response!!!!!!!");
                }
            })
    }

    render(){
        return(

          <div   style={{margin: "8% 15% 8% 26%", width:"50%"}}>
            <div>
                <h2>Join the Handshake community</h2>
            </div>
            <br/>
            <div>
              <h3>Discover jobs and internships based on your interests.</h3>
            </div>
            <div>
                <a href="/register">Are you an employer? Create an account here.</a>
            </div>
            <br/>
            <form className="ui form">
              <div className="field">
                    <h5><label>University Name</label></h5>
                     <input onChange={this.uniNameHandler} type="text" name="uniName" placeholder="University Name"/>
                </div>
                <br/>
                <div className="field">
                    <h5><label>Student Name</label></h5>
                    <input onChange={this.nameHandler} type="text" name="name" placeholder=" Student Name"/>
                </div>
                <br/>
                <div className="field">
                    <h5><label>Email Adress</label></h5>
                    <label>Please use your school email</label>
                     <input onChange={this.emailHandler} type="email" name="email" placeholder="Email"/>
                </div>
                <br/>
                <div className="field" >
                    <h5><label>Password</label></h5>
                     <input onChange={this.passwordHandler} type="password" name="email" placeholder="Email"/>
                </div> 
                <br/>
                <button onClick= {this.submitForm} className=" large ui button" type="submit">Submit</button>
              </form>
            </div>
        );
    }
}
