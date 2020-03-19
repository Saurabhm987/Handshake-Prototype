import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {registerCompany} from '../../actions/registerAction'

class JobPost extends Component{
    constructor(props){
        super(props);

        this.state = {
            company_name : "",
            email: "",
            password: "",
            company_loc: "",
            company_descr: "",
            company_contact: "",
            company_profile_photo: "",
            access: "company"
        }
        
        this.changeHandler = this.changeHandler.bind(this);
        this.submitForm = this.submitForm.bind(this);
        
    }

    changeHandler = (e) =>{
      this.setState({
        [e.target.name] : e.target.value
      })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.isRegistered){
          if(nextProps.isRegistered === true){
              this.props.history.push("companyLogin");
          }
        }
    }

    submitForm = async (e) => {
        e.preventDefault();
        
          const regObj = Object.assign(this.state);
          this.props.registerCompany(regObj);
  
    }

    render(){
        return(
          <div   style={{margin: "8% 15% 8% 26%", width:"50%"}}>
            <div>
              <h3>Employer Registrations</h3>
            </div>
            <br/>
            <form className="ui form">
              <div className="field">
                    <h5><label>Company Name</label></h5>
                     <input onChange={this.changeHandler} type="text" name="company_name" placeholder="Company Name"/>
                </div>
                <br/>
                <div className="field">
                    <h5><label>Company Email</label></h5>
                     <input onChange={this.changeHandler} type="text" name="email" placeholder="Company Email"/>
                </div>
                <br/>
                <div className="field">
                    <h5><label>Password</label></h5>
                    <input onChange={this.changeHandler} type="password" name="password" placeholder="Password"/>
                </div>
                <br/>
                <div className="field">
                    <h5><label>Location </label></h5>
                     <input onChange={this.changeHandler} type="text" name="company_loc" placeholder="Location"/>
                </div>
                <br/>
                <div className="field" >
                    <h5><label>Company Description</label></h5>
                     <input onChange={this.changeHandler} type="text" name="company_descr" placeholder="Company Description"/>
                </div> 
                <br/>
                <div className="field" >
                    <h5><label>Contact Number</label></h5>
                     <input onChange={this.changeHandler} type="text" name="company_contact" placeholder="Contact Number"/>
                </div> 
                <br/>
                <button onClick= {this.submitForm} className=" large ui button" type="submit">Register</button>
              </form>
            </div>
        );
    }
}

JobPost.propTypes = {
  registerCompany: PropTypes.func.isRequired,
  isRegistered: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  isRegistered: state.Handshake_User_Info.isRegistered
})

export default connect(mapStateToProps, {registerCompany})(JobPost);
