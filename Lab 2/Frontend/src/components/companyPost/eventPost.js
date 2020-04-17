import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { API_ENDPOINT } from '../controller/endpoint'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {postEvent} from '../../actions/applyActions'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

class EventPost extends Component{
    constructor(props){
        super(props);
        this.state = {
          event_name : "",
          company_name: "",
          event_descr: "",
          event_loc: "",
          isLogin: true,
          profile_pic: "",
          event_eligible: "", 
          event_time: new Date()
        }

        this.instance = axios.create({
          baseURL: API_ENDPOINT,
          timeout: 1000,
        });

        this.changeHandler = this.changeHandler.bind(this)
        this.submitForm = this.submitForm.bind(this)
        this.dateHandler = this.dateHandler.bind(this)
        
    }


    dateHandler = date => {
      this.setState({
        event_time: date
      });
    };

    changeHandler = (e) =>{
      e.preventDefault();
      this.setState({
        [e.target.name] : e.target.value
      })
    }

    componentDidMount(){
      const accessString = localStorage.getItem('JWT');
      if(accessString === null){
          this.setState({
              isLogin: false,
              message: ""
          })
          console.log("token is null!....Please Login Again......");
          this.history.push("/companyLogin");
      }else{

        const profileData = JSON.parse(localStorage.getItem('profileInfo'))

        const { name, profile_pic} = profileData

          this.setState({ 
            token: accessString,
            company_name: name,
            profile_pic: profile_pic
        })
      }
    }

    submitForm = (e) => {
        e.preventDefault();
        const eventInfo = Object.assign(this.state); 
        delete eventInfo.isLogin;
        console.log('eventtime - ', this.state.event_time)
        alert('Event posted!')
        this.props.postEvent(eventInfo, this.state.token)
    
    }

    render(){

      const logStat = this.state.isLogin;
      const {profile_pic} = this.state
      if(logStat){
        return(
          <div   style={{margin: "4% 15% 8% 26%", width:"50%"}}>
          <div className="image" style={{ height:"300px", paddingLeft: "25%", marginTop:"2%"}}>
              <img src={`${API_ENDPOINT}/${profile_pic}`} style={{width:"350px", height:"280px", objectFit:"cover"}} />
          </div>
            <div>
              <h3>Enter Event Description</h3>
            </div>
            <br/>
            <form className="ui form" style={{fontSize: "1.3em"}}>
              <div className="field">
                    <h5><label>Event Name</label></h5>
                     <input onChange={this.changeHandler} type="text" name="event_name" placeholder="Job Title"/>
                </div>
                <br/>
                <div className="field">
                    <h5><label>Event Type</label></h5>
                     <input onChange={this.changeHandler} type="text" name="event_eligible" placeholder="Job Type"/>
                </div>
                <br/>
                <div className="field">
                    <h5><label>Company Name</label></h5>
                     <input type="text"  value={this.state.company_name}/>
                </div>
                <br/>
                <div className="field">
                    <h5><label>Event Description</label></h5>
                    {/* <input onChange={this.changeHandler} type="text" name="job_descr" placeholder=" Job Description"/> */}
                    <form className="ui form">
                    <textarea style={{fontSize:"1.5em"}} name="event_descr" placeholder="Job Description" onChange = { this.changeHandler}></textarea>
                </form>
                </div>
                <br/>
              
                <div className="field" >
                    <h5><label>Event Location</label></h5>
                     <input onChange={this.changeHandler} type="text" name="event_loc" placeholder="Job Location"/>
                </div> 
                <br/>
                <div className="field" >
                    <h5><label>Event Time</label></h5>
                    <DatePicker selected={this.state.event_time} onChange={this.dateHandler}/>
                </div> 
                <br/>
                <button onClick= {this.submitForm} className=" large ui button" type="submit">Submit</button>
                <br/>
                <div>
                  <span style={{color: "green"}}> {this.state.message}</span>
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


EventPost.propTypes = {
  postEvent: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  error : state.Handshake_User_Infor.error,
  message: state.Handshake_User_Infor.message
})


export default connect(null, {postEvent})(EventPost)
