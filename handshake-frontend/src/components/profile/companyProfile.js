import React, {Component} from 'react';
import UserInfoCard from '../cards/userInfoCard';
import ExperienceCard from '../cards/experienceCard';
import EducationCard from '../cards/educationCard';
import SummaryCard from '../cards/summaryCard';
import { Redirect } from 'react-router-dom';

export default class CompanyProfile extends Component {

    constructor(props){
        super(props);

        this.state = {
            summaryProps: "",
            eduInfo: "",
            expInfo: "",
            isLogin: true
        }
    }

    render(){
        if(this.state.isLogin === true){

        return(
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <div class="ui special cards" style={{marginLeft: "50%", paddingTop:"15%"}}>
                            <UserInfoCard />
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
    }else if(this.state.isLogin == false){
        return(
            <Redirect to = "/"/>
        )
    }
    }
}
