import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import CompanyInfoCard from '../cards/companyInfoCard';
import CompanyDescriptionCard from '../cards/companyDescriptionCard';
import CompanyPostedJobCard from '../cards/companyPostedJobCard';
import {fetchCompanyProfile} from '../../actions/fetchAction'
import {connect} from 'react-redux'
import {parseToken} from '../auth/parseToken'
import PropTypes from 'prop-types'

class CompanyProfile extends Component {
    constructor(props){
        super(props);

        this.state = {
            summaryProps: "",
            eduInfo: "",
            expInfo: "",
            isLogin: true,
            email: ""
        }
    }

    componentDidMount(){

        const token = localStorage.getItem('JWT')
        const data = parseToken(token)
        const email = data.id
        this.setState({
            email: email
        });
        this.props.fetchCompanyProfile(token, email )
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
        const {email } = this.state
        const {description} = companyDetails
        console.log('description : ', description)
        
        return(
            <div className="container">
                <div className="row" style={{marginTop: "5%"}}>
                    <div className="col-md-6">
                        <div className="ui special cards" >
                            <CompanyInfoCard companyDetails={companyDetails} email={email}/>
                        </div>
                        <div className="ui special cards">
                            <CompanyDescriptionCard description={description} email={email}/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div>
                            <h1>Posted Jobs</h1>
                        </div>
                            <CompanyPostedJobCard />
                    </div>
                </div>
            </div>
        );  
    }else if(this.state.isLogin === false){
        return(
            <Redirect to = "/"/>
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