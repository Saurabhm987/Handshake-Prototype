import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {API_ENDPOINT} from '../controller/endpoint';
import {addEducation, updateEducation} from '../../actions/updateAction';
import {fetchEducation} from '../../actions/fetchAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class EducationCard extends Component {
    constructor(props){
        super(props);

        this.state = {
            eduInfo: [],
            token: "", 
            college:"",
            location:"",
            degree: "",
            major:"",
            gpa:"",
            yop:"",
            _id:"",
            isLogin: true,
            editMode: false,
            addMode:false, 
            reload: true
        }

        this.instance = axios.create({
            baseURL: API_ENDPOINT,
            timeout: 1000,
          });
    }

    handleCancelAdd = () =>{
        this.setState({
            addMode: false
        })
    }

    handleEdit = (e) => {
        this.setState({
            editMode: !this.state.editMode,
            _id: e.currentTarget.dataset.div_id
        })
    }

    handleCancel = () => {
        this.setState ({
            editMode: !this.state.editMode
        })
    }

    handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState ({
            [name]: value
        });
    }

    handleAdd = (e) => {
        console.log("adding college");
        e.preventDefault(); 

        this.setState({
            addMode: false
        })

        const educationInfo = {
            college: this.state.college,
            location: this.state.location,
            degree:this.state.degree,
            major: this.state.major,
            gpa: this.state.gpa,
            yop: this.state.yop,
        }
        this.props.addEducation(educationInfo,this.state.token );
    }

    setAddMode = () => {
        console.log("in add mode!")
            this.setState({
                addMode: true
        })
    }

    handleSave = async (e) => {
        console.log("handle Save!");
        e.preventDefault(); 
        this.setState({
            editMode: !this.state.editMode
        })
        const userInfo = {
            college: this.state.college,
            location: this.state.location,
            degree:this.state.degree,
            major: this.state.major,
            gpa: this.state.gpa,
            yop: this.state.yop,
            _id: this.state._id
        }
        this.props.updateEducation(userInfo, this.state.token);
        }

    componentWillReceiveProps(nextProps){
        if(nextProps.educationInfo){
            this.setState({
                eduInfo: nextProps.educationInfo
            })
        }
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

        this.props.fetchEducation(accessString);
    }

        renderViewMode = () =>{
            let data = this.state.eduInfo;
            console.log("data: ", data);
            if(data !== undefined){
                return(
                        <div className="ui cards">
                        <div className="card" style={{width: "55%", fontSize:"1.5em"}}>
                        <div className="content">
                        <div className="header">Education</div>
                        <br/>
                        { data.map( edu => 
                        <div onClick={this.handleEdit} id="eduCard"  data-div_id={edu.education_id}  style={{padding: "20px"}}>
                                <div className="description">
                                        <h2>{edu.education_details.college}</h2>
                                </div>
                                <div className ="description">
                                {edu.education_details.degree} in {edu.education_details.major} 
                                </div>
                                <div className="description">
                                    Graduate: {edu.education_details.yop} 
                                </div>
                                <div className="description">
                                     GPA:  {edu.education_details.gpa} 
                                </div>
                                <div className="ui divider"></div>
                        </div>
                            ) }
                            </div>
                            <div  className="extra content">
                                <div onClick={this.setAddMode} className="ui bottom attached large button">
                                    Add 
                                </div>
                            </div>
                        </div>
                        </div>
                    );  
                }else{
                    return(
                        <div className="ui cards">
                            <div className="card" style={{width: "55%", fontSize:"1.5em"}}>
                                <div className="content">
                                    <div className="header">Education</div>
                                    <div>No Education Added!</div>
                                </div>
                            </div>
                        </div>
                    )
                }
            }

            renderEditView = () => {
                return(
                <div className="ui cards">
                        <div className="card" style={{width: "55%", fontSize:"1.5em"}}>
                                <div className="content">
                                        <div className="header">Education</div>
                                        <br/>
                                        <div style={{padding: "20px"}}>
                                                <div className="description">
                                                        College Name
                                                </div>
                                                <div className="ui input" style={{fontSize: "0.5em", width:"350px" }}>
                                                        <input type="text" name="college" value={this.state.college || ''} onChange = { this.handleChange}/>
                                                </div>
                                                <div className="description">
                                                        College Location
                                                </div>
                                                <div className="ui input" style={{fontSize: "0.5em", width:"350px" }}>
                                                        <input type="text" name="location" value={this.state.location || ''} onChange = { this.handleChange}/>
                                                </div>
                                                <div className ="description">
                                                        Degree
                                                </div>
                                                <div className="ui input" style={{fontSize: "0.5em", width:"350px" }}>
                                                        <input type="text" name="degree" value={this.state.degree || ''} onChange = { this.handleChange}/>
                                                </div>
                                                <div className ="description">
                                                         Major
                                                </div>
                                                <div className="ui input" style={{fontSize: "0.5em", width:"350px" }}>
                                                        <input type="text" name="major" value={this.state.major || ''} onChange = { this.handleChange}/>
                                                </div>
                                                <div className="description">
                                                        Year of Passing
                                                </div>
                                                <div className="ui input" style={{fontSize: "0.5em", width:"350px" }}>
                                                        <input type="text" name="yop" value={this.state.yop || ''} onChange = { this.handleChange}/>
                                                </div>
                                                <div className="description">
                                                        GPA
                                                </div>
                                                <div className="ui input" style={{fontSize: "0.5em", width:"350px" }}>
                                                        <input type="text" name="gpa" value={this.state.gpa || ''} onChange = { this.handleChange}/>
                                                </div>
                                                <div className="extra content" style={{paddingTop:"10px"}}>
                                                <div  onClick= {this.handleSave } className="ui medium green button" style={{width:"100px", float:"left"}}>
                                                        Save 
                                                </div>
                                                <div onClick={this.handleCancel} className="ui medium button" style={{width:"100px", marginLeft:"24%"}}>
                                                            Cancel 
                                                </div>
                                                </div>
                                                <br/>
                                        </div>
                                </div>
                        </div>
                </div>
                )
            }

            renderAddCollege = () => {
                console.log("in render add college!!!");
                return(
                    <div className="ui cards">
                    <div className="card" style={{width: "55%", fontSize:"1.3em"}}>
                    <div className="header" style={{padding: "10px"}}> Add Education</div>
                    <form className="ui form" style={{padding:"20px"}}>
                            <div className="field">
                                    <label>College Name</label>
                                    <input type="text" name="college"  onChange={this.handleChange}/>
                            </div>
                            <div className="field">
                                    <label>College Location</label>
                                    <input type="text" name="location" onChange={this.handleChange} />
                            </div>
                            <div className="field">
                                    <label>Degree</label>
                                    <input type="text" name="degree" onChange={this.handleChange}/>
                            </div>
                            <div className="field">
                                    <label>Major</label>
                                    <input type="text" name="major" onChange={this.handleChange} />
                            </div>
                            <div className="field">
                                    <label>Year of passing</label>
                                    <input type="text" name="yop" onChange={this.handleChange}/>
                            </div>
                            <div className="field">
                                    <label>GPA</label>
                                    <input type="text" name="gpa" onChange={this.handleChange}/>
                            </div>
                            <div className="extra content" style={{paddingBottom:"20px"}}>
                                                <div  onClick= {this.handleAdd } className="ui medium green button" style={{width:"100px", float:"left"}}>
                                                        Save 
                                                </div>
                                                <div onClick={this.handleCancelAdd} className="ui medium button" style={{width:"100px",float:"right"}}>
                                                            Cancel 
                                                </div>
                                </div>
                  </form>
                  </div>
                  </div>
                )
            }

            render(){
                if(this.state.isLogin === true){
                    if(this.state.addMode){
                        return(
                            this.renderAddCollege()
                        )
                    }else{
                        return(
                            this.state.editMode ? this.renderEditView() : this.renderViewMode()
                        )
                    }
                }else{
                    return(
                        <Redirect to="/login"/>
                    )
                }
            }
}

EducationCard.propTypes = {
    addEducation: PropTypes.func.isRequired,
    fetchEducation: PropTypes.func.isRequired,
    updateEducation: PropTypes.func.isRequired,
    educationInfo: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    educationInfo: state.Handshake_User_Info.educationInfo
})

export default connect(mapStateToProps, {addEducation, fetchEducation, updateEducation})(EducationCard);