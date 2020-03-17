import React, {Component} from 'react';
import axios from 'axios';
import {withRouter, Redirect} from 'react-router-dom';
import {API_ENDPOINT} from '../controller/endpoint';

 class CompanyInfoCard extends Component {
    constructor(props){
        super(props);

        this.state = {
            editMode: false,
            company_name: "",
            company_loc: "",
            company_contact: "",
            isLogin: true,
            userInfo: {},
            token: "",
            file: null,
            img: "", 
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

    handleEdit = (e) => {
        e.preventDefault();
        this.setState({
            editMode: !this.state.editMode,
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

        event.preventDefault();
        let formData = new FormData();
        formData.append('file', this.state.file);

        this.instance.post("/uploadCmpProfPic", formData, 
         {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `JWT ${this.state.token}`
          }
        }).then(response => {
          console.log("file successfully upladed!");
          this.setState({
              isLogin: true,
              editMode: !this.state.editMode
          })
        }).catch(error => {
          console.log("error_rate: ", error);
        });
    }

    }

    componentDidMount(){

        console.log("Company_INFO_CMPDID");
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

         this.instance.get("/profileCompany/companyInfo", { 
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
                        company_name : data.company_name,
                        company_loc: data.company_loc,
                        company_contact: data.company_contact,
                        img: data.profile_pic
                    })

                    console.log("company_InfoCard_RESPONSE_DATA", data);

                }else{
                    console.log("ERROR");
                }
            })
    }

    handleSave = (e) => {
        console.log("handle Save cmp info card!");
        e.preventDefault(); 

        const companyInfo = {
            company_loc: this.state.company_loc,
            company_contact:this.state.company_contact,
        }
        const headers = {
            Authorization: `JWT ${this.state.token}`
        }

        this.instance.post("/updateCompanyProfile", {
            params: {
                requestInfo: "LOGIN",
                data: companyInfo
            }
        }, {
            headers: headers
        })
             .then( response => {
                if(response.status === 200){
                    console.log("RESPONSE: ", response.data);
                    this.setState({
                        editMode: !this.state.editMode,
                    })
                }else{
                    console.log("BAD_REQUEST");
                }
            })
    }


    renderEditView = () => {
        return(

        
            <div class="ui card" style={{width: "80%"}}>
                <form class="image" style={{overflow:"hidden"}} onSubmit={this.handleFormSubmit}>
                    <img src={this.state.img}/>
                    <input type="file" name="file" onChange ={this.handleFileUpload} />
                    <button type="submit">upload</button>
                </form>
                    <div class="content">
                    <div class="description">Company Loc</div>
                    <div class="ui input">
                        <input type="text" name="company_loc" value={this.state.company_loc || ''} onChange = { this.handleChange}/>
                    </div>
                    <div className="description">Contact</div>
                    <div class="ui input">
                        <input type="text" name="company_contact" value={this.state.company_contact || ''} onChange = { this.handleChange}/>
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
         
                    <div class="ui card"  style={{width: "80%"}}>
                            <div className="image">
                                    <img src= {this.state.img} style={{width:"443px", height:"300px"}}/>
                            </div>
                            <div class="content">
                                    <div class="header"><h1><b>{this.state.company_name}</b></h1></div>
                                    <div class="description"><h2>{this.state.company_loc}</h2></div>
                                    <div className="description"><h3>{this.state.company_contact}</h3></div>
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
                <Redirect to="/companyLogin"/>
            )
        }
    }
}

export default withRouter(CompanyInfoCard);