import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { API_ENDPOINT } from '../controller/endpoint';
import {parseToken} from '../auth/parseToken';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import {postJob} from '../../actions/applyActions'

class JobPost extends Component{
    constructor(props){
        super(props);

        this.state = {
          job_title : "",
          company_name: "",
          job_descr: "",
          job_salary: "",
          job_loc: "",
          isLogin: true,
          message: "", 
          profile_pic: "",
          job_type: ""
        }

        this.instance = axios.create({
          baseURL: API_ENDPOINT,
          timeout: 1000,
        });

        this.changeHandler = this.changeHandler.bind(this);
        this.submitForm = this.submitForm.bind(this);
        
    }

    changeHandler = (e) =>{
      e.preventDefault();
      this.setState({
        [e.target.name] : e.target.value
      })
    }

    componentDidMount(){
      const accessString = localStorage.getItem('JWT');
      const profileData = JSON.parse(localStorage.getItem('profileInfo'))

      if(accessString === null){
          this.setState({
              isLogin: false,
              message: "",
          })
          console.log("token is null!....Please Login Again......");
          this.history.push("/companyLogin");
      }

      this.setState({
          token: accessString,
          company_name: profileData.name,
          profile_pic: profileData.profile_pic
      })
    }

    submitForm = (e) => {
        e.preventDefault();
        const jobInfo = Object.assign(this.state); 
        const {token} = this.state

      this.props.postJob(jobInfo, token)

    }

    render(){

      const logStat = this.state.isLogin;
      console.log('logStat - ', logStat)
      const profileData = JSON.parse(localStorage.getItem('profileInfo'))
      const {profile_pic, name} = profileData

      if(logStat){
        return(
          <div   style={{margin: "4% 15% 8% 26%", width:"50%"}}>
          <div className="image" style={{ height:"300px", paddingLeft: "25%", marginTop:"2%"}}>
              <img src={`${API_ENDPOINT}/${profile_pic}`} alt="" style={{width:"350px", height:"280px", objectFit:"cover"}} />
          </div>
            <div>
              <h3>Enter Job Description</h3>
            </div>
            <br/>
            <form className="ui form" style={{fontSize: "1.3em"}}>
              <div className="field">
                    <h5><label>Job Title</label></h5>
                     <input onChange={this.changeHandler} type="text" name="job_title" placeholder="Job Title"/>
                </div>
                <br/>
                <div className="field">
                    <h5><label>Job Type</label></h5>
                     <input onChange={this.changeHandler} type="text" name="job_type" placeholder="Job Type"/>
                </div>
                <br/>
                <div className="field">
                    <h5><label>Company Name</label></h5>
                     <input type="text"  value={name}/>
                </div>
                <br/>
                <div className="field">
                    <h5><label>Job Description</label></h5>
                    {/* <input onChange={this.changeHandler} type="text" name="job_descr" placeholder=" Job Description"/> */}
                    <form className="ui form">
                    <textarea style={{fontSize:"1.5em"}} name="job_descr" placeholder="Job Description" rows="3" onChange = { this.changeHandler}></textarea>
                </form>
                </div>
                <br/>
                <div className="field">
                    <h5><label>Salary </label></h5>
                     <input onChange={this.changeHandler} type="number" name="job_salary" placeholder="Salary"/>
                </div>
                <br/>
                <div className="field" >
                    <h5><label>Job Location</label></h5>
                     <input onChange={this.changeHandler} type="text" name="job_loc" placeholder="Job Location"/>
                </div> 
                <br/>
                <button onClick= {this.submitForm} className=" large ui button" type="submit">Submit</button>
                <br/>
                <div>
                  <span style={{color: "green"}}> {this.props.error}</span>
                  <span style={{color: "green"}}> {this.props.actionMessage}</span>
                </div>
              </form>
            </div>
        );    
      }else if(!logStat){
        return(
          <Redirect to="/companyLogin"></Redirect>
        )
      }
    }
}

JobPost.propTypes  = {
  companyDetails : PropTypes.object.isRequired,
  postJob : PropTypes.func.isRequired,
  error : PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  companyDetails: state.Handshake_User_Info.companyDetails,
  error : state.Handshake_User_Info.error,
  message: state.Handshake_User_Info.message,
  actionMessage: state.Handshake_User_Info.actionMessage
})

export default connect(mapStateToProps, {postJob})(JobPost)