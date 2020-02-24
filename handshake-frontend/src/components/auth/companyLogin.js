import React, {Component} from 'react';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';

export default class CompanyLogin extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            email : "",
            password: "",
            authFlag: false
        }

        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.emailHandler = this.emailHandler.bind(this);
        this.submit = this.submit.bind(this);

    }

    passwordChangeHandler = (e) =>{
        this.setState({
            password : e.target.value
        })
    }

    emailHandler = (e) =>{
        this.setState({
            email : e.target.value
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

        await axios.post('http://localhost:3001/companyLogin', userInfo)
            .then(response => {

                    console.log("response: ", response);

                    if(response.status === 200){

                        this.setState({
                          authFlag: true,
                      })

                      this.props.history.push("/profaccess");
                    
                    } else{
                        console.log("pending access control !!!!!!!1");
                    }
            })
    }

    render(){
        return(
            <MDBContainer>
            <MDBRow>

            <MDBCol md="6">
              <form>
              <br />
                <p className="h4 text-center mb-4">Sign in</p>
                <br />
                <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                  Email address
                </label>
                <div>
                <input onChange={this.emailHandler} type="email" id="defaultFormLoginEmailEx" className="form-control" />
                </div>
                <br />
                <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                  Your password
                </label>
                <div>
                  <input onChange={this.passwordChangeHandler} type="password" id="defaultFormLoginPasswordEx" className="form-control" />
                  </div>
                <div className="text-center mt-4">
                  <MDBBtn onClick={this.submit} color="primary" type="submit">Login</MDBBtn>
                </div>
              </form>
             </MDBCol>
           </MDBRow>
         </MDBContainer>
        )
    }
}