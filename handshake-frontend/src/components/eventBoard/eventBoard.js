import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {API_ENDPOINT} from '../controller/endpoint'

export default class EventBoard extends Component {
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
    componentDidMount(){
      const accessString = localStorage.getItem('JWT');

      if(accessString === null){
          this.setState({
              isLogin: false
          })
          console.log("token is null!");
      }

      console.log("eventBoard -  token: ", accessString);

      this.instance.get("/getEventBoard/board", { 
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
                  this.props.history.push("/companyLogin");
                }
                  this.setState({
                      eventData:response.data
                  })
                  console.log("jobBoard_eventData: ", this.state.eventData);
              }else{
                  console.log("ERROR");
              }
          })
  }

render() {

  let curSelectedJob = this.state.cardSelected;
  console.log("curSelectedJob: ", curSelectedJob);
  let renderdata = this.state.eventData;

  let searchBar = (
    <div className ="row">
              <div class="ui fluid action input" style={{marginLeft: "1.5%", marginRight:"1.5%", width:"100%"}}>
                  <input type="text" placeholder="Search opportunities"/>
                  <div class="ui button">Search</div>
              </div>
      </div>
  )


  let lefBar = (

    <div class="ui items" id="scroll" style={{width:"100%"}}>
        { renderdata.map( (item, index) =>
          <div class="item" id="cardHover" data-div_id={index} onClick={this.cardSelect} style={{background: "white", padding: "20px"}}>
              <img src={item.profile_pic}  style={{width:"170px", height:"110px"}}/>

          <div className="row" style={{width:"100%"}}>
              <div className="col-md-9">
                <div class="content" style={{padding: " 5px 5px 5px 35px"}}>
                        <div className="header" id="cardHover"><b> {item.event_name}</b></div>
                        <div class="meta">
                            <span>{item.event_loc}</span>
                        </div>
                        <div class="extra">
                            {item.company_name}
                        </div>
                        <div class="extra">
                            Eligibility: {item.event_eligible}
                        </div>
                        {/* <div className="extra">
                            {item.event_descr}
                        </div> */}
                </div>
              </div>
                <div className="col-md-3">
                  <div class="right floated content" style={{padding: "35px"}}>
                          <div class="ui large green button" 
                              onClick={this.applied} 
                              data-selected_event_id={item.event_id} 
                              data-event_name = {item.event_name}
                              data-event_loc = {item.event_loc}
                              data-company_name = {item.company_name}
                              data-profile_pic = {item.profile_pic}
                          >Register</div>
                  </div>
                </div>
            </div>

                <div ui message > 
                        {item.event_status}
                </div>
          </div>
        )}
  </div>
  )

  if(this.state.isLogin === true &&  renderdata !== {}){
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
    <Redirect to="/jobProfile" />
  )
}

}
}



