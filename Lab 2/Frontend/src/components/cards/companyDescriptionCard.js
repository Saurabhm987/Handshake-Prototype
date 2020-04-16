import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {updateDescription} from '../../actions/updateAction'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import {parseToken} from '../auth/parseToken'

 class CompanyDescriptionCard extends Component {
    constructor(props){
        super(props);

        this.state = {
            editMode: false,
            description:"",
            isLogin: true,
            token: "",
            adminView: false, 
        }
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
        const accessString = localStorage.getItem('JWT');
        const token = parseToken(accessString)
        const email = this.props.email

        if(token.id !== email){
            this.setState({
                adminView: false
            });
        }else{
            this.setState({
                adminView: true
            });
        }

        this.setState({
            token: accessString
        })

    }

    handleSave = (e) => {
        e.preventDefault(); 

        const description = this.state.description
        const headers = {
            Authorization: `JWT ${this.state.token}`
        }
        const {email} = this.props
        this.props.updateDescription(email , headers, description)
        this.setState({
            editMode: !this.state.editMode,
        })
    }

    renderEditView = () => {
        const {description} = this.props

        return(
            <div className="ui card" style={{width: "80%"}}>
                <div className="content">
                        <div className="description">Description</div>
                        <div className="ui input">
                            <textarea type="text" name="description" defaultValue={description || ''} onChange = { this.handleChange} />
                        </div>
                </div>
                <div className="extra content">
                        <div onClick= {this.handleSave} className="ui bottom attached center medium button">
                                <i className="edit icon"></i>
                                    Save 
                        </div>
                </div>
            </div>
        )
    }

    renderViewMode = () => {

        console.log('cmpdescr - ', this.props.description)

        return(
                <div className="ui card" style={{width: "80%"}}>
                    <div className="content">
                                <div className="header"><h3><b>Description</b></h3></div>
                                <br/>
                                <div className="paragraph"><h4>{this.props.description}</h4></div>
                    </div>
                    <div className="extra content">
                        <div onClick= {this.handleEdit} data-descriptionEdit = "descriptionEdit" className="ui bottom attached center medium button">
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

CompanyDescriptionCard.propTypes = {
    updateDescription : PropTypes.func.isRequired,
}

export default connect(null, {updateDescription})(CompanyDescriptionCard);