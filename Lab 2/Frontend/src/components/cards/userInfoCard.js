import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {fetchStudentProfile} from '../../actions/fetchAction';
import {updateStudentProfile} from '../../actions/updateAction'
import queryString from 'query-string';
import {API_ENDPOINT} from '../controller/endpoint';

 class UserInfoCard extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: "",
            college: "",
            degree:"",
            major: "",
            gpa: "",
            grad_date: "",
            token: "",
            img: "",
            message: "",
            userInfo: {},
            editMode: false,
            isLogin: true,
            file: null
        }

        this.instance = axios.create({
            baseURL: API_ENDPOINT,
            timeout: 1000,
          });
        
        this.handleEdit = this.handleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
    }    

    handleEdit = () => {
        this.setState({
            editMode: !this.state.editMode
        })
    }

    handleCancel = (e) => {
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

    handleFileUpload = (event) => {
        this.setState({file: event.target.files[0]});
      }

    handleFormSubmit = (event) => {
        if(this.state.file === null){
            alert("please add file");
        }else{

        this.setState ({
            editMode: !this.state.editMode
        })

        event.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.file);

        this.instance.post("/uploadFile", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `JWT ${this.state.token}`
          }
        }).then(response => {
          console.log("file successfully upladed!");
          this.setState({
              isLogin: true
          })
        }).catch(error => {
            console.log("error: ", error)
        });
        }
    }

    componentDidMount(){
        const accessString = localStorage.getItem('JWT');
        if(accessString === null){
            this.setState({
                isLogin: false
            })
            console.log("token is null!");
            this.props.history.push('login');
        }
        this.setState({
            token: accessString
        })
    }

    handleSave = (e) => {
        console.log("handle Save!");
        e.preventDefault(); 

        const userInfo = {
            name: this.state.name,
            college: this.state.college,
            degree:this.state.degree,
            major: this.state.major,
            gpa: this.state.gpa,
            grad_date: this.state.grad_date,
        }

        console.log("userInfo: ", userInfo);
        this.props.updateStudentProfile(userInfo, this.state.token);
        this.setState({
            editMode: !this.state.editMode
        })
    }

    renderEditView = () => {
        console.log("renderEditView")
        console.log("this.props.profileInfo: ", this.props.profileInfo)
        const {name, college, degree,major, grad_date, gpa} = this.props.profileInfo

        return(
        <div className="ui card">
                <form className="image" style={{overflow:"hidden"}} onSubmit={this.handleFormSubmit}>
                    <img src={this.state.img}/>
                    <input type="file" name="demo_file" onChange ={this.handleFileUpload} />
                    <button type="submit">upload</button>
                </form>
                    <div className="content">
                    <div className="header">Edit your name</div>
                    <div className="ui input">
                        <input type="text" name="name" defaultValue = {name} onChange = { this.handleChange}/>
                    </div>
                    <div className="description">Edit your university name</div>
                    <div className="ui input">
                        <input type="text" name="college" defaultValue={college} onChange = { this.handleChange}/>
                    </div>
                    <div className="description">Degree</div>
                    <div className="ui input">
                        <input type="text" name="degree" defaultValue={degree} onChange = { this.handleChange}/>
                    </div>
                    <div className="description">Major</div>
                    <div className="ui input">
                        <input type="text" name="major" defaultValue={major} onChange = { this.handleChange}/>
                    </div>
                    <div className="description">Graduation Year</div>
                    <div className="ui input">
                        <input type="number" name="grad_date" defaultValue={grad_date} onChange = { this.handleChange}/>
                    </div>
                    <div className="description">GPA</div>
                    <div className="ui input">
                        <input type="text"name="gpa"  defaultValue={gpa || " "} onChange = { this.handleChange}/>
                    </div>
                </div>
                <div className="extra content">
                    <div  onClick= {this.handleSave } className="ui bottom attached center medium button" style={{width:"100px", float: "left"}}>
                                    Save 
                    </div>
                    <div onClick={this.handleCancel} className="ui bottom attached center medium button" style={{width:"100px", float:"right"}}>
                                    Cancel 
                    </div>
                </div>
            </div>
        )
    }

    renderViewMode = () => {
        console.log("renderViewMode!");
        // const {email} = queryString.parse(this.props.location.search)
        // console.log("query_email: ", email)
        const {name, college, degree,major, grad_date, gpa, profile_pic} = this.props.profileInfo
        console.log('profile_pic : ', profile_pic)
        return(
            <div className="ui card">
                    <div className="image">
                        <img src={`${API_ENDPOINT}/${profile_pic}`} alt=""/>
                    </div>
                    <div className="content">
                        <div className="header">{name}</div>
                        <div className="description">{college}</div>
                        <div className="description">{degree} {major}</div>
                        <div className="description">Graduates {grad_date}</div>
                        <div className="description">GPA: {gpa}</div>
                    </div>
                    {   
                        (this.props.adminView === true)
                        ? <div className="extra content">
                                <div onClick= {this.handleEdit} className="ui bottom attached center medium button">
                                            <i className="edit icon"></i>
                                                Edit 
                                </div>
                            </div>
                        : null
                    }
            </div>
        )
    }
    
    render(){
        if(this.state.isLogin === true){
            return (
                this.state.editMode ? this.renderEditView() : this.renderViewMode()
            )
        }else{
            return(
                <Redirect to="/login"/>
            )
        }
    }
}

UserInfoCard.propTypes = {
    updateStudentProfile:PropTypes.func.isRequired,
    message: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    message: state. Handshake_User_Info.message
})

export default connect(mapStateToProps, {updateStudentProfile})(UserInfoCard);