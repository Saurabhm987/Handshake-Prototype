import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { API_ENDPOINT } from '../controller/endpoint'

export default class EventPost extends Component{
    constructor(props){
        super(props);
        this.state = {
          event_name : "",
          company_name: "",
          event_descr: "",
          event_loc: "",
          event_time: "",
          isLogin: true,
          profile_pic: "",
          event_eligible: "", 
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

      if(accessString === null){
          this.setState({
              isLogin: false,
              message: ""
          })
          console.log("token is null!....Please Login Again......");
          this.history.push("/companyLogin");
      }

      console.log("cmpdToken: ", accessString);

      this.setState({
        token: accessString
    })

    this.instance.get("/profileCompany/companyInfo", { 
        headers: {
            Authorization: `JWT ${accessString}`
        }
    } ).then(response => {
            if(response.status === 200){
                if(response.data === "jwt expired"){
                  this.props.history.push("/companyLogin");
                    alert("session expired! ");
                }
                const data = response.data;

                this.setState({
                    company_name : data.company_name,
                    profile_pic: data.profile_pic,
                })

                console.log("company_InfoCard_RESPONSE_DATA", data);

            }else{
                console.log("ERROR");
            }
        })
    }

    submitForm = (e) => {
        e.preventDefault();
        const eventInfo = Object.assign(this.state); 
        delete eventInfo.isLogin;
        
        console.log("postJob_eventInfo: ", eventInfo);

        // console.log("eventPosttoken: ", this.state.token);

        const headers = {
          Authorization: `JWT ${this.state.token}`
      }

        axios.defaults.withCredentials = true;
         this.instance.post('/postEvent',{
          params: {
            data: eventInfo
          }},
          {
            headers: headers
          })
           .then(response => {
                console.log("responseJobPost: ", response );
                if(response.status === 200){

                  console.log("response_message: ", response.data.message);

                  if(response.data.message ==="jwt expired"){
                    this.setState({
                      isLogin: false
                    })
                    this.props.history.push("/login");
                    alert("Session Expired!");
                  }

                  this.setState({
                   message: "Event Posted!",
                   isLogin: true
                  })
                    alert("successfully posted job!!!!!!!!!!");
                }else{
                  console.log("bad response!!!!!!!");
                }
            })
    }

    render(){

      const logStat = this.state.isLogin;
      
      if(logStat){
        return(
          <div   style={{margin: "4% 15% 8% 26%", width:"50%"}}>
          <div className="image" style={{ height:"300px", paddingLeft: "25%", marginTop:"2%"}}>
              <img src={this.state.profile_pic} style={{width:"350px", height:"280px", objectFit:"cover"}} />
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
                     <input onChange={this.changeHandler} type="text" name="event_time" placeholder="Post Date"/>
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
