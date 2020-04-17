import React, { Component } from 'react';
import axios from 'axios';
import {API_ENDPOINT} from '../controller/endpoint';

export default class CompanyPostedJobCard extends Component {
  constructor(props){
    super(props);
    this.state ={
      applicationData: [],
      adminView: true
    }
    this.instance = axios.create({
      baseURL: API_ENDPOINT,
      timeout: 1000,
    });
}

componentDidMount(){

    const accessString = localStorage.getItem('JWT');
 
    if(accessString === null){
      this.setState({
          isLogin: false
      })
  }

  if( this.props.email === undefined){
    this.setState({
      adminView: true
    })
  }else{
    this.setState({
      adminView: false
    });
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
            }else{
              this.setState({
                  applicationData:response.data
              })
              console.log("Application_Data: ", this.state.applicationData);
            }
          }else{
              console.log("ERROR");
          }
      })
}


render(){

const renderdata = this.state.applicationData;
if(renderdata && renderdata.length > 0){

  console.log('admin View -----------------', this.props.adminView)

  return(
    (this.state.adminView)
    ?<div className="container">
        <div className="row" style={{marginTop:"2%"}} >
        <div>
          <h1>Posted Job</h1>
        </div>
          <div className="ui items" style={{width:"100%"}}>
                  { renderdata.map( (item, index) =>
                  <div className="item" id="cardHover" data-div_id={index} onClick={this.cardSelect} style={{background: "white", padding: "5px", marginTop:"15px", boxShadow: "0 2px 6px 0 rgba(0, 0, 0, 0.1), 0 2px 10px 0 rgba(0, 0, 0, 0.10)"}}>
                      <img src={`${API_ENDPOINT}/${item.profile_pic}`} style={{width:"200px", height: "110px" }}/>
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
      : null
  )
}else{
  return (
    (this.props.adminView)
    ?<div className="container" style={{marginTop: "20px"}}>
              <h2>No Job Posted!</h2>
    </div>
    : null
  )
}
   
}

}
