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
            expInfo:[],
            token:"",
            title:"",
            position:"",
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
            position: this.state.position,
            company_name:this.state.company_name,
            joined_date: this.state.joined_date,
            description: this.state.description,
        }

        console.log("expInfo: ", expInfo);
        this.props.addExperience(expInfo,this.state.token );
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
            position: this.state.position,
            company_name:this.state.company_name,
            joined_date: this.state.joined_date,
            description: this.state.description,
            _id: this.state._id
        }
        console.log("expInfo",expInfo)
        this.props.updateExperience(expInfo, this.state.token)
     }

    componentWillReceiveProps(nextProps){
        if(nextProps.experienceInfo){
            this.setState({
                expInfo: nextProps.experienceInfo
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
            token: accessString,
            isLogin: true
        })
        this.props.fetchExperience(accessString);
    }
    
    renderViewMode = () =>{
        let data = this.state.expInfo;
        console.log("exp_data: ", data);
        if(data !== undefined){
            return(
                    <div className="ui cards">
                    <div className="card" style={{width: "55%", fontSize:"1.5em"}}>
                    <div className="content">
                    <div className="header">Experience</div>
                    <br/>
                    { data.map( exp => 
                    <div onClick={this.handleEdit} id="eduCard"  data-div_id={exp.experience_id}  style={{padding: "20px"}}>
                            <div className="description">
                                    <h2>{exp.experience_details.title}</h2>
                            </div>
                            <div className ="description">
                            {   exp.experience_details.company_name}
                            </div>
                            <div className="description">
                                 {exp.experience_details.position} 
                            </div>
                            <div className="description">
                                 {exp.experience_details.joined_date} 
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
                                <div className="header">Experience</div>
                                <div>No Experience Added!</div>
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
                                                    Title
                                            </div>
                                            <div className="ui input" style={{fontSize: "0.5em", width:"350px" }}>
                                                    <input type="text" name="title" value={this.state.title || ''} onChange = { this.handleChange}/>
                                            </div>
                                            <div className="description">
                                                    Company Name
                                            </div>
                                            <div className="ui input" style={{fontSize: "0.5em", width:"350px" }}>
                                                    <input type="text" name="company_name" value={this.state.company_name || ''} onChange = { this.handleChange}/>
                                            </div>
                                            <div className ="description">
                                                    Position
                                            </div>
                                            <div className="ui input" style={{fontSize: "0.5em", width:"350px" }}>
                                                    <input type="text" name="position" value={this.state.position || ''} onChange = { this.handleChange}/>
                                            </div>
                                            <div className ="description">
                                                     Start and End Date
                                            </div>
                                            <div className="ui input" style={{fontSize: "0.5em", width:"350px" }}>
                                                    <input type="text" name="joined_date" value={this.state.joined_date || ''} onChange = { this.handleChange}/>
                                            </div>
                                            <div className="description">
                                                   Description
                                            </div>
                                            <div className="ui input" style={{fontSize: "0.5em", width:"350px" }}>
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
                        <div className="ui input" style={{fontSize: "0.5em", width:"350px" }}>
                                <input type="text" name="title"  onChange = { this.handleChange}/>
                        </div>
                        <div className="description">
                                Company Name
                        </div>
                        <div className="ui input" style={{fontSize: "0.5em", width:"350px" }}>
                                <input type="text" name="company_name" onChange = { this.handleChange}/>
                        </div>
                        <div className ="description">
                                Position
                        </div>
                        <div className="ui input" style={{fontSize: "0.5em", width:"350px" }}>
                                <input type="text" name="position"  onChange = { this.handleChange}/>
                        </div>
                        <div className ="description">
                                    Start and End Date
                        </div>
                        <div className="ui input" style={{fontSize: "0.5em", width:"350px" }}>
                                <input type="text" name="joined_date"  onChange = { this.handleChange}/>
                        </div>
                        <div className="description">
                                Description
                        </div>
                        <div className="ui input" style={{fontSize: "0.5em", width:"350px" }}>
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
fetchExperience: PropTypes.func.isRequired,
addExperience: PropTypes.func.isRequired,
updateExperience: PropTypes.func.isRequired,
experienceInfo: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
experienceInfo: state.Handshake_User_Info.experienceInfo,
isLogin: state.Handshake_User_Info.isLogin
})

export default connect(mapStateToProps, {fetchExperience, addExperience, updateExperience})(ExperienceCard);