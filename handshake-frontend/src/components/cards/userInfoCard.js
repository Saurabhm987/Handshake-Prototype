import React, {Component} from 'react';
import img from './profile.jpg';
import axios from 'axios';
import {Route, withRouter, Redirect} from 'react-router-dom';
// import userProfile from '../profile/userProfile';

 class UserInfoCard extends Component {
    constructor(props){
        super(props);

        this.state = {
            editMode: false,
            student_name: "",
            student_college_name: "",
            degree:"",
            major: "",
            gpa: "",
            grad_date: "",
            details: "LOGIN", 
            reload: false,
            isLogin: true,
            userInfo: "",
            token: ""
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveInfo = this.saveInfo.bind(this);

    }    

    handleSubmit = () => {
        this.setState({
            editMode: !this.state.editMode
        })
    }

    handleChange = (e) => {
        this.setState ({
            [e.target.name]: e.target.value
        });
    }

    componentDidUpdate(){
        
    }

    componentDidMount(){

        const accessString = localStorage.getItem('JWT');

        if(accessString === null){
            this.setState({
                isLogin: false
            })
            console.log("token is null!");
        }

        this.setState({
            token: accessString
        })

        axios.get("http://localhost:3001/profileStudent/userInfo", { 
            headers: {
                Authorization: `JWT ${accessString}`
            }
        } ).then(response => {
                if(response.status === 200){
                    this.setState({
                        userInfo: response.data
                    })
                    console.log("UserInfoCard_RESPONSE_DATA", this.state.userInfo);

                }else{
                    console.log("ERROR");
                }
            })
    }

    saveInfo = (e) => {
        e.preventDefault(); 

        const userInfo = {
            student_name: this.state.student_name,
            student_college_name: this.state.student_college_name,
            degree:this.state.degree,
            major: this.state.major,
            gpa: this.state.gpa,
            grad_date: this.state.grad_date,
            details: this.state.details
        }
        
        if(this.state.student_name === ""){
                userInfo.student_name = this.state.name;
        }

        if(this.state.student_college_name === ""){
            userInfo.student_college_name = this.state.col_name;
        }

        if(this.state.degree === ""){
                userInfo.degree = this.state.degree;
        }

        if(this.state.major === ""){
            userInfo.major = this.state.major;
         }

        if(this.state.gpa === ""){
        userInfo.gpa = this.state.gpa;
        }

        if(this.state.grad_date === ""){
            userInfo.grad_date = this.state.grad_date;
        }

        console.log("userInfo: ", userInfo);


        const headers = {
            Authorization: `JWT ${this.state.token}`
        }

        axios.put("http://localhost:3001/updateUserProfile", {
            params: {
                requestInfo: "LOGIN",
                data: userInfo
            }
        }, {
            headers: headers
        })
             .then( response => {
                if(response.status === 200){
                    console.log("RESPONSE: ", response.data);
                    window.location.reload(false);
                    this.setState({
                        editMode: !this.state.editMode,
                        reload: true
                    })
                }else{
                    console.log("BAD_REQUEST");
                }
            })
    }


    renderEditView = () => {
        
        return(
        <div class="ui card">
                <div class="image" style={{overflow:"hidden"}}>
                    <img src={img}/>
                </div>
                    <div class="content">
                    <div class="header">Edit your name</div>
                    <div class="ui input">
                        <input type="text" name="student_name" defaultValue={this.state.name} onChange = { this.handleChange}/>
                    </div>
                    <div class="description">Edit your university name</div>
                    <div class="ui input">
                        <input type="text" name="student_college_name" defaultValue={this.state.col_name} onChange = { this.handleChange}/>
                    </div>
                    <div className="description">Degree</div>
                    <div class="ui input">
                        <input type="text" name="degree" defaultValue={this.state.degree} onChange = { this.handleChange}/>
                    </div>
                    <div className="description">Major</div>
                    <div class="ui input">
                        <input type="text" name="major" defaultValue={this.state.major} onChange = { this.handleChange}/>
                    </div>
                    <div class="description">Graduation Year</div>
                    <div class="ui input">
                        <input type="number" name="grad_date"defaultValue={this.state.grad_date} onChange = { this.handleChange}/>
                    </div>
                    <div class="description">GPA</div>
                    <div class="ui input">
                        <input type="text"name="gpa"  defaultValue={this.state.gpa} onChange = { this.handleChange}/>
                    </div>
                </div>
                <div class="extra content">
                    <div  onClick= {this.saveInfo }className="ui bottom attached center medium button">
                                <i class="edit icon"></i>
                                    Save 
                    </div>
                </div>
            </div>
        )
    }

    renderViewMode = () => {
        console.log("renderViewMode: ", this.state);
        return(
            <div class="ui card">
                <div class="image" style={{overflow:"hidden"}}>
                    <img src={img}/>
                </div>
                    <div class="content">
                    <div class="header">{this.state.userInfo.student_name}</div>
                    <div class="description">{this.state.userInfo.student_col_name}</div>
                    <div className="description">{this.state.userInfo.degree} {this.state.userInfo.major}</div>
                    <div class="description">Graduates {this.state.userInfo.grad_date}</div>
                    <div class="description">GPA: {this.state.userInfo.gpa}</div>
                </div>
                <div class="extra content">
                    <div onClick= {this.handleSubmit} className="ui bottom attached center medium button">
                                <i class="edit icon"></i>
                                    Edit 
                    </div>
                </div>
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
                <Redirect to="/"/>
            )
        }
    }
}

export default withRouter(UserInfoCard);