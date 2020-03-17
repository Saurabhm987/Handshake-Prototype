import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { API_ENDPOINT } from '../controller/endpoint';

export default class JobPost extends Component{
    constructor(props){
        super(props);

        this.state = {
          job_title : "",
          company_name: "",
          job_descr: "",
          job_salary: "",
          job_loc: "",
          job_post_date: "",
          isLogin: true,
          message: "", 
          profile_pic: ""
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

      // const base64Url = accessString.split('.')[1];
      // const base64 = base64Url.replace('-', '+').replace('_', '/');
      // const data = JSON.parse(window.atob(base64));
      // console.log("parsed_token_data: ", data);

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
                    profile_pic: data.profile_pic
                })

                console.log("company_InfoCard_RESPONSE_DATA", data);

            }else{
                console.log("ERROR");
            }
        })
    }

    submitForm = (e) => {
        e.preventDefault();
        const jobInfo = Object.assign(this.state); 
        delete jobInfo.isLogin;
        
        console.log("postJob_jobInfo: ", jobInfo);

        const headers = {
          Authorization: `JWT ${this.state.token}`
      }

        axios.defaults.withCredentials = true;
         this.instance.post('/postJob', {
          params: {
            data: jobInfo
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
                    // this.props.history.push("/companyLogin");
                  }

                  this.setState({
                   message: "Job Posted!",
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
                     <input type="text"  value={this.state.company_name}/>
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
                <div className="field" >
                    <h5><label>Post Date</label></h5>
                     <input onChange={this.changeHandler} type="text" name="job_post_date" placeholder="Post Date"/>
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
