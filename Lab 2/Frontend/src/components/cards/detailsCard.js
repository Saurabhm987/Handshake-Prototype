import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {API_ENDPOINT} from '../controller/endpoint';
import queryString from 'query-string';


 class DetailsCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            event_name:"",
            event_loc:"",
            event_descr:"",
            event_time:"",
            profile_pic:"",
            event_eligible:"",
            event_id: "",
            token: "",
        }

        this.instance = axios.create({
            baseURL: API_ENDPOINT,
            timeout: 1000,
          });
          
        this.getInfo = this.getInfo.bind(this);
    }    

  getInfo = (token) =>{
      
        const event_id = this.state.event_id.id;

        let config = {
            headers : {
                Authorization: `JWT ${token}`
            }, 
            params: {
                event_id: event_id, 
                info: "getEventDetails"
            }
        }

         this.instance.get("/getDetails", config).then(response => {
                if(response.status === 200){
                    if(response.data === "jwt expired"){
                        this.props.history.push("companyLogin");
                        alert("session expired! ");
                    }
                    const data = response.data;
                    console.log("data: ", data);
                    this.setState({
                        event_name: data.eventName,
                        event_loc:data.eventLocation,
                        event_time: data.eventTime,
                        event_descr: data.eventDescription,
                        profile_pic: data.profile_pic,
                        event_eligible: data.eventEligible,
                        profile_pic: data.profile_pic

                    })
                }else{
                    console.log("ERROR");
                }
            })
    }

    async componentDidMount(){
        console.log("Details Card!");
        const accessString = localStorage.getItem('JWT');

        if(accessString === null){
             this.setState({
                isLogin: false
            })

            alert("No token provided! You are being logged out!");
            console.log("token is null!");
            this.props.history.push('/login');
        }

        await this.setState({
            event_id: this.props.location.event_id || "",

        }, ()=>{
            this.getInfo(accessString);
        })
    }

renderViewMode = () => {

        const { event_name, event_loc , event_time, event_descr, profile_pic, event_eligible} = this.state;

        return(
            <div className="container">
                    <div>
                    <br/>
                        <div className="row">
                            <img src={`${API_ENDPOINT}/${profile_pic}`} alt="" style={{width:"1150px", height:"400px"}}/>
                        </div>
                        <div className="row">
                            <div className="ui items" style={{width:"100%"}}>
                                        <div className="item" onClick={this.cardSelect} style={{background: "white", padding: "10px 10px 10px 10px", marginTop:"15px", boxShadow: "0 2px 6px 0 rgba(0, 0, 0, 0.1), 0 2px 10px 0 rgba(0, 0, 0, 0.10)"}}>
                                            <img src={`${API_ENDPOINT}/${profile_pic}`} alt="" style={{width:"200px", height: "110px" }}/>
                                            <div className="content" style={{padding: "10px 5px 5px 50px"}}>
                                                    <div className="header" ><h4><b>{event_name}</b></h4></div>
                                                    <div className="extra"><h4><b>{event_loc}</b></h4></div>
                                                    <div className="extra"><b>Eligibility: </b>{event_eligible}</div>
                                                    <div className="extra"><b>Time: {event_time}</b></div>
                                            </div>
                                        </div>
                            </div>
                            </div>
                            <div className="row">
                                <div className="ui items" style={{width:"100%"}}>
                                        <div className="item" style={{background: "white", padding: "10px 10px 10px 10px", marginTop:"15px", boxShadow: "0 2px 6px 0 rgba(0, 0, 0, 0.1), 0 2px 10px 0 rgba(0, 0, 0, 0.10)"}}>
                                            <div className="content"  style={{padding: "10px 5px 5px 50px"}}>
                                            <div className="header"><b>Description</b></div>
                                            <div className="extra">{event_descr}</div> 
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

export default withRouter(DetailsCard);