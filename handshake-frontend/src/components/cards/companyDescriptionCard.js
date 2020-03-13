import React, {Component} from 'react';
import axios from 'axios';
import {withRouter, Redirect} from 'react-router-dom';
import {API_ENDPOINT} from '../controller/endpoint';

 class CompanyDescriptionCard extends Component {
    constructor(props){
        super(props);

        this.state = {
            editMode: false,
            company_descr:"",
            isLogin: true,
            token: "",
        }

        this.instance = axios.create({
            baseURL: API_ENDPOINT,
            timeout: 1000,
          });

        this.handleEdit = this.handleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
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

    componentDidMount(){
        console.log("Company_description_CMPDID");

        const accessString = localStorage.getItem('JWT');
        if(accessString === null){
            this.setState({
                isLogin: false
            })
            alert("No token provided! You are being logged out!");
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

                    let data = response.data

                    this.setState({
                        company_descr : data.company_descr,
                    })
                }else{
                    console.log("ERROR");
                }
            })
    }

    handleSave = (e) => {
        console.log("handle Save!");
        e.preventDefault(); 

        const companyDescr = {
            company_descr: this.state.company_descr
        }

        console.log("userInfo: ", companyDescr);

        const headers = {
            Authorization: `JWT ${this.state.token}`
        }

        this.instance.post("/updateCompanyProfile", {
            params: {
                requestInfo: "DESCR",
                data: companyDescr
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

     
            <div className="ui card" style={{width: "80%"}}>
                <div class="content">
                        <div class="description">Description</div>
                        <div class="ui input">
                            <textarea type="text" name="company_descr" value={this.state.company_descr || ''} onChange = { this.handleChange} />
                        </div>
                </div>
                <div class="extra content">
                        <div onClick= {this.handleSave} className="ui bottom attached center medium button">
                                <i class="edit icon"></i>
                                    Save 
                        </div>
                </div>
            </div>
        )
    }

    renderViewMode = () => {
        return(

            
                <div class="ui card" style={{width: "80%"}}>
                    <div class="content">
                                <div class="header"><h3><b>Description</b></h3></div>
                                <br/>
                                <div class="paragraph"><h4>{this.state.company_descr}</h4></div>
                    </div>
                    <div class="extra content">
                        <div onClick= {this.handleEdit} data-descriptionEdit = "descriptionEdit" className="ui bottom attached center medium button">
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

export default withRouter(CompanyDescriptionCard);