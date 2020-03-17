import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {API_ENDPOINT} from '../controller/endpoint';


export default class EventAppliedStudents extends Component {
  constructor(props){
    super(props);

    this.state ={
      isLogin: true,
      eventData: [],
      student_email: "",
      job_id:"",
      status: ""
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

    const base64Url = accessString.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const data = JSON.parse(window.atob(base64));
    console.log("parsed_token_data: ", data);
    let company_name = data.name;


  this.instance.get("/getJobAppliedStudents", {
      params: {
          requestInfo:"event",
          company_name: company_name
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

            let data = response.data;
            console.log("jobappdata: ", data);
              this.setState({
                  eventData:data
              })
              console.log("Application_Data: ", this.state.eventData);
          }else{
              console.log("ERROR");
          }
      })
}


render(){

    let renderdata = {};
    renderdata = this.state.eventData;

    return(
      <div className="container">
            <div className="row" style={{marginTop:"2%"}} >
            <div className="header">
                        <h2>Students</h2>
               </div>
            <div class="ui items" style={{width:"100%"}}>
                    { renderdata.map( (item, index) =>
                    <div class="item" id="cardHover" data-div_id={index} onClick={this.cardSelect} style={{background: "white", padding: "10px", margin:"15px", boxShadow: "0 0 0 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.10)"}}>
                        {/* <div className="image">￼ */}
                                <img src="" style={{width:"200px", height: "130px" }}/>
                        {/* </div> */}
                        <div class="content" style={{padding: "10px 5px 5px 60px", color:"black"}}>
                        <Link to ={{
                                              pathname: "/studentProfile",
                                              student_email: {
                                                email: `${item.student_email}`
                                              }
                          }}>
                                <div className="header" ><h4><b>{item.student_email}</b></h4></div>
                        </Link>
                        <div className="extra"><h4><b>{item.event_name}</b></h4></div>
                        <div className="extra">
                                Status: {item.event_status}
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
