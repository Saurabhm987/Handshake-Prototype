import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import {API_ENDPOINT} from '../controller/endpoint';


export default class SummaryCard extends Component {
    constructor(props){
        super(props);

        this.state = {
            editmode: false,
            objective: "",
            token: "",
            isLogin: true
        }

        this.instance = axios.create({
            baseURL: API_ENDPOINT,
            timeout: 1000,
          });

        this.editHandler = this.editHandler.bind(this);
        this.saveHandler = this.saveHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    //necessary to update the component
    componentDidUpdate(){
    }

    componentDidMount(){
        const accessString = localStorage.getItem('JWT');
        if(accessString === null){
            this.setState({
                isLogin: false
            })
            console.log("token is null!....Please Login Again......");
        }

        this.setState({
            token: accessString
        })

        console.log("summary_card_compdidmnt_accessString: ", accessString);

        this.instance.get("/profileStudent/userInfo", { 
            headers: {
                Authorization: `JWT ${accessString}`
            }
        } ).then(response => {
                if(response.status === 200){
                    if(response.data === "jwt expired"){
                        alert("session expired!");
                        this.props.history.push("/login");
                    }
                    this.setState({
                        objective: response.data.student_objective
                    })
                    // console.log("studentProfile_responseObj: ", response.data);
                    console.log("summaryCard_updated_objective: ", this.state.objective);
                }else{
                    console.log("ERROR");
                }
            })
    }

    cancleChange = (e) => {
        this.setState ({
            editmode: false
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    saveHandler= (e) => {
        e.preventDefault();
        console.log("CALLING_SAVE_HANDLER.....");

        const updateInfo =this.state.objective;
        console.log("summaryCard_updateInfo: ",updateInfo);

        const headers = {
            Authorization: `JWT ${this.state.token}`
        }

        console.log("summaryCard_logout_headers: ", this.state.token);
        console.log("updateInfo: ", updateInfo);
      
        this.instance.put("/updateUserProfile", {
            params : {
                requestInfo : "summary" ,
                data: updateInfo
            }
        } , {
            headers: headers
        })
            .then(res => {
                if(res.status === 200){
                    this.setState({
                        editmode:false
                    })
                    console.log("SUMMARY_UPDATED");
                }
            })
    }
    editHandler = (e) => {
        e.preventDefault();

        console.log("studentProfile_CALLING_EDIT_HANDLER");

        this.setState({
            editmode: true
        })

    }
    
    render(){

        let summary = null;
        const renderSummary = this.state.objective;
        console.log("summaryCard_SUMMARY_INFO:", this.state.objective);

        if(this.state.objective !== null && this.state.editmode === false && this.state.isLogin){
            summary = (
                <div>
                <div style={{marginBottom: "20px"}}> 
                    <h4>{renderSummary}</h4>
                </div>
                <div onClick={this.editHandler} class="ui bottom attached small button">
                        Edit Summary 
                </div>
            </div>
            )
        }else if((this.state.editmode === true || this.state.objective=== null) && this.state.isLogin ){
            summary =(
                <div>
                <div className="description" style={{marginBottom: "10px"}}>
                            <h4>What are you passionate about? What are you looking for on Handshake? What are your experiences or skills?</h4>
                 </div>
                <form className="ui form">
                    <textarea style={{fontSize:"1.5em"}} name="objective" placeholder="Tell us more" rows="3" defaultValue={this.state.objective} onChange = { this.handleChange}></textarea>
                </form>
                <br/>
                <div className="extra content">
                <div onClick={this.cancleChange} class="ui bottom attached large button" style={{ width: "300px", float:"left"}}>
                           Cancel
                </div>
                <div onClick={this.saveHandler} class="ui bottom attached large button" style={{width: "300px", float:"right"}}>
                            Save
                </div>
                </div>
                </div>
            )
        }else{
            summary =(
                <Redirect to= "/" />
            )
        }

        return(
            <div className="ui cards">
            <div className="card" style={{width: "55%", fontSize:"1.5em"}}>
                <div className="content">
                    <div className="header" style={{marginBottom: "10px"}}>
                        My Journey
                    </div>
                        {summary}
                </div>
            </div>
        </div>
        );
    }
}


