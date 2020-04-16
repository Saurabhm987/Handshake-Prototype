import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {API_ENDPOINT} from '../controller/endpoint';
import {parseToken} from '../auth/parseToken'
import { connect } from 'react-redux';
import {changeStatus} from '../../actions/updateAction'
import {getJobAppliedStudents} from '../../actions/fetchAction'
import PropTypes from 'prop-types'

class JobAppliedStudents extends Component {
  constructor(props){
    super(props);

    this.state ={
      isLogin: true,
      studentData: [],
      email: "",
      _id:"",
      status: "",
      token: ""
    }

    this.instance = axios.create({
        baseURL: API_ENDPOINT,
      });

    this.changeStatus = this.changeStatus.bind(this);
    this.statusHandler = this.statusHandler.bind(this);
}

changeStatus = () =>{

    let statusBody = new Object();

    statusBody.email = this.state.email;
    statusBody._id = this.state._id;
    statusBody.status = this.state.status;
    console.log("statusBody: ", statusBody);

    this.props.changeStatus(statusBody)
    this.props.getJobAppliedStudents(this.state.token)

}


statusHandler = (e) => {
    e.preventDefault();

    this.setState({
        email: e.currentTarget.dataset.email,
        _id: e.currentTarget.dataset._id,
        status : e.currentTarget.dataset.status
    }, ()=> {

        this.changeStatus();

    })
}

componentDidMount(){
  const accessString = localStorage.getItem('JWT');
  if(accessString === null){
      this.setState({
          isLogin: false,
          token: accessString
      })
      console.log("token is null!");
      this.props.history.push("companyLogin")
  }
    const data = parseToken(accessString);
    console.log("token: ", data);
    console.log("calling didmount")

    this.props.getJobAppliedStudents(accessString)
}


render(){

    let renderdata = {};

    renderdata = this.props.job_applied_student;
    console.log('renderdata - ',renderdata)

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
                                <img src="" style={{width:"200px", height: "130px" }}/>
                        {/* </div> */}
                        <div className="content" style={{padding: "10px 5px 5px 60px", color:"black"}}>
                        <Link to={`/studentProfile?email=${item.email}`}>
                                  <div className="header" ><h4><b>{item.name}</b></h4></div>
                          </Link>
                        <div className="extra"><h4><b>{item.title}</b></h4></div>
                        <div className="extra">
                                Status: {item.status}
                        </div>
                        <div className="extra">
                            <div  className="ui green button" data-status= "Reviewed" data-_id={item._id} data-email={item.email} onClick={this.statusHandler}> Application Reviewed</div>
                            <div  className="ui yellow button" data-status ="Screening" data-_id={item._id} data-email={item.email} onClick={this.statusHandler}> Initial Screening </div>                            
                            <div  className="ui red button" data-status="Reject"  data-_id={item._id} data-email={item.email} onClick={this.statusHandler}>  Reject </div>
                        </div>
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
          <div className="row" style={{marginTop:"2%"}}>
          <div className="header">
                        <h2>Students</h2>
            </div>
            <div className="ui items">
               <div className="item" style={{marginTop: "20px"}}>
                    <h3>No students have applied yet!</h3>               
                </div>
            </div>
          </div>
        </div>
      )
    }
}
}


JobAppliedStudents.propTypes  = {
  changeStatus : PropTypes.func.isRequired,
  getJobAppliedStudents: PropTypes.func.isRequired,
  job_applied_student: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  job_applied_student: state.Handshake_User_Info.job_applied_student
})

export default connect(mapStateToProps, {changeStatus, getJobAppliedStudents})(JobAppliedStudents)