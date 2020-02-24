import React, {Component} from 'react';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';


export default class CompanyReg extends Component{
    constructor(props){
        super(props);

        this.state = {
            name : "",
            email: "",
            password: "",
            loc: "",
            descr: "",
            contact: "",
            authFlag: false
        }

        this.nameHandler = this.nameHandler.bind(this);
        this.emailHandler = this.emailHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.locHandler = this.locHandler.bind(this);
        this.descrHandler = this.descrHandler.bind(this);
        this.contactHandler = this.contactHandler.bind(this);
        this.submitForm = this.submitForm.bind(this);        
    }

    nameHandler = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    emailHandler = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    passwordHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    locHandler = (e) => {
        this.setState({
            loc: e.target.value
        })
    }

    descrHandler = (e) => {
        this.setState({
            descr: e.target.value
        })
    }

    contactHandler = (e) => {
        this.setState({
            contact: e.target.value
        })
    }

    submitForm = async (e) => {
        e.preventDefault();

        const regInfo = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            loc: this.state.loc, 
            descr: this.state.descr,
            contact: this.state.contact
        }

        console.log("requested body in client: ", regInfo);

        axios.defaults.withCredentials = true;

        await axios.post('http://localhost:3001/companyRegister', regInfo)
            .then(response => {
                console.log("responseRegister: ", response );
                if(response.status === 200){
                    console.log("successfully regiesterd!!!!!!!!!!");
                    this.props.history.push('/profaccess');

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
                    company name
                  </label>
                  <input onChange={this.nameHandler} type="text" id="defaultFormRegisterNameEx" className="form-control" />
                  <br />
                  <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                    company email
                  </label>
                  <input onChange={this.emailHandler} type="email" id="defaultFormRegisterEmailEx" className="form-control" />
                  <br />
                  <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
                     password
                  </label>
                  <input onChange={this.passwordHandler} type="password" id="defaultFormRegisterPasswordEx" className="form-control" />
                  <br />
                  <label htmlFor="defaultFormRegisterCollegeNameEx" className="grey-text">
                    location
                  </label>
                  <input onChange={this.locHandler} type="text" id="defaultFormRegisterLocEx" className="form-control" />
                  <label htmlFor="defaultFormRegisterStudentorProfEx" className="grey-text">
                    description
                  </label>
                  <input onChange={this.descrHandler} type="text" id="defaultFormRegisterDescriptionEx" className="form-control" />
                  <label htmlFor="defaultFormRegisterStudentorProfEx" className="grey-text">
                    contact
                  </label>
                  <input onChange={this.contactHandler} type="number" id="defaultFormRegistercontactEx" className="form-control" />
                  <div className="text-center mt-4">
                    <MDBBtn onClick={this.submitForm} color="primary" type="submit">
                      Register
                    </MDBBtn>
                  </div>
                </form>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        );
    }
}