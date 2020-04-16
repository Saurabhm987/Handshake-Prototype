import React, {Component} from 'react';
import axios from 'axios';
import {withRouter, Redirect} from 'react-router-dom';
import {API_ENDPOINT} from '../controller/endpoint';
import {updateProfileInfo} from '../../actions/updateAction';
import { connect } from 'react-redux';

 class CompanyInfoCard extends Component {
    constructor(props){
        super(props);

        this.state = {
            editMode: false,
            location: "",
            contact: "",
            isLogin: true,
            token: "",
            file: null,
        }

        this.handleChange = this.handleChange.bind(this)

        this.instance = axios.create({
            baseURL: API_ENDPOINT,
            timeout: 1000,
          });
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
            alert("Please selecte file");
        }else{

        event.preventDefault();
        let formData = new FormData();
        formData.append('file', this.state.file);

        this.instance.post("/uploadFile", formData, 
         {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `JWT ${this.state.token}`
          }
        }).then( () => {
          this.setState({
              isLogin: true,
              editMode: !this.state.editMode
          })
          alert('File Uploaded')
        }).catch(() => {
          alert('Error while uploading file!')
        });
    }
    }

    componentDidMount(){
        const accessString = localStorage.getItem('JWT');
        if(accessString === null){
            this.setState({
                isLogin: false
            })
            alert("Session Expired");
            this.props.history.push('/login');
        }
        this.setState({
            token: accessString
        })
    }

    handleSave = (e) => {
        e.preventDefault(); 
        const companyInfo = {
            location: this.state.location,
            contact:this.state.contact,
        }

        console.log('save data - ', companyInfo)

        const headers = {
            Authorization: `JWT ${this.state.token}`
        }
    
        this.props.updateProfileInfo(companyInfo, headers)

        this.setState({
        editMode: !this.state.editMode,
        })

        // this.instance.post("/updateCompanyProfile", {
        //     params: {
        //         requestInfo: "LOGIN",
        //         data: companyInfo
        //     }
        // }, {
        //     headers: headers
        // })
        //      .then( response => {
        //         if(response.status === 200){
        //             this.setState({
        //                 editMode: !this.state.editMode,
        //             })
        //         }else{
        //             console.log("BAD_REQUEST");
        //         }
        //     })
        //     .catch( error => {
        //         console.log('error : ', error)
        //     })
    }


    renderEditView = () => {
        const {location, contact} = this.props.companyDetails
        const profile_pic = ""

        return(
            <div className="ui card" style={{width: "80%"}}>
                <form className="image" style={{overflow:"hidden"}} onSubmit={this.handleFormSubmit}>
                    <img src= {`${API_ENDPOINT}/${profile_pic}`} alt=""/>
                    <input type="file" name="file" onChange ={this.handleFileUpload} />
                    <button type="submit">upload</button>
                </form> 
                    <div className="content">
                    <div className="description">Company Loc</div>
                    <div className="ui input">
                        <input type="text" name="location" defaultValue={location || ''} onChange = { this.handleChange}/>
                    </div>
                    <div className="description">Contact</div>
                    <div className="ui input">
                        <input type="text" name="contact" defaultValue={contact || ''} onChange = { this.handleChange}/>
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
        console.log("renderViewMode: ", this.state);
        const {name, location, contact, profile_pic} = this.props.companyDetails
        return(
                    <div className="ui card"  style={{width: "80%"}}>
                            <div className="image">
                                    <img src= {`${API_ENDPOINT}/${profile_pic}`} style={{width:"443px", height:"300px"}} alt=""/>
                            </div>
                            <div className="content">
                                    <div className="header"><h1><b>{name}</b></h1></div>
                                    <div className="description"><h2>{location}</h2></div>
                                    <div className="description"><h3>{contact}</h3></div>
                            </div>
                            <div className="extra content">
                                    <div onClick= {this.handleEdit} className="ui bottom attached center medium button">
                                                <i className="edit icon"></i>
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

export default connect(null, {updateProfileInfo})(CompanyInfoCard);