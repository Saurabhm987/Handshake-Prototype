import React, { Component } from "react";
import axios from 'axios';
import {API_ENDPOINT} from '../controller/endpoint';


export default class GetJobItem extends Component {
constructor(props){
    super(props);

    this.state = {
        isLogin: true,
        item: ""
    }

    this.instance = axios.create({
        baseURL: API_ENDPOINT,
        timeout: 1000,
      });

}

componentDidUpdate(){
}

componentDidMount(){
    console.log("Job_id_props",this.props.job_id);

    const accessString = localStorage.getItem('JWT');

    if(accessString === null){
        this.setState({
            isLogin: false
        })
        console.log("token is null!");
    }
    console.log("jobboard token: ", accessString);

    this.instance.get("/getJobBoard",{
        params:{
            type: "getJob",
            job_id: this.props.cardSelected
        }
    }, { 
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
                    item:response.data
                })
                console.log("jobBoard_jobData: ", this.state.jobData);
            }else{
                console.log("ERROR");
            }
        })
}

render(){

    let item = this.state.item;

    return(
        <div  className="item">
            <div className="ui small image">
                 <img src="/images/wireframe/image.png"/>
            </div>
            <div className="content">
                  <div className="header">{item.job_title}</div>
                    <div className="meta">
                        <span className="price">{item.company_name} </span>
                        <span className="stay"> {item.job_loc}</span>
                    </div>
                  <div className="description">
                        <p>{item.job_descr}</p>
                        <p>{item.job_salary}</p>
                        <p>{item.job_post_date}</p>
                        <p>{item.job_type}</p>
                </div>
            </div>
        </div> 
    )
}
}