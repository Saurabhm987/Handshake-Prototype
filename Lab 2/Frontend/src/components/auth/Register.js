import React, {Component} from 'react';
import {connect} from 'react-redux';
import {registerStudent} from '../../actions/registerAction';
import PropTypes from 'prop-types';

class Register extends Component{
    constructor(props){
        super(props);

        this.state = {
            name : "",
            email: "",
            password: "",
            uniName: "",
            access: "student",
        }

        this.changeHandler = this.changeHandler.bind(this);
        this.submitForm = this.submitForm.bind(this);        
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.isRegistered){
            if(nextProps.isRegistered === true){
                this.props.history.push('login');
            }
        }
    }

    submitForm = async (e) => {
        e.preventDefault();
        const regObj = Object.assign(this.state);
        this.props.registerStudent(regObj);
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
                     <input onChange={this.changeHandler} type="text" name="uniName" placeholder="University Name"/>
                </div>
                <br/>
                <div className="field">
                    <h5><label>Student Name</label></h5>
                    <input onChange={this.changeHandler} type="text" name="name" placeholder=" Student Name"/>
                </div>
                <br/>
                <div className="field">
                    <h5><label>Email Adress</label></h5>
                    <label>Please use your school email</label>
                     <input onChange={this.changeHandler} type="email" name="email" placeholder="Email"/>
                </div>
                <br/>
                <div className="field" >
                    <h5><label>Password</label></h5>
                     <input onChange={this.changeHandler} type="password" name="password" placeholder="Email"/>
                </div> 
                <br/>
                <button onClick= {this.submitForm} className=" large ui button" type="submit">Submit</button>
              </form>
            </div>
        );
    }
}

Register.propTypes = {
    registerStudent: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isRegistered: state.Handshake_User_Info.isRegistered
})

export default connect(mapStateToProps, {registerStudent})(Register);