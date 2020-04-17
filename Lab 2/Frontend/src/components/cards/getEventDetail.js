import React, {Component} from 'react';
import {API_ENDPOINT} from '../controller/endpoint';
import { connect } from 'react-redux';
import {fetchEvent} from '../../actions/fetchAction'
import queryString from 'query-string';
import PropTypes from 'prop-types'

 class EventDetail extends Component {
    constructor(props){
        super(props);
    }    

componenDidMount(){

    const token = localStorage.getItem('JWT')
    this.props.fetchEvent(token)
}

renderViewMode = () => {

        const {id} = queryString.parse(this.props.location.search);
        const data = this.props.eventDetails.filter( event => event.event_id === id)
        const item = data[0]
        return(
            <div className="container">
                    <div>
                    <br/>
                        <div className="row">
                            <img src={`${API_ENDPOINT}/${item.profile_pic}`} style={{width:"1150px", height:"400px"}}/>
                        </div>
                        <div className="row">
                            <div className="ui items" style={{width:"100%"}}>
                                        <div className="item" onClick={this.cardSelect} style={{background: "white", padding: "10px 10px 10px 10px", marginTop:"15px", boxShadow: "0 2px 6px 0 rgba(0, 0, 0, 0.1), 0 2px 10px 0 rgba(0, 0, 0, 0.10)"}}>
                                            <img src={`${API_ENDPOINT}/${item.profile_pic}`} style={{width:"200px", height: "110px" }}/>
                                            <div className="content" style={{padding: "10px 5px 5px 50px"}}>
                                                    <div className="header" ><h4><b>{item.eventName}</b></h4></div>
                                                    <div className="extra"><h4><b>{item.name}</b></h4></div>
                                                    <div className="extra"><b>Location: </b>{item.eventLocation}</div>
                                                    <div className="extra"><b>Eligibility: </b>{item.eventEligible}</div>
                                                    <div className="extra"><b>Time: {item.eventTime}</b></div>
                                            </div>
                                        </div>
                            </div>
                            </div>
                            <div className="row">
                                <div className="ui items" style={{width:"100%"}}>
                                        <div className="item" style={{background: "white", padding: "10px 10px 10px 10px", marginTop:"15px", boxShadow: "0 2px 6px 0 rgba(0, 0, 0, 0.1), 0 2px 10px 0 rgba(0, 0, 0, 0.10)"}}>
                                            <div className="content"  style={{padding: "10px 5px 5px 50px"}}>
                                            <div className="header"><b>Description</b></div>
                                            <div className="extra">{item.eventDescription}</div> 
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
            </div>
        )
    }
    render(){
            return (
                this.renderViewMode()
            )
        }
    }

EventDetail.propTypes = {
    eventDetails: PropTypes.array.isRequired,
    fetchEvent: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    eventDetails: state.Handshake_User_Info.eventDetails
})

export default connect(mapStateToProps, {fetchEvent})(EventDetail);