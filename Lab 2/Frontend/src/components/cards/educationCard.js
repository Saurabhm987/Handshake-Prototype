import React, {Component} from 'react';
import axios from 'axios';
import {Route, withRouter, Redirect} from 'react-router-dom';
import {API_ENDPOINT} from '../controller/endpoint';


export default class EducationCard extends Component {
    constructor(props){
        super(props);

        this.state = {
            token: "", 
            isLogin: true,
            eduInfo: [],
            editMode: false,
            student_college_name:"",
            student_college_location:"",
            student_college_degree: "",
            student_college_major:"",
            student_college_gpa:"",
            student_college_yop:"",
            student_education_id:"",
            addMode:false, 
            reload: true
        }

        this.instance = axios.create({
            baseURL: API_ENDPOINT,
            timeout: 1000,
          });
          

        this.handleEdit = this.handleEdit.bind(this);
        this.handleCancel= this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleCancelAdd = this.handleCancelAdd.bind(this);

    }

    handleCancelAdd = (e) =>{
        this.setState({
            addMode: false
        })
    }

    handleEdit = (e) => {
        this.setState({
            editMode: !this.state.editMode,
            student_education_id: e.currentTarget.dataset.div_id
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

    

    handleAdd = (e) => {
        console.log("adding college");
        console.log(" handling route!")
        e.preventDefault(); 

        this.setState({
            addMode: false
        })

        const userInfo = {
            student_college_name: this.state.student_college_name,
            student_college_location: this.state.student_college_location,
            student_college_degree:this.state.student_college_degree,
            student_college_major: this.state.student_college_major,
            student_college_gpa: this.state.student_college_gpa,
            student_college_yop: this.state.student_college_yop,
            student_education_id: this.state.student_education_id
        }

        console.log("data_from_inputForm:  ", userInfo);

        const headers = {
            Authorization: `JWT ${this.state.token}`
        }

        console.log("token recieved : ", this.state.token);

       this.instance.post("/addEduExp", {
            params: {
                requestInfo: "EDU",
                data: userInfo
            }
        }, {
            headers: headers
        })
             .then( response => {
                if(response.status === 200){
                    console.log("Added_response_data:  ", response.data);
                    alert("Updated!");
                    this.setState({
                        addMode: false,
                        reload: false
                    })
                }else{
                    console.log("BAD_REQUEST");
                }
            })
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

        const userInfo = {
            student_college_name: this.state.student_college_name,
            student_college_location: this.state.student_college_location,
            student_college_degree:this.state.student_college_degree,
            student_college_major: this.state.student_college_major,
            student_college_gpa: this.state.student_college_gpa,
            student_college_yop: this.state.student_college_yop,
            student_education_id: this.state.student_education_id
        }

        console.log("userInfo_educationCard: ", userInfo);

        const headers = {
            Authorization: `JWT ${this.state.token}`
        }

        await this.instance.put("/updateUserProfile", {
            params: {
                requestInfo: "EDU",
                data: userInfo
            }
        }, {
            headers: headers
        })
             .then( response => {
                if(response.status === 200){
                    console.log("RESPONSE: ", response.data);
                    alert("Updated!");
                    this.setState({
                        editMode: !this.state.editMode,
                    })
                }else{
                    console.log("BAD_REQUEST");
                }
            })
    }
    
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

        this.instance.get("/profileStudent/eduInfo", { 
            headers: {
                Authorization: `JWT ${accessString}`
            }
        } ).then(response => {
                if(response.status === 200){
                    if(response.data === "jwt expired"){
                        alert("session expired!");
                        this.props.history.push("/login");
                    }

                    
                    const data = response.data;
                    
                    this.setState({
                        student_college_name: data.student_college_name,
                        student_college_location: data.student_college_location,
                        student_college_degree:data.student_college_degree,
                        student_college_major: data.student_college_major,
                        student_college_gpa: data.student_college_gpa,
                        student_college_yop: data.student_college_yop,
                        student_education_id: data.student_education_id,
                        eduInfo: response.data,
                    })
                    // console.log("studentProfile_responseObj: ", response.data);
                    console.log("eudcationCard_res_info: ", data);
                }else{
                    console.log("ERROR");
                }
            })
    }


        renderViewMode = () =>{

            let data = this.state.eduInfo;

                return(
                        <div className="ui cards">
                        <div className="card" style={{width: "55%", fontSize:"1.5em"}}>
                        <div className="content">
                        <div className="header">Education</div>
                        <br/>
                        { data.map( edu => 
                        <div onClick={this.handleEdit} id="eduCard"  data-div_id={edu.student_education_id}  style={{padding: "20px"}}>
                                <div className="description">
                                        <h2>{edu.student_college_name}</h2>
                                </div>
                                <div className ="description">
                                {edu.student_college_degree} {edu.student_college_major} 
                                </div>
                                <div className="description">
                                        <h4>{edu.student_college_yop}</h4>
                                </div>
                                <div className="description">
                                       <h4> {edu.student_college_gpa}  </h4>
                                </div>
                                <div class="ui divider"></div>
                                
                        </div>
                            ) }
                            </div>
                            <div  className="extra content">
                                <div onClick={this.setAddMode} class="ui bottom attached large button">
                                    Add 
                                </div>
                            </div>
                        </div>
                        </div>
                    );  
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
                                                <div class="ui input" style={{fontSize: "0.5em", width:"350px" }}>
                                                        <input type="text" name="student_college_name" value={this.state.student_college_name || ''} onChange = { this.handleChange}/>
                                                </div>
                                                <div className="description">
                                                        College Location
                                                </div>
                                                <div class="ui input" style={{fontSize: "0.5em", width:"350px" }}>
                                                        <input type="text" name="student_college_location" value={this.state.student_college_location || ''} onChange = { this.handleChange}/>
                                                </div>
                                                <div className ="description">
                                                        Degree
                                                </div>
                                                <div class="ui input" style={{fontSize: "0.5em", width:"350px" }}>
                                                        <input type="text" name="student_college_degree" value={this.state.student_college_degree || ''} onChange = { this.handleChange}/>
                                                </div>
                                                <div className ="description">
                                                         Major
                                                </div>
                                                <div class="ui input" style={{fontSize: "0.5em", width:"350px" }}>
                                                        <input type="text" name="student_college_major" value={this.state.student_college_major || ''} onChange = { this.handleChange}/>
                                                </div>
                                                <div className="description">
                                                        Year of Passing
                                                </div>
                                                <div class="ui input" style={{fontSize: "0.5em", width:"350px" }}>
                                                        <input type="text" name="student_college_yop" value={this.state.student_college_yop || ''} onChange = { this.handleChange}/>
                                                </div>
                                                <div className="description">
                                                        GPA
                                                </div>
                                                <div class="ui input" style={{fontSize: "0.5em", width:"350px" }}>
                                                        <input type="text" name="student_college_gpa" value={this.state.student_college_gpa || ''} onChange = { this.handleChange}/>
                                                </div>
                                                <div class="extra content" style={{paddingTop:"10px"}}>
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
                return(
                    <div className="ui cards">
                    <div className="card" style={{width: "55%", fontSize:"1.3em"}}>
                    <div className="header" style={{padding: "10px"}}> Add Education</div>
                    <form class="ui form" style={{padding:"20px"}}>
                            <div class="field">
                                    <label>College Name</label>
                                    <input type="text" name="student_college_name"  onChange={this.handleChange}/>
                            </div>
                            <div class="field">
                                    <label>College Location</label>
                                    <input type="text" name="student_college_location" onChange={this.handleChange} />
                            </div>
                            <div class="field">
                                    <label>Degree</label>
                                    <input type="text" name="student_college_degree" onChange={this.handleChange}/>
                            </div>
                            <div class="field">
                                    <label>Major</label>
                                    <input type="text" name="student_college_major" onChange={this.handleChange} />
                            </div>
                            <div class="field">
                                    <label>Year of passing</label>
                                    <input type="text" name="student_college_yop" onChange={this.handleChange}/>
                            </div>
                            <div class="field">
                                    <label>GPA</label>
                                    <input type="text" name="student_college_gpa" onChange={this.handleChange}/>
                            </div>
                            <div class="extra content" style={{paddingBottom:"20px"}}>
                                                <div  onClick= {this.handleAdd } className="ui medium green button" style={{width:"100px", float:"left"}}>
                                                        Save 
                                                </div>
                                                <div onClick={this.handleCancelAdd} className="ui medium button" style={{width:"100px",float:"right"}}>
                                                            Cancel 
                                                </div>
                                </div>
                            {/* <button class="ui green button" type="submit" onClick={this.handleAdd}>Add</button>
                            <button class="ui green button" type="submit" onClick={this.handleCancelAdd}>Cancel</button> */}
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


{/* <span style={{color: "blue"}}><p className="card-text">What are you passionate about? What are you looking for on Handshake? What are your experiences or skills?</p></span> */}
