import React, { Component } from 'react';
import axios from 'axios';
import {API_ENDPOINT} from '../controller/endpoint';


export default class CompanyPostedJobCard extends Component {
  constructor(props){
    super(props);
    this.state ={
      applicationData: [],
      profile_pic:""
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
  
    if(accessString !== null){
      const base64Url = accessString.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      const data = JSON.parse(window.atob(base64));
      console.log("parsed_token_data: ", data);
      let profile_pic = data.profile_pic;
      
      this.setState({
        profile_pic: profile_pic
      })
    }

  this.instance.get("/getJobPosted/postedjob", { 
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
if(renderdata){
  return(
    <div className="container">
        <div className="row" style={{marginTop:"2%"}} >
          <div className="ui items" style={{width:"100%"}}>
                  { renderdata.map( (item, index) =>
                  <div className="item" id="cardHover" data-div_id={index} onClick={this.cardSelect} style={{background: "white", padding: "5px", marginTop:"15px", boxShadow: "0 2px 6px 0 rgba(0, 0, 0, 0.1), 0 2px 10px 0 rgba(0, 0, 0, 0.10)"}}>
                      {/* <div className="image">￼ */}
                              <img src={this.state.profile_pic} style={{width:"200px", height: "110px" }}/>
                      {/* </div> */}
                      <div className="content" style={{padding: "10px 5px 5px 30px"}}>
                      <div className="header" ><h4><b>{item.name}</b></h4></div>
                      <div className="extra"><h4><b>{item.title}</b></h4></div>
                      <div className="extra"><h4><b>{item.postedDate}</b></h4></div>
                      </div>
                  </div>
                  )}
            </div>
         </div>
      </div>
  )
}else{
  return (
    <div className="container">
        <div className="row" style={{marginTop:"2%"}} >
          <div className="ui items" style={{width:"100%"}}>
          <div className="item">
                <h3>No Job Posted!</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
   
}

}
