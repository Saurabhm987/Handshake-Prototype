import React, { Component } from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import {API_ENDPOINT} from '../controller/endpoint';
import {fetchCompanyPostedEvent} from '../../actions/fetchAction'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

class CompanyPostedEventCard extends Component {
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

componentDidMount(){
  const accessString = localStorage.getItem('JWT');
  if(accessString === null){
      this.setState({
          isLogin: false
      })
      alert("Token Expired!");
      this.props.history.push("/companyLogin");
  }

  this.props.fetchCompanyPostedEvent(accessString);

//   this.instance.get("/getJobPosted/postedevent", { 
//       headers: {
//           Authorization: `JWT ${accessString}`
//       }
//   } )
//   .then(response => {
//           if(response.status === 200){
//             if(response.data === "jwt expired" && response.data === "jwt malformed"){
//               localStorage.removeItem('JWT');
//               this.setState({
//                 isLogin: false
//               })
//               this.props.history.push("/companyLogin");
//             }
//               this.setState({
//                   applicationData:response.data
//               })
//               console.log("Application_Data: ", this.state.applicationData);
//           }else{
//               console.log("ERROR");
//           }
//       })
//       .catch((err)=>{
//           console.error(err);
//       })


}

render(){

const renderdata = this.props.eventDetails;
console.log('posted event - ', renderdata)
if(renderdata){
    return(
        <div className="container" >
            <div className="row" style={{marginTop:"2%"}}>
                <div className="header">
                        <h2>Posted Events</h2>
                </div>
                <div className="ui items" style={{width:"100%"}}>
                        { renderdata.map( (item, index) =>
                        <div className="item" id="cardHover" data-div_id={index} onClick={this.cardSelect} style={{background: "white", padding: "10px 10px 10px 10px", marginTop:"15px", boxShadow: "0 2px 6px 0 rgba(0, 0, 0, 0.1), 0 2px 10px 0 rgba(0, 0, 0, 0.10)"}}>
                            <div className="row" style={{width: "100%"}}>
                                <div className="col-md-3">
                                    <img src={`${API_ENDPOINT}/${item.profile_pic}`} style={{width:"200px", height: "110px" }}/>
                                </div>
                                <div className="col-md-7">
                                    <div className="content" style={{padding: "10px 5px 5px 50px"}}>
                                            <div className="header" ><h4><b>{item.eventName}</b></h4></div>
                                            <div className="extra"><h4><b>{item.eventlocation}</b></h4></div>
                                            <div className="extra"><b>Eligibility: </b>{item.eventEligible}</div>
                                            <div className="extra"><b>Time: {item.eventTime}</b></div>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="right floated content" style={{padding: "35px"}}>
                                        <div className="ui large button">
                                            <Link to=  {{  
                                                        pathname: '/details',
                                                        event_id: {
                                                            id: `${item._id}`
                                                        }
                                                    }}  >Details</Link>
                                            </div>
                                        </div>
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
        <div className="container" style={{marginTop: "20px"}}>
            <h2>No event posted!</h2>
        </div>
    )
}
}
}

CompanyPostedEventCard.propTypes = {
    fetchCompanyPostedEvent : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    eventDetails: state.Handshake_User_Info.eventDetails
})

export default connect(mapStateToProps, {fetchCompanyPostedEvent})(CompanyPostedEventCard)