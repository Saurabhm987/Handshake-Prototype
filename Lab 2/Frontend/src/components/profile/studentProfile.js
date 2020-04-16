import React, {Component} from 'react';
import UserInfoCard from '../cards/userInfoCard';
import ExperienceCard from '../cards/experienceCard';
import EducationCard from '../cards/educationCard';
import SummaryCard from '../cards/summaryCard';
import InterestCard from '../cards/interestCard';
import SkillCard from '../cards/skillCard'
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import { parseToken } from '../auth/parseToken';
import { connect } from 'react-redux';
import {fetchStudent} from '../../actions/fetchAction'
import PropTypes from 'prop-types'
import {fetchStudentProfile, fetchEducation, fetchExperience} from '../../actions/fetchAction'

class StudentProfile extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLogin: true,
            adminView: true,
            email:""
        }
    }

    componentDidMount(){
        const accessString = localStorage.getItem('JWT');
        if(accessString === null){
            this.setState({
                isLogin: false
            })
            this.props.history.push("/login");
            console.log("token is null!....Please Login Again......");
        }
        const token = parseToken(accessString)
        const {email} = queryString.parse(this.props.location.search);
        this.setState({
            email: email
        })
        if(token.id !== email){
            this.setState({
                adminView: false
            });
        }
        this.props.fetchStudentProfile(accessString, email)
        this.props.fetchEducation(accessString, email)
        this.props.fetchExperience(accessString, email)
    }

    render(){
        const {adminView, email} = this.state
        const {profileInfo, educationInfo, experienceInfo} = this.props
        console.log("experiencInfoProps: ", experienceInfo)
        if(this.state.isLogin === true){
        return(
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="ui special cards" style={{marginLeft: "50%", paddingTop:"15%"}}>
                            <UserInfoCard adminView={adminView} email={email} profileInfo={profileInfo}/>
                        </div>
                        <div className="ui cards" style={{marginLeft: "50%"}}>
                            <InterestCard  adminView={adminView}/>
                        </div>
                        <div className="ui cards" style={{marginLeft: "50%"}}>
                            <SkillCard  adminView={adminView}/>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div style={{marginTop: "7%"}}>
                            <SummaryCard  adminView={adminView} email={email}/>
                        </div>
                        <div>
                            <EducationCard adminView={adminView} educationInfo={educationInfo} email={email}/>
                        </div>
                        <div>
                            <ExperienceCard adminView={adminView} experienceInfo={experienceInfo} email={email}/>
                        </div>
                    </div>
                </div>
            </div>
        );  
    }else if(this.state.isLogin === false){
        return(
            <Redirect to = "/login"/>
        )
    }
    }
}

StudentProfile.propTypes = {
    fetchStudent : PropTypes.func.isRequired,
    studentDetails : PropTypes.array.isRequired,
    fetchEducation: PropTypes.func.isRequired,
    educationInfo: PropTypes.array.isRequired,
    fetchStudentProfile: PropTypes.func.isRequired,
    profileInfo:PropTypes.object.isRequired,
    fetchExperience: PropTypes.func.isRequired,
    experienceInfo:PropTypes.array.isRequired
  }
  
  const mapStateToProps = state => ({
    studentDetails : state.Handshake_User_Info.studentDetails,
    educationInfo: state.Handshake_User_Info.educationInfo,
    profileInfo: state.Handshake_User_Info.profileInfo,
    experienceInfo: state.Handshake_User_Info.experienceInfo,
  })
  
  export default connect(mapStateToProps, {fetchStudent,fetchStudentProfile, fetchEducation, fetchExperience})(StudentProfile)
