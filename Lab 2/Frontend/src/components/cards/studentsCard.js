import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {API_ENDPOINT} from '../controller/endpoint';


export default class StudentsCard extends Component {
  constructor(props){
    super(props);

    this.state ={
      isLogin: true,
      studentData: [],
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

  this.instance.get("/getStudents", { 
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
                  studentData:response.data
              })
              console.log("Application_Data: ", this.state.studentData);
          }else{
              console.log("ERROR");
          }
      })
}


render(){
const renderdata = this.state.studentData;
  if(renderdata){
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
                                <img src={item.profile_pic} style={{width:"200px", height: "130px" }}/>
                        {/* </div> */}
                        <div class="content" style={{padding: "10px 5px 5px 60px"}}>
                        <Link to ={{
                                              pathname: "/studentProfile",
                                              student_email: {
                                                email: `${item.student_email}`
                                              }
                          }}>
                                <div className="header" ><h4><b>{item.name}</b></h4></div>
                        </Link>
                        <div className="extra"><b>{item.college}</b></div>
                        <div className="extra"><b>{item.degree} in {item.major}</b></div>
                        <div className="extra"><b>GPA: {item.gpa}</b></div>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
  }else{
      return(
        <div className="container">
            <div className="row" style={{marginTop:"2%"}} >
                <div className="header">
                            <h2>Students</h2>
                  </div>
                  <div className="ui items">
                      No Data!
                  </div>
              </div>
          </div>
      )
  }
}
}
