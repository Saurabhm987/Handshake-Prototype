import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import Home from "./Home/home"
import CompanyReg from "./auth/companyReg";
import CompanyLogin from "./auth/companyLogin";
import Header from "./header/header";
import JobBoard from "./JobBoard/jobboard";
import StudentProfile from "./profile/studentProfile";
import JobPost from "./admin/jobpost";
import CompanyProfile from './profile/companyProfile';
import StudentAppliedJob from './profile/companyProfile';
import CompanyPostedJob from './profile/AppliedJob/companyPostedJob';

class Main extends Component {
    render() {
        return(
            <div>
                {/* <Route path="/" component={Navbar} /> */}
                <Route   path="/" component = {Header}/>
                <Route exact path="/home" component = {Home}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component ={Register}/>
                <Route exact path="/jobPost" component={JobPost} />
                <Route exact path="/companyReg" component={CompanyReg}/>
                <Route exact path="/companyLogin" component={CompanyLogin}/>
                <Route exact path="/jobBoard" component={JobBoard}/>
                <Route exact path="/studentProfile" component={StudentProfile} />
                <Route exact path="/studentAppliedJob" component={StudentAppliedJob} />
                <Route exact path="/companyPostedJob" component={CompanyPostedJob} />
                <Route exact path="/companyProfile" component={CompanyProfile} />
            </div>
        );
    }
}

export default Main;