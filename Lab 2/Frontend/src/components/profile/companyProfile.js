import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import CompanyInfoCard from '../cards/companyInfoCard';
import CompanyDescriptionCard from '../cards/companyDescriptionCard';
import CompanyPostedJobCard from '../cards/companyPostedJobCard';
import {fetchCompanyProfile} from '../../actions/fetchAction'
import {connect} from 'react-redux'
import {parseToken} from '../auth/parseToken'
import PropTypes from 'prop-types'
import queryString from 'query-string';

class CompanyProfile extends Component {
    constructor(props){
        super(props);

        this.state = {
            summaryProps: "",
            eduInfo: "",
            expInfo: "",
            isLogin: true,
            email: "",
            adminView: true,
        }
    }

    componentDidMount(){

        const accessString = localStorage.getItem('JWT')
        console.log("acccccccccccccccccc- ", accessString)
        if(accessString === undefined && accessString === "null"){
            console.log('calling thissssssssssssssssssssssssss')
            this.props.history.push('/companyLogin')
            this.setState({
                isLogin: false
            });
        }else{

                const token = parseToken(accessString)
                const {email} = queryString.parse(this.props.location.search);
                this.setState({
                    email: email
                });

                if(token.id !== email){
                    this.setState({
                        adminView: false
                    });
                }
                this.props.fetchCompanyProfile(accessString, email )
        }
    }

    render(){

        const {profile_pic} = this.props.companyDetails
        if(this.props.companyDetails){
            var companyDetails = this.props.companyDetails
            if(this.props.companyDetails.description){
                var {description} = this.props.companyDetails
            }else{
                description = ""
            }
        }else{
            companyDetails = {}
        }

        if(this.state.isLogin === true){
            
        const {companyDetails} = this.props
        const {email, adminView } = this.state
        const {description} = companyDetails
        console.log('description : ', description)  
        console.log('--------------------adminView ------------------- ', adminView)
        
        return(
            <div className="container">
                <div className="row" style={{marginTop: "5%"}}>
                    <div className="col-md-6">
                        <div className="ui special cards" >
                            <CompanyInfoCard companyDetails={companyDetails} email={email} adminView={adminView}/>
                        </div>
                        <div className="ui special cards">
                            <CompanyDescriptionCard description={description} email={email} adminView={adminView}/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <CompanyPostedJobCard adminView={adminView} email={email}/>
                    </div>
                </div>
            </div>
        );  
    }else if(this.state.isLogin === false){
        return(
            <Redirect to = "/companyLogin"/>
        )
    }
    }
}

CompanyProfile.propTypes = {
    token: PropTypes.string.isRequired,
    companyDetails: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    token: state.Handshake_User_Info.token,
    companyDetails: state.Handshake_User_Info.companyDetails
})

export default connect(mapStateToProps, {fetchCompanyProfile})(CompanyProfile)