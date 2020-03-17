import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {API_ENDPOINT} from '../controller/endpoint';


export default class JobAppliedStudents extends Component {
  constructor(props){
    super(props);

    this.state ={
      isLogin: true,
      studentData: [],
      student_email: "",
      job_id:"",
      status: ""
    }

    this.instance = axios.create({
        baseURL: API_ENDPOINT,
        timeout: 1000,
      });

    this.changeStatus = this.changeStatus.bind(this);
    this.statusHandler = this.statusHandler.bind(this);
}

changeStatus =() =>{

    let statusBody = new Object();

    statusBody.student_email = this.state.student_email;
    statusBody.job_id = this.state.job_id;
    statusBody.status = this.state.status;

    console.log("statusBody: ", statusBody);
    
    this.instance.post("/changeStatus", statusBody )
        .then(res=>{
            if(res.status === 200){
                console.log("Status changed!");
                alert("Status changed");
            }else{
                console.log("error!");
                alert("Can't change status!");
            }
        })
}


statusHandler = (e) => {
    e.preventDefault();

    this.setState({
        student_email: e.currentTarget.dataset.student_email,
        job_id: e.currentTarget.dataset.job_id,
        status : e.currentTarget.dataset.status
    }, ()=> {

        this.changeStatus();

    })
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
          company_name: company_name
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

            let data = response.data;
            console.log("jobappdata: ", data);
              this.setState({
                  studentData:data
              })
              console.log("Application_Data: ", this.state.studentData);
          }else{
              console.log("ERROR");
          }
      })
}


render(){

    let renderdata = {};

    renderdata = this.state.studentData;

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
                        <div className="extra"><h4><b>{item.job_title}</b></h4></div>
                        <div className="extra">
                                Status: {item.job_status}
                        </div>
                        <div className="extra">
                            <div  className="ui green button" data-status= "Reviewed" data-job_id={item.job_id} data-student_email={item.student_email} onClick={this.statusHandler}> Application Reviewed</div>
                            <div  className="ui yellow button" data-status ="Screening" data-job_id={item.job_id} data-student_email={item.student_email} onClick={this.statusHandler}> Initial Screening </div>                            
                            <div  className="ui red button" data-status="Reject"  data-job_id={item.job_id} data-student_email={item.student_email} onClick={this.statusHandler}>  Reject </div>
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
