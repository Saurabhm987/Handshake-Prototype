import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import ButtonAppBar from "./Home/home";
import Profaccess from "./Home/profaccess"
import Home from "./Home/home"
import CompanyReg from "./auth/companyReg";
import CompanyLogin from "./auth/companyLogin";


class Main extends Component {
    render() {
        return(
            <div>
                {/* <Route path="/" component={Navbar} /> */}
                <Route path="/home" component = {Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component ={Register}/>
                <Route path="/profaccess" component={Profaccess}/>
                <Route path="/companyRegister" component={CompanyReg}/>
                <Route path="/companyLogin" component={CompanyLogin}/>
                {/* <Route path="/home" component={ButtonAppBar}/> */}
            </div>
        );
    }
}

export default Main;