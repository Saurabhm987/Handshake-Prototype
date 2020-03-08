import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class CompanyPostedJob extends Component{
    constructor(props){
        super(props);

        this.state = {
            isLogin: true,
            jobData: []
        }
    }

    componentDidUpdate(){}

    componentDidMount(){
        const accessString = localStorage.getItem('JWT');

        if(accessString === null){
            this.setState({
                isLogin: false
            })
            console.log("token is null!");
        }
  
        console.log("jobboard token: ", accessString);

        axios.get("http://localhost:3001/getJobPosted", { 
            headers: {
                Authorization: `JWT ${accessString}`
            }
        } ).then(response => {
                if(response.status === 200){
                  if(response.data === "jwt expired"){
                    localStorage.removeItem('JWT');
                    this.setState({
                      isLogin: false
                    })
                    this.props.history.push("/companyLogin");
                  }
                    this.setState({
                        jobData:response.data
                    })
                    console.log("jobBoard_jobData: ", this.state.jobData);
                }else{
                    console.log("ERROR");
                }
            })
    }

    render(){

        const display =  this.state.jobData;

        return(

            <div className="container" style={{marginRight:"20%", marginLeft: "20%"}}>
            <div style={{background: "#F8F8FF", padding: "10px"}}>
                <h3>Posted Job</h3>
            </div>
            <br/>
             { display.map( (item) =>
           
            <div class="ui fluid" style={{background: "#F8F8FF", padding: "20px", margin: "2%"}}>
            <div className="row">
            <div className="col-md-9">
                <div class="image header">
                    <div class="line"><h3>{item.job_title}</h3></div>
                    <div class="line">{item.job_loc}</div>
                </div>
                <div class="paragraph">
                    <div class="line">{item.job_salary}</div>
                    <div class="line">{item.job_post_date}</div>
                    <div class="line">{item.job_type}</div>
                </div>
            </div>
            <div className="col-md-3" style={{padding: "10px"}}>
                <Link to="/detailsApplied" class="large ui button" style={{float: "right"}}>
                        Details 
                </Link>
            </div>
                </div>
            </div>
            ) }
            </div>
        )
    }
}


