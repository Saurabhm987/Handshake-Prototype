import React, { Component } from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {API_ENDPOINT} from '../controller/endpoint';

export default class CompanyPostedEventCard extends Component {
  constructor(props){
    super(props);

    this.state ={
      applicationData: [],
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

  this.instance.get("/getJobPosted/postedevent", { 
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
        <div className="container" >
            <div className="row" style={{marginTop:"2%"}}>
                <div className="header">
                        <h2>Posted Events</h2>
                </div>
                <div class="ui items" style={{width:"100%"}}>
                        { renderdata.map( (item, index) =>
                        <div class="item" id="cardHover" data-div_id={index} onClick={this.cardSelect} style={{background: "white", padding: "10px 10px 10px 10px", marginTop:"15px", boxShadow: "0 2px 6px 0 rgba(0, 0, 0, 0.1), 0 2px 10px 0 rgba(0, 0, 0, 0.10)"}}>
                                    <img src={item.profile_pic} style={{width:"200px", height: "110px" }}/>
                            <div class="content" style={{padding: "10px 5px 5px 50px"}}>
                                    <div className="header" ><h4><b>{item.event_name}</b></h4></div>
                                    <div className="extra"><h4><b>{item.event_loc}</b></h4></div>
                                    <div className="extra"><b>Eligibility: </b>{item.event_eligible}</div>
                                    <div className="extra"><b>Time: {item.event_time}</b></div>
                            </div>
                            <div class="right floated content" style={{padding: "35px"}}>
                            <div class="ui large button"><Link to=  {{  
                                        pathname: '/details',
                                        event_id: {
                                            id: `${item.event_id}`
                                        }
                                    }}  >Details</Link>
                            </div>
                         </div>
                        </div>
                        )}
                    </div>
            </div>
        </div>
    )
}

}
