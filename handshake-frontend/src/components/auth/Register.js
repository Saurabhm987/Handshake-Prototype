import React, {Component} from 'react';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';

// import cookie from 'react-cookies';
// import {Redirect} from 'react-router';


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

        const regInfo = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            uniName: this.state.uniName, 
            access: this.state.access
        }

        console.log("requested body in client: ", regInfo);

        axios.defaults.withCredentials = true;

        await axios.post('http://localhost:3001/register', regInfo)
            .then(response => {
                console.log("responseRegister: ", response );
                if(response.status === 200){
                    console.log("successfully regiesterd!!!!!!!!!!");
                    this.props.history.push('/login');

                }else{
                  console.log("bad response!!!!!!!");
                }
            })
    }

    render(){
        return(
            <MDBContainer>
            <MDBRow>
              <MDBCol md="6">
                <form>
                  <p className="h4 text-center mb-4">Sign up</p>
                  <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                    Your name
                  </label>
                  <input onChange={this.nameHandler} type="text" id="defaultFormRegisterNameEx" className="form-control" />
                  <br />
                  <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                    Your email
                  </label>
                  <input onChange={this.emailHandler} type="email" id="defaultFormRegisterEmailEx" className="form-control" />
                  <br />
                  <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
                    Your password
                  </label>
                  <input onChange={this.passwordHandler} type="password" id="defaultFormRegisterPasswordEx" className="form-control" />
                  <br />
                  <label htmlFor="defaultFormRegisterCollegeNameEx" className="grey-text">
                    Your college name
                  </label>
                  <input onChange={this.uniNameHandler} type="text" id="defaultFormRegisterCollegeNameEx" className="form-control" />
                  <label htmlFor="defaultFormRegisterStudentorProfEx" className="grey-text">
                    Student or Prof 
                  </label>
                  <input onChange={this.accessControlHandler} type="text" id="defaultFormRegisterStudentorProfEx" className="form-control" />
                  <div className="text-center mt-4">
                    <MDBBtn onClick={this.submitForm} color="primary" type="submit">
                      Register
                    </MDBBtn>
                  </div>
                </form>
              </MDBCol>
            </MDBRow>
          </MDBContainer>

        // -----------------------------------------------------------------------------

            // <form class="ui form">
            //     <div class="field">
            //         <label>Student Name</label>
            //         <input onChange={this.nameHandler} type="text" name="name" placeholder=" Student Name"/>
            //     </div>
            //     <div class="field">
            //         <label>Email</label>
            //          <input onChange={this.emailHandler} type="email" name="email" placeholder="Email"/>
            //     </div>
            //     <div class="field">
            //         <label>Password</label>
            //          <input onChange={this.passwordHandler} type="password" name="email" placeholder="Email"/>
            //     </div>
            //     <div class="field">
            //         <label>University Name</label>
            //          <input onChange={this.uniNameHandler} type="text" name="uniName" placeholder="University Name"/>
            //     </div>
            //     <button onClick= {this.submitForm} class="ui button" type="submit">Submit</button>
            // </form>
        );
    }
}