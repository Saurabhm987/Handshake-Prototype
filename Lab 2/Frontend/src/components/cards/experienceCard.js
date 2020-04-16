import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {addExperience, updateExperience} from '../../actions/updateAction';
import {fetchExperience} from '../../actions/fetchAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

 class ExperienceCard extends Component {
    constructor(props){
        super(props);

        this.state = {
            // expInfo:[],
            token:"",
            title:"",
            location:"",
            joined_date:"",
            company_name:"",
            description:"",
            _id:"",
            isLogin:true,
            editMode:false,
            addMode:false,
        }
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
        console.log("adding exp");
        e.preventDefault(); 

        this.setState({
            addMode: false
        })

        const expInfo = {
            title: this.state.title,
            location: this.state.location,
            company_name:this.state.company_name,
            joined_date: this.state.joined_date,
            description: this.state.description,
        }


        console.log("expInfo: ", expInfo);
        const {token} = this.state
        this.props.addExperience(expInfo,token );
        const {email} = this.props
        this.props.fetchExperience(token, email)
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
            editMode: !this.state.editMode,
        })
        const expInfo = {
            title: this.state.title,
            location: this.state.location,
            company_name:this.state.company_name,
            joined_date: this.state.joined_date,
            description: this.state.description,
            _id: this.state._id
        }
        console.log("expInfo",expInfo)
        this.props.updateExperience(expInfo, this.state.token)
     }

    // componentWillReceiveProps(nextProps){
    //     if(nextProps.experienceInfo){
    //         this.setState({
    //             expInfo: nextProps.experienceInfo
    //         })
    //     }
    // }
    
    componentDidMount(){
        const accessString = localStorage.getItem('JWT');
        if(accessString === null){
            this.setState({
                isLogin: false
            })
        }

        this.setState({
            token: accessString,
        })
    }
    
    renderViewMode = () =>{
        const {experienceInfo} = this.props
        console.log('experience obj - ', experienceInfo)
        let data = experienceInfo
        const {adminView} = this.props
        if(data !== undefined && data !== ""){
            return(
                    <div className="ui cards">
                    <div className="card" style={{width: "55%", fontSize:"1.5em"}}>
                    <div className="content">
                        <div className="header">Experience</div>
                        <br/>
                        { data.map( exp => 
                            (adminView === true)
                                ?<div onClick={this.handleEdit} id="eduCard"  data-div_id={exp.experience_id}  style={{padding: "20px"}}>
                                        <div className="description">
                                                <h2>{exp.experience_details.title}</h2>
                                        </div>
                                        <div className ="description">
                                        {   exp.experience_details.company_name}
                                        </div>
                                        <div className="description">
                                            {exp.experience_details.location} 
                                        </div>
                                        <div className="description">
                                            {exp.experience_details.description} 
                                        </div>
                                        <div className="ui divider"></div>
                                </div>
                                :<div id="eduCard"  data-div_id={exp.experience_id}  style={{padding: "20px"}}>
                                        <div className="description">
                                                <h2>{exp.experience_details.title}</h2>
                                        </div>
                                        <div className ="description">
                                        {   exp.experience_details.company_name}
                                        </div>
                                        <div className="description">
                                            {exp.experience_details.location} 
                                        </div>
                                        <div className="description">
                                            {exp.experience_details.description} 
                                        </div>
                                        <div className="ui divider"></div>
                                </div>
                            ) }
                        </div>
                        {
                        (adminView === true)
                        ?<div  className="extra content">
                            <div onClick={this.setAddMode} className="ui bottom attached large button">
                                Add 
                            </div>
                        </div>
                        : null
                        }
                    </div>
                    </div>
                );  
            }else{
                return(
                    <div className="ui cards">
                        <div className="card" style={{width: "55%", fontSize:"1.5em"}}>
                            <div className="content">
                                <div className="header">Experience</div>
                                <div>No Experience Added!</div>
                            </div>
                            { (adminView === true)
                            ?<div className="extra content">
                                <div onClick={this.setAddMode} className="ui bottom attached large button">
                                    Add 
                                </div>
                            </div>
                            : null
                            }
                        </div>
                    </div>
                )
            }
        }

        renderEditView = () => {
            const {experienceInfo} = this.props
            return(
            <div className="ui cards">
                    <div className="card" style={{width: "55%", fontSize:"1.5em"}}>
                            <div className="content">
                                    <div className="header">Education</div>
                                    <br/>
                                    <div style={{padding: "20px"}}>
                                            <div className="description">
                                                    Title
                                            </div>
                                            <div className="ui input" style={{fontSize: "1em", width:"100%" }}>
                                                    <input type="text" name="title" defaultValue={experienceInfo.title || ''} onChange = { this.handleChange}/>
                                            </div>
                                            <div className="description">
                                                    Company Name
                                            </div>
                                            <div className="ui input" style={{fontSize: "1em", width:"100%" }}>
                                                    <input type="text" name="company_name" value={this.state.company_name || ''} onChange = { this.handleChange}/>
                                            </div>
                                            <div className ="description">
                                                    Location
                                            </div>
                                            <div className="ui input" style={{fontSize: "1em", width:"100%" }}>
                                                    <input type="text" name="location" value={this.state.location || ''} onChange = { this.handleChange}/>
                                            </div>
                                            <div className ="description">
                                                     Start and End Date
                                            </div>
                                            <div className="ui input" style={{fontSize: "1em", width:"100%" }}>
                                                    <input type="text" name="joined_date" value={this.state.joined_date || ''} onChange = { this.handleChange}/>
                                            </div>
                                            <div className="description">
                                                   Description
                                            </div>
                                            <div className="ui input" style={{fontSize: "1em", width:"100%" }}>
                                                    <input type="text" name="description" value={this.state.description || ''} onChange = { this.handleChange}/>
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

        renderAddExperience = () => {
            console.log("in render add exper!!!");
            return(
                <div className="ui cards">
                <div className="card" style={{width: "55%", fontSize:"1.3em"}}>
                <div className="header" style={{padding: "10px"}}> Add Experience</div>
                <form className="ui form" style={{padding:"20px"}}>
                        <div className="description">
                                Title
                        </div>
                        <div className="ui input" style={{fontSize: "1em", width:"100%" }}>
                                <input type="text" name="title"  onChange = { this.handleChange}/>
                        </div>
                        <div className="description">
                                Company Name
                        </div>
                        <div className="ui input" style={{fontSize: "1em", width:"100%" }}>
                                <input type="text" name="company_name" onChange = { this.handleChange}/>
                        </div>
                        <div className ="description">
                                Location
                        </div>
                        <div className="ui input" style={{fontSize: "1em", width:"100%" }}>
                                <input type="text" name="location"  onChange = { this.handleChange}/>
                        </div>
                        <div className ="description">
                                    Start and End Date
                        </div>
                        <div className="ui input" style={{fontSize: "1em", width:"100%" }}>
                                <input type="text" name="joined_date"  onChange = { this.handleChange}/>
                        </div>
                        <div className="description">
                                Description
                        </div>
                        <div className="ui input" style={{fontSize: "1em", width:"100%" }}>
                                <input type="text" name="description" onChange = { this.handleChange}/>
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
                        this.renderAddExperience()
                    )
                }else{
                    return(
                        this.state.editMode ? this.renderEditView() : this.renderViewMode()
                    )
                }
            }
            else{
                return(
                    <Redirect to="/login"/>
                )
            }
     }
}

ExperienceCard.propTypes = {
addExperience: PropTypes.func.isRequired,
updateExperience: PropTypes.func.isRequired,
experienceInfo: PropTypes.array.isRequired,
fetchExperience: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
isLogin: state.Handshake_User_Info.isLogin
})

export default connect(mapStateToProps, {fetchExperience, addExperience, updateExperience})(ExperienceCard);