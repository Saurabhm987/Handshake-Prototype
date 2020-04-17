import React, { Component } from 'react';
import axios from 'axios';
import {API_ENDPOINT} from '../controller/endpoint';
import { connect } from 'react-redux';
import {getApplications} from '../../actions/fetchAction'
import PropTypes from 'prop-types'

class Applications extends Component {
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

componentDidMount(){
  const accessString = localStorage.getItem('JWT');
  if(accessString === null){
      this.setState({
          isLogin: false
      })
      console.log("token is null!");
  }

  if(!this.props.loggedIn){
      this.props.history.push('/login')
  }

  this.props.getApplications(accessString)
}


render(){

const renderdata = this.props.applications;
console.log("renderData: ", renderdata)

if(renderdata !== null && renderdata !== undefined && renderdata.length > 0){

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
                    <div className="item" id="cardHover" data-div_id={index} onClick={this.cardSelect} style={{background: "white", padding: "10px", marginTop:"15px", boxShadow: "0 0 0 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.10)"}}>
                        <img src={`${API_ENDPOINT}/${item.profile_pic}`} alt="" style={{width:"145px", height:"110px", marginLeft:"20px"}}/>
                        <div className="content" style={{padding: "10px 5px 5px 80px"}}>
                                <div className="header" id="cardHover" ><h4><b>{item.name}</b></h4></div>
                                <div className="extra" ><h4><b>{item.position}</b></h4></div>
                                <div className="extra">
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
}else{
    return(
        <div className="container" style={{marginTop:"20px"}}>
            <h2>No Applied Job!</h2>
        </div>
    )
}
}
}

Applications.propTypes = {
    getApplications: PropTypes.func.isRequired,
    applications: PropTypes.array.isRequired,
    loggedIn: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    applications : state.Handshake_User_Info.applications,
    loggedIn: state.Handshake_User_Info.loggedIn
})

export default connect(mapStateToProps, {getApplications})(Applications)