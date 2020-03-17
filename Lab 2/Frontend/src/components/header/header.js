import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLogin : false,
            access:"",
            email:""
        }
        this.handleLogout = this.handleLogout.bind(this);
    };

    componentDidUpdate(){
    }

   async componentDidMount(){

        const accessString = localStorage.getItem('JWT');
        console.log("accessString: ",accessString);
        if(accessString === null || accessString === "undefined") {
            this.setState({
                isLogin: false
            })

            console.log("header_token: ", accessString);

        }else{

            const base64Url = accessString.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            const data = JSON.parse(window.atob(base64));
            console.log("parsed_token_data: ", data);
    
            await this.setState({
                access: data.access,
                email: data.id,
                isLogin: true
            })
        }
    }

    handleLogout = (e)=>{
        e.preventDefault();
        localStorage.removeItem('JWT');
        this.setState({
            isLogin: false
        }, ()=>{
            this.props.history.push("home");
        });
    }

    render(){

        let loginHome = (
                        <div class="ui inverted segment">
                            <div class="ui inverted secondary menu">
                                <a href="/login" class="item">
                                    Student Login
                                </a>
                                <a href="/companyLogin" class="item">
                                Employer Login
                                </a>
                                <a href="/companyReg" class="item">
                                Employer Registration
                                </a>
                                <a href="register" class="item">
                                Student Registration
                                </a>
                            </div>
                    </div>
             )


            let newStudent = (
                <div class="ui blue inverted menu" style={{padding:"10px"}}>
                    <Link to="/jobBoard" className="item">Jobs </Link>
                    <Link to="/eventBoard" className="item">Events</Link>
                    <Link to="/students" className="item">Students</Link>

                    <div class="right menu">
                        <div className="ui simple dropdown item">
                                {this.state.email}
                                <i class="dropdown icon"></i>
                                <div className=" menu">
                                    <Link to="/studentAppliedJob" className="item">Applications</Link>
                                    <Link to="/studentProfile" className="item">Profile</Link>
                                    <Link to="/appliedEvents" className="item">Registered Event</Link>
                                    <Link to="/login" className="item" onClick={this.handleLogout}>Logout</Link>
                                </div>
                        </div>
                    </div>
                 </div>
            )

            let newCompany = (
                
                <div class="ui blue inverted menu" style={{padding:"10px"}}>
                    <Link to="/companyPostedJobCard" className="item"> Posted Job </Link>                
                    <Link to="/companyPostedEventCard" className="item">Event Posted </Link>
                    <Link to="/jobAppliedStudent" className="item">Job Applied</Link>
                    <Link to="/eventAppliedStudent" className="item">Event Registered</Link>

                    <div class="right menu">
                        <div className="ui simple dropdown item">
                                {this.state.email}
                                <i class="dropdown icon"></i>
                                <div className=" menu">
                                    <Link to="/companyProfile" className="item">Profile</Link>
                                    <Link to="/jobPost" className="item" >Post Job</Link>
                                    <Link to="/eventPost" className="item" >Post Event</Link>
                                    <Link to="/companyLogin" className="item" onClick={this.handleLogout}>Logout</Link>
                                </div>
                        </div>
                    </div>
             </div>
            )

       const {isLogin, access} = this.state;    

        if(isLogin === false){
            return(
                <div>
                        {loginHome}
                 </div>
            )

        }else if(isLogin === true ){
            if( access === "student"){
                return (
                    <div>
                        {newStudent}
                    </div>
                )
            }else if(access === "company"){
                return(
                        <div>
                            {newCompany}
                        </div>
                )
            }else{
                return(
                <div>
                        {loginHome}
                 </div>
                 )
            }
        }
    }
}