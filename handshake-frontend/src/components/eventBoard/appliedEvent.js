import React, { Component } from 'react';
import axios from 'axios';
import {API_ENDPOINT} from '../controller/endpoint';


export default class AppliedEvent extends Component {
  constructor(props){
    super(props);

    this.state ={
      isLogin: true,
      eventData: [],
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

  this.instance.get("/getEventBoard/appliedevents",{ 
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
                  eventData:response.data
              })
              console.log("Application_Data: ", this.state.eventData);
          }else{
              console.log("ERROR");
          }
      })
}

render(){

const renderdata = this.state.eventData;

    return(
        <div className="container" style={{ padding:"20px"}}>
        <div className="row">
        <div className="col-md-1"></div>
            <div className="col-md-10"  style={{padding:"20px"}}>
                    <h3>Applied Event</h3>
            </div>
        <div className="col-md-1"></div>
        </div>
        <div className="row" >

            <div className="col-md-1"></div>
            <div className="col-md-10">
            <div class="ui items">
                    { renderdata.map( (item, index) =>
                    <div class="item" data-div_id={index} onClick={this.cardSelect} style={{background: "white", padding: "15px 10px 0px 15px ", marginTop:"15px", boxShadow: "0 2px 6px 0 rgba(0, 0, 0, 0.1), 0 2px 10px 0 rgba(0, 0, 0, 0.10)"}}>
                        <img src={item.profile_pic} style={{width:"200px", height:"110px"}}/>
                        <div class="content" style={{padding:"5px 5px 5px 100px"}}>
                                <div className="header" ><h4><b>{item.event_name}</b></h4></div>
                                <div className="extra" ><h4><b>{item.company_name}</b></h4></div>
                                <div className="extra"><h4><b>{item.event_loc}</b></h4></div>
                                <div class="extra" >
                                        <i>Status:</i> {item.event_status}
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
