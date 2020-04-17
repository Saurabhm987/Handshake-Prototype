import React, { Component } from 'react'
import axios from 'axios'
import {API_ENDPOINT} from '../controller/endpoint'
import { connect } from 'react-redux'
import {fetchEvent, searchEvent} from '../../actions/fetchAction'
import {applyEvent} from '../../actions/applyActions'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

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
      message:"",
      searchText: "",
      token:""
    }

    this.instance = axios.create({
      baseURL: API_ENDPOINT,
      timeout: 1000,
    });

    this.cardSelect = this.cardSelect.bind(this);
    this.applied = this.applied.bind(this);
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)

  }

  handleChange=(e)=>{
    e.preventDefault()

    if(!e.target.value){
      const{token} = this.state
      this.props.fetchEvent( token)
    }

    this.setState({
      searchText: e.target.value
    });
  }

handleSearch = () => {

  const{searchText} = this.state
  const {eventDetails} = this.props

  if(searchText){
      this.props.searchEvent(searchText, eventDetails)
  }
  
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

        alert('Event Applied!')

        this.props.applyEvent(accessString, this.state)
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

    async componentDidMount(){
      const accessString = localStorage.getItem('JWT');

      if(accessString === null){
          this.setState({
              isLogin: false
          })
          console.log("token is null!");
          this.props.history.push("login")
      }

      this.setState({
        token: accessString
      });

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

  let renderdata = this.state.eventData;  

  console.log('event data - ', renderdata)

  if(renderdata.length > 0){
  var searchBar = (
    <div className ="row">
              <div className="ui fluid action input" style={{marginLeft: "1.5%", marginRight:"1.5%", width:"100%"}}>
                  <input type="text" placeholder="Search opportunities" onChange={this.handleChange}/>
                  <div className="ui button" onClick={this.handleSearch}>Search</div>
              </div>
      </div>
  )

  let eventbar = (
    <div className="ui items" id="scroll" style={{width:"100%"}}>
        { renderdata.map( (item, index) =>
          <div className="item" id="cardHover" data-div_id={index} onClick={this.cardSelect} style={{background: "white", padding: "20px"}}>
              <img src={`${API_ENDPOINT}/${item.profile_pic}`}  style={{width:"240px", height:"170px"}}/>
              <div className="row" style={{width:"100%"}}>
                  <div className="col-md-9">
                    <div className="content" style={{padding: " 5px 5px 5px 35px"}}>
                            <div className="header" id="cardHover"><b> {item.eventName}</b></div>
                            <div className="meta">
                                <span>{item.name}</span>
                            </div>
                            <div className="extra">
                                {item.eventLocation}
                            </div>
                            <div className="extra">
                                Eligibility: {item.eventEligible}
                            </div>
                            <div className="extra">
                                Time: {item.eventTime}
                            </div>
                            <div className="extra" style={{textDecorationColor:"blue", color:"blue"}}>
                            <Link to={`/eventDetail?id=${item.event_id}`}>View Detail</Link>
                            </div>
                    </div>
                  </div>
                    <div className="col-md-3">
                      <div className="right floated content" style={{padding: "35px"}}>
                              <div className="ui large green button" 
                                  onClick={this.applied} 
                                  data-selected_event_id={item._id} 
                                  data-event_name = {item.eventName}
                                  data-company_name = {item.name}
                                  data-event_loc = {item.eventLocation}
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
                  {eventbar}
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
  message: PropTypes.string.isRequired,
  applyEvent: PropTypes.func.isRequired
}

const mapStateToProps = state =>({
  eventDetails : state.Handshake_User_Info.eventDetails,
  message: state.Handshake_User_Info.message
})

export default connect(mapStateToProps, {fetchEvent, applyEvent, searchEvent})(EventBoard);

