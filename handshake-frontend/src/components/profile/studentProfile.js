import React, {Component} from 'react';
import UserInfoCard from '../cards/userInfoCard';
import ExperienceCard from '../cards/experienceCard';
import EducationCard from '../cards/educationCard';
import SummaryCard from '../cards/summaryCard';
import InterestCard from '../cards/interestCard';
import { Redirect } from 'react-router-dom';

export default class StudentProfile extends Component {

    constructor(props){
        super(props);

        this.state = {
            isLogin: true
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
    }

    render(){
        const infoProps = this.state.userInfo;

        if(this.state.isLogin === true){

        return(
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <div class="ui special cards" style={{marginLeft: "50%", paddingTop:"15%"}}>
                            <UserInfoCard />
                        </div>
                        <div class="ui cards" style={{marginLeft: "50%"}}>
                            <InterestCard infoProps={infoProps} />
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div style={{marginTop: "7%"}}>
                            <SummaryCard  />
                        </div>
                        <div>
                            <EducationCard />
                        </div>
                        <div>
                            <ExperienceCard />
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
