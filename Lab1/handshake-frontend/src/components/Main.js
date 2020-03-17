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
import Applications from './cards/applicationCard';
import EventBoard from './eventBoard/eventBoard';
import EventPost from './admin/eventPost';
import CompanyPostedJobCard from './cards/companyPostedJobCard';
import AppliedEvent from './eventBoard/appliedEvent';
import CompanyPostedEventCard from "./cards/companyPostedEventCard";
import DetailsCard from './cards/detailsCard';
import StudentsCard from './cards/studentsCard';
import JobAppliedStudent from './cards/jobAppliedStudentCard';
import EventAppliedStudents from './cards/eventAppliedStudentCard';

class Main extends Component {
    render() {
        return(
            <div>
                {/* <Route path="/" component={Navbar} /> */}
                <Route  path="/" component = {Header}/>
                <Route exact path="/home" component = {Home}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component ={Register}/>
                <Route exact path="/jobPost" component={JobPost} />
                <Route exact path="/eventPost" component={EventPost} />
                <Route exact path="/companyReg" component={CompanyReg}/>
                <Route exact path="/companyLogin"exact  component={CompanyLogin}/>
                <Route exact path="/jobBoard" component={JobBoard}/>
                <Route exact path="/eventBoard" component={EventBoard} />
                <Route exact path="/studentProfile" component={StudentProfile} />
                <Route exact path="/studentAppliedJob" component={Applications} />
                <Route exact path="/appliedEvents" component={AppliedEvent} />
                <Route exact path="/companyPostedJobCard" component={CompanyPostedJobCard} />
                <Route exact path="/companyPostedEventCard" component={CompanyPostedEventCard} />
                <Route exact path="/companyProfile" component={CompanyProfile} />
                <Route exact path="/details" component={DetailsCard} />
                <Route exact path="/students" component={StudentsCard} />
                <Route exact path="/jobAppliedStudent" component={JobAppliedStudent} />
                <Route exact path="/eventAppliedStudent" component={EventAppliedStudents} />

            </div>
        );
    }
}

export default Main;