import React, {Component} from 'react';
// import img from './profile.jpg';
import axios from 'axios';
import {Route, withRouter, Redirect} from 'react-router-dom';
import {API_ENDPOINT} from '../controller/endpoint';


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
            reload: false,
            isLogin: true,
            userInfo: {},
            token: "",
            file: null,
            img: ""
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


    componentDidUpdate(){
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

        this.instance.post("/uploadnewFiles", formData, {
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
          // handle your error
        });
    }

    }

    componentDidMount(){

        console.log("USER_INFO_CMPDID");

        const accessString = localStorage.getItem('JWT');
        if(accessString === null){
            this.setState({
                isLogin: false
            })

            alert("No token provided! You are being logged out!");
            console.log("token is null!");
            this.props.history.push('/login');
        }

        this.setState({
            token: accessString
        })

         this.instance.get("/profileStudent/userInfo", { 
            headers: {
                Authorization: `JWT ${accessString}`
            }
        } ).then(response => {
                if(response.status === 200){
                    if(response.data === "jwt expired"){
                        alert("session expired! ");
                    }

                    const data = response.data;

                    this.setState({
                        student_name : data.student_name,
                        student_college_name: data.student_college_name,
                        col_name : data.col_name,
                        degree: data.degree,
                        grad_date: data.grad_date,
                        gpa: data.gpa,
                        major: data.major,
                        img: data.profile_pic
                    })
                    console.log("UserInfoCard_RESPONSE_DATA", data);

                }else{
                    console.log("ERROR");
                }
            })
    }

    handleSave = (e) => {

        console.log("handle Save!");

        e.preventDefault(); 

        const userInfo = {
            student_name: this.state.student_name,
            student_college_name: this.state.student_college_name,
            degree:this.state.degree,
            major: this.state.major,
            gpa: this.state.gpa,
            grad_date: this.state.grad_date,
        }

        console.log("userInfo: ", userInfo);

        const headers = {
            Authorization: `JWT ${this.state.token}`
        }

        this.instance.put("/updateUserProfile", {
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
                    // window.location.reload(false);
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
                <form class="image" style={{overflow:"hidden"}} onSubmit={this.handleFormSubmit}>
                    <img src={this.state.img}/>
                    <input type="file" name="demo_file" onChange ={this.handleFileUpload} />
                    <button type="submit">upload</button>
                </form>
                    <div class="content">
                    <div class="header">Edit your name</div>
                    <div class="ui input">
                        <input type="text" name="student_name" value = {this.state.student_name || ''} onChange = { this.handleChange}/>
                    </div>
                    <div class="description">Edit your university name</div>
                    <div class="ui input">
                        <input type="text" name="student_college_name" value={this.state.student_college_name || ''} onChange = { this.handleChange}/>
                    </div>
                    <div className="description">Degree</div>
                    <div class="ui input">
                        <input type="text" name="degree" value={this.state.degree || ''} onChange = { this.handleChange}/>
                    </div>
                    <div className="description">Major</div>
                    <div class="ui input">
                        <input type="text" name="major" value={this.state.major || ''} onChange = { this.handleChange}/>
                    </div>
                    <div class="description">Graduation Year</div>
                    <div class="ui input">
                        <input type="number" name="grad_date" value={this.state.grad_date || ''} onChange = { this.handleChange}/>
                    </div>
                    <div class="description">GPA</div>
                    <div class="ui input">
                        <input type="text"name="gpa"  value={this.state.gpa || " "} onChange = { this.handleChange}/>
                    </div>
                </div>
                <div class="extra content">
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
        console.log("renderViewMode: ", this.state);
        return(
            <div class="ui card">
                    <div className="image">
                            <img src={this.state.img}/>
                    </div>
                    <div class="content">
                    <div class="header">{this.state.student_name}</div>
                    <div class="description">{this.state.student_college_name}</div>
                    <div className="description">{this.state.degree} {this.state.major}</div>
                    <div class="description">Graduates {this.state.grad_date}</div>
                    <div class="description">GPA: {this.state.gpa}</div>
                </div>
                <div class="extra content">
                    <div onClick= {this.handleEdit} className="ui bottom attached center medium button">
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
                <Redirect to="/login"/>
            )
        }
    }
}

export default withRouter(UserInfoCard);