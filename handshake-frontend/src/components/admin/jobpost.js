import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

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
          message: ""
        }

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
      }

      this.setState({
          token: accessString
      })

      console.log("summary_card_compdidmnt_accessString: ", accessString);

    }

    submitForm = (e) => {
        e.preventDefault();
        // const { name, uniName, email, password, access} = this.state;

        const jobInfo = Object.assign(this.state); 
        delete jobInfo.isLogin;
        
        console.log("postJob_jobInfo: ", jobInfo);

        const headers = {
          Authorization: `JWT ${this.state.token}`
      }

        axios.defaults.withCredentials = true;
         axios.post('http://localhost:3001/postJob', {
          params: {
            data: jobInfo
          }},
          {
            headers: headers
          })
            .then(response => {
                console.log("responseJobPost: ", response );
                if(response.status === 200){
                  if(response.data.message ==="jwt expired"){
                    this.setState({
                      isLogin: false
                    })
                    this.props.history.push("/companyLogin");
                  }

                  this.setState({
                   message: "Job Posted!"
                  })
                    console.log("successfully posted job!!!!!!!!!!");
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
                     <input onChange={this.changeHandler} type="text" name="company_name" placeholder="Company Name"/>
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
                     <input onChange={this.changeHandler} type="number" name="job_post_date" placeholder="Post Date"/>
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
