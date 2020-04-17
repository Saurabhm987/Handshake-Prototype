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

  this.instance.get("/getJobAppliedStudents", {
      params: {
          requestInfo:"event",
      },
      headers: {
        Authorization: `JWT ${accessString}`
    }
  } ).then(response => {
          if(response.status === 200){
              let data = response.data;
              console.log("jobappdata: ", data);
                this.setState({
                    eventData:data
                })
                console.log("Application_Data: ", this.state.eventData);
            }else{
              if(response.data === "jwt expired"){
                localStorage.removeItem('JWT');
                this.setState({
                  isLogin: false
                })
                this.props.history.push("/companyLogin");
              }else{
                 console.log("error new", response);
              }
            }
      })
      .catch( err =>{
        console.log("error: ", err);
      })
}


render(){

    let renderdata = {};
    renderdata = this.state.eventData;

    if(renderdata){
    return(
      <div className="container">
            <div className="row" style={{marginTop:"2%"}} >
            <div className="header">
                        <h2>Students</h2>
               </div>
            <div className="ui items" style={{width:"100%"}}>
                    { renderdata.map( (item, index) =>
                    <div className="item" id="cardHover" data-div_id={index} onClick={this.cardSelect} style={{background: "white", padding: "10px", margin:"15px", boxShadow: "0 0 0 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.10)"}}>
                        {/* <div className="image">￼ */}
                                <img src={`${API_ENDPOINT}/${item.profile_pic}`}  alt="" style={{width:"200px", height: "130px" }}/>
                        {/* </div> */}
                        <div className="content" style={{padding: "10px 5px 5px 60px", color:"black"}}>
                        <Link to={`/studentProfile?email=${item.email}`}>
                                  <div className="header" ><h4><b>{item.name}</b></h4></div>
                          </Link>
                        <div className="extra"><h4><b>Event Applied : {item.title}</b></h4></div>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
  }else{
    return(
        <div className="container" style={{marginTop: "20px"}}>
             <h2> No student registered!</h2>
        </div>
    )
  }
}
}
