import React, {Component} from 'react';
import axios from 'axios';

export default class Jobs extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLogin: true,
            jobs: {}
        }
    }
    
    componentDidUpdate(){
    }


    componentDidMount(){
 
        const accessString = localStorage.getItem('JWT');
  
        if(accessString === null){
            this.setState({
                isLogin: false
            })
            console.log("token is null!");
        }

        const id = this.state.id;

        console.log("jobItem token: ", accessString);

        console.log("jobItem rec props: ", this.props.selJob);
  
        axios.get("http://localhost:3001/getJobItem", {
            params: {
                type: "getJob",
                job_id: id
            }
        },{ 
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
                    this.props.history.push("/login");
                  }
                    this.setState({
                        jobs:response.data
                    })
                    console.log("JobItem: ", this.state.jobs);
                }else{
                    console.log("ERROR");
                }
            })
    }

    render(){
        
        // console.log("normalPropsdisp: ", this.state.data);
        // console.log("jobListchild: ", this.state.jobList);
        // console.log("selectedJob: ", selectedId);
        // console.log("jobList: ", this.state.data);
        // console.log("disp: ", this.state.disp)
        // console.log("id: ", this.state.id);
        // console.log("objData: ", disp.job_title);

        return(
            <div>
            {/* { this.state.disp.map( item => */}
                {/* <div class="ui fluid placeholder" id="jobItemId" style={{background: "#F8F8FF", margin: "auto", padding: "15px" }}> */}
                <div class="ui fluid placeholder" id="jobItemId" style={{margin: "auto", padding: "15px" }}>
                  <div class="image header">
                    <div class="line"><h3>{this.state.jobs.job_title}</h3></div>
                    <div class="line"></div>
                  </div>
                  <div class="paragraph">
                    <div class="line"> </div>
                    <div class="line"></div>
                    <div class="line"> </div>
                  </div>
                </div>
                {/* )} */}
            </div>  
        )
    }
}
