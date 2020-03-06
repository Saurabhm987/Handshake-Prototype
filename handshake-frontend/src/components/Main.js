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

class Main extends Component {
    render() {
        return(
            <div>
                {/* <Route path="/" component={Navbar} /> */}
                <Route path="/" component = {Header}/>
                <Route path="/home" component = {Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component ={Register}/>
                <Route path="/jobPost" component={JobPost} />
                <Route path="/companyReg" component={CompanyReg}/>
                <Route path="/companyLogin" component={CompanyLogin}/>
                <Route path="/jobBoard" component={JobBoard}/>
                <Route path="/studentProfile" component={StudentProfile} />
                <Route path="/companyProfile" component={CompanyProfile} />
            </div>
        );
    }
}

export default Main;