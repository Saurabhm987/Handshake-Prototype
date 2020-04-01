import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import {API_ENDPOINT} from '../controller/endpoint';
import {fetchStudentProfile} from '../../actions/fetchAction';
import {updateSummary} from '../../actions/updateAction';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

class SummaryCard extends Component {
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
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.data){
            console.log("summary: ", nextProps.data.summary);
            this.setState({
                objective: nextProps.data.summary
            })
        }
    }

    componentDidMount(){
        const accessString = localStorage.getItem('JWT');
        this.setState({
            token: accessString
        })
    }

    cancleChange = () => {
        this.setState ({
            editmode: false
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    saveHandler= async (e) => {
        e.preventDefault();
        const updateInfo =this.state.objective;
        this.setState({
            editmode: false
        })
        await this.props.updateSummary(updateInfo, this.state.token);
        
        // const headers = {
        //     Authorization: `JWT ${this.state.token}`
        // }
        // this.instance.put("/updateUserProfile", {
        //     params : {
        //         requestInfo : "summary" ,
        //         data: updateInfo
        //     }
        // } , {
        //     headers: headers
        // })
        //     .then(res => {
        //         if(res.status === 200){
        //             this.setState({
        //                 editmode:false
        //             })
        //             console.log("SUMMARY_UPDATED");
        //         }
        //     })
    }
    editHandler = (e) => {
        e.preventDefault();
        this.setState({
            editmode: true
        })
    }
    
    render(){
        let summary = null;
        const renderSummary = this.state.objective;

        if(this.state.objective !== null && this.state.editmode === false && this.state.isLogin){
            summary = (
                <div>
                <div style={{marginBottom: "20px"}}> 
                    <h4>{renderSummary}</h4>
                </div>
                <div onClick={this.editHandler} className="ui bottom attached small button">
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
                        <div onClick={this.cancleChange} className="ui bottom attached large button" style={{ width: "300px", float:"left"}}>
                                Cancel
                        </div>
                        <div onClick={this.saveHandler} className="ui bottom attached large button" style={{width: "300px", float:"right"}}>
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

SummaryCard.propTypes = {
    fetchStudentProfile: PropTypes.func.isRequired,
    updateSummary: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    data: state.Handshake_User_Info.profileInfo,
})

export default connect(mapStateToProps, {fetchStudentProfile, updateSummary})(SummaryCard);
