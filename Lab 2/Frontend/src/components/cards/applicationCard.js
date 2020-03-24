import React, { Component } from 'react';
import axios from 'axios';
import {API_ENDPOINT} from '../controller/endpoint';

export default class Applications extends Component {
  constructor(props){
    super(props);

    this.state ={
      isLogin: true,
      applicationData: [],
      img: ""
    }

    this.instance = axios.create({
        baseURL: API_ENDPOINT,
        timeout: 1000,
      });
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

  this.instance.get("/getJobBoard/applications",{ 
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
                  applicationData:response.data
              })
              console.log("Application_Data: ", this.state.applicationData);
          }else{
              console.log("ERROR");
          }
      })
}


render(){

const renderdata = this.state.applicationData;

    return(
        <div className="container" style={{ padding:"20px"}}>
        <div className="row">
        <div className="col-md-1"></div>
            <div className="col-md-10"  style={{padding:"20px"}}>
                    <h3>Applied Job</h3>
            </div>
        <div className="col-md-1"></div>
        </div>
        <div className="row" style={{padding:"20px"}} >

            <div className="col-md-1"></div>
            <div className="col-md-10">
            <div className="ui items">
                    { renderdata.map( (item, index) =>
                    <div class="item" id="cardHover" data-div_id={index} onClick={this.cardSelect} style={{background: "white", padding: "10px", marginTop:"15px", boxShadow: "0 0 0 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.10)"}}>
                        <img src={item.profile_pic} style={{width:"200px", height:"110px"}}/>
                        <div class="content" style={{padding: "10px 5px 5px 30px"}}>
                                <div className="header" id="cardHover" ><h4><b>{item.company_name}</b></h4></div>
                                <div className="extra" ><h4><b>{item.job_title}</b></h4></div>
                                <div class="extra">
                                <i>Status:</i> {item.status}
                                </div>
                        </div>
                    </div>
                    )}
                </div>
                </div>
                <div className="col-md-1"></div>
            </div>
        </div>
    )
}

}
