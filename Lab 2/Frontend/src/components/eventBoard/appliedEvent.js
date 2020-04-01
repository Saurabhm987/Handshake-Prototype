import React, { Component } from 'react';
import axios from 'axios';
import {API_ENDPOINT} from '../controller/endpoint';
import {fetchAppliedEvent} from '../../actions/fetchAction';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class AppliedEvent extends Component {
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

componentDidMount(){
  const accessString = localStorage.getItem('JWT');
  if(accessString === null){
      this.setState({
          isLogin: false
      })
      console.log("token is null!");
  }
  this.props.fetchAppliedEvent(accessString);
}

componentWillReceiveProps(nextProps){
    if(nextProps.appliedEvents){
        if(nextProps.appliedEvents === "jwt expired"){
            this.props.history.push("/login")
        }
        this.setState({
            eventData: nextProps.appliedEvents
        })
    }
}

render(){

const renderdata = this.state.eventData;
if(renderdata){
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
            <div className="ui items">
                    { renderdata.map( (item, index) =>
                    <div className="item" data-div_id={index} onClick={this.cardSelect} style={{background: "white", padding: "15px 10px 0px 15px ", marginTop:"15px", boxShadow: "0 2px 6px 0 rgba(0, 0, 0, 0.1), 0 2px 10px 0 rgba(0, 0, 0, 0.10)"}}>
                        <img src={item.profile_pic} style={{width:"200px", height:"110px"}}/>
                        <div className="content" style={{padding:"5px 5px 5px 100px"}}>
                                <div className="header" ><h4><b>{item.name}</b></h4></div>
                                <div className="extra" ><h4><b>{item.company_name}</b></h4></div>
                                <div className="extra"><b>{item.location}</b></div>
                                <div className="extra"><b><i>Applied Date:</i>{item.date}</b></div>
                                <div className="extra" >
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
            <div>
                No event applied!
            </div>
        )
    }
  }
}


AppliedEvent.propTypes = {
    fetchAppliedEvent: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired
}

const mapStateToProps =state=>({
    appliedEvents: state.Handshake_User_Info.appliedEvents,
    message: state.Handshake_User_Info.message
})

export default connect( mapStateToProps, {fetchAppliedEvent})(AppliedEvent);