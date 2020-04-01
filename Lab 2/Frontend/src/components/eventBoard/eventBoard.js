import React, { Component } from 'react'
import axios from 'axios'
import {API_ENDPOINT} from '../controller/endpoint'
import { connect } from 'react-redux'
import {fetchEvent} from '../../actions/fetchAction'
import PropTypes from 'prop-types'

class EventBoard extends Component {
  constructor(props){
    super(props);

    this.state ={
      isLogin: true,
      eventData: [],
      cardSelected:"",
      appliedEventId:"",
      appliedEvCompany:"",
      applied_event_name:"",
      event_status:"",
      profile_pic: "",
      event_loc:"",
      message:""
    }

    this.instance = axios.create({
      baseURL: API_ENDPOINT,
      timeout: 1000,
    });

    this.cardSelect = this.cardSelect.bind(this);
    this.applied = this.applied.bind(this);

  }

  cardSelect = (e) => {
    e.preventDefault();

    this.setState({
      cardSelected : e.currentTarget.dataset.div_id
    })
  }

sendData = async () => {
        const accessString = localStorage.getItem('JWT');
        if(accessString === null){
            this.setState({
                isLogin: false
            })

            this.props.history.push("Login");
            console.log("token is null!");
        }

        console.log("apply_event_data: ", this.state);

        await this.instance.post("/applyEvent",{
          params:{
            event_id: this.state.appliedEventId,
            company_name: this.state.appliedEvCompany,
            event_name: this.state.appliedEvName, 
            event_status: "Applied",
            profile_pic: this.state.profile_pic,
            event_loc: this.state.event_loc
          }
        }, { 
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
                    this.props.history.push("/Login");
                  }
                   alert("Registered!");
                   console.log("Event Registered!");
                }else{
                    console.log("ERROR");
                }
            })
}

  applied = async (e) => {
        this.setState({
          appliedEventId: e.currentTarget.dataset.selected_event_id,
          appliedEvCompany: e.currentTarget.dataset.company_name,
          appliedEvName : e.currentTarget.dataset.event_name,
          profile_pic : e.currentTarget.dataset.profile_pic,
          event_loc: e.currentTarget.dataset.event_loc,
      }, () => {
        this.sendData();
      })  
  }

    componentDidUpdate(){}
    async componentDidMount(){
      const accessString = localStorage.getItem('JWT');

      if(accessString === null){
          this.setState({
              isLogin: false
          })
          console.log("token is null!");
          this.props.history.push("login")
      }
      await this.props.fetchEvent(accessString);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.eventDetails){
      this.setState({
        eventData: nextProps.eventDetails
      })
    }
    if(nextProps.message){
      if(nextProps.message === "jwt expired"){
        this.props.history.push("login");
      }
      this.setState({
        message: nextProps.message
      })
    }
  }

render() {
  // let curSelectedJob = this.state.cardSelected;
  // console.log("curSelectedJob: ", curSelectedJob);
  let renderdata = this.state.eventData;
  console.log("renderData: ", renderdata);
  
  if(renderdata.length > 0){
  var searchBar = (
    <div className ="row">
              <div className="ui fluid action input" style={{marginLeft: "1.5%", marginRight:"1.5%", width:"100%"}}>
                  <input type="text" placeholder="Search opportunities"/>
                  <div className="ui button">Search</div>
              </div>
      </div>
  )

  let lefBar = (
    <div className="ui items" id="scroll" style={{width:"100%"}}>
        { renderdata.map( (item, index) =>
          <div className="item" id="cardHover" data-div_id={index} onClick={this.cardSelect} style={{background: "white", padding: "20px"}}>
              <img src={item.profile_pic}  style={{width:"170px", height:"110px"}}/>
              <div className="row" style={{width:"100%"}}>
                  <div className="col-md-9">
                    <div className="content" style={{padding: " 5px 5px 5px 35px"}}>
                            <div className="header" id="cardHover"><b> {item.eventName}</b></div>
                            <div className="meta">
                                <span>{item.eventLocation}</span>
                            </div>
                            <div className="extra">
                                {item.name}
                            </div>
                            <div className="extra">
                                Eligibility: {item.eventEligible}
                            </div>
                            <div className="extra" style={{textDecorationColor:"blue", color:"blue"}}>
                                  View Details
                            </div>
                    </div>
                  </div>
                    <div className="col-md-3">
                      <div className="right floated content" style={{padding: "35px"}}>
                              <div className="ui large green button" 
                                  onClick={this.applied} 
                                  data-selected_event_id={item._id} 
                                  data-event_name = {item.eventName}
                                  data-event_loc = {item.eventLocation}
                                  data-company_name = {item.name}
                                  data-profile_pic = {item.profile_pic}
                              >Register</div>
                      </div>
                    </div>
                </div>
                <div ui message > 
                        {item.eventStatus}
                </div>
          </div>
        )}
  </div>
  )

  return (
    <div className="container" style={{marginRight:"20%", marginLeft: "20%"}}>
    <br/>
        {searchBar}   
    <br/>
        <div className="row">
                  {lefBar}
            <br/> 
        </div>
</div>
)
 }else{
  return(
    <div className="container" style={{marginRight:"20%", marginLeft: "20%"}}>
    <br/>
                {searchBar}   
            <br/>
        <div>
              <h2>No Event Posted!</h2>
        </div>
 </div>
 )
}

}
}

EventBoard.propTypes = {
  fetchEvent: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired
}

const mapStateToProps = state =>({
  eventDetails : state.Handshake_User_Info.eventDetails,
  message: state.Handshake_User_Info.message
})

export default connect(mapStateToProps, {fetchEvent})(EventBoard);

