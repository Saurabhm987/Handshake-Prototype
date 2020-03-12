import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import CompanyInfoCard from '../cards/companyInfoCard';
import CompanyDescriptionCard from '../cards/companyDescriptionCard';
import CompanyPostedJobCard from '../cards/companyPostedJobCard';


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
            <div className="container">
                <div className="row" style={{marginTop: "5%"}}>
                    <div className="col-md-6">
                        <div class="ui special cards" >
                            <CompanyInfoCard />
                        </div>
                        <div class="ui special cards">
                            <CompanyDescriptionCard />
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
