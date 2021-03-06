import React, {Component} from 'react';
import { Link , withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout, login} from '../../actions/loginAction';
import {search, fetchDashboard} from '../../actions/fetchAction';
import PropTypes from 'prop-types';
import {parseToken} from '../auth/parseToken';

class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLogin : false,
            access:"",
            email:"",
            searchText:"",
            token: "",
            job:"active item",
        }
        this.handleLogout = this.handleLogout.bind(this);
    };


    handleChange = (e) =>{
        e.preventDefault()

        if(!e.target.value){
            const{token} = this.state
            this.props.fetchDashboard(token)
        }

        this.setState({
            searchText: e.target.value
        })
    }

    handleSearch = () =>{
        console.log("search handling...");
        this.props.search(this.state.searchText, this.props.jobDetails);
    }

    componentWillReceiveProps(nextProps){
        const accessString = localStorage.getItem('JWT');
        if(accessString){
            var data = parseToken(accessString);
        }
        if(nextProps.isLogin){
                this.setState({
                    isLogin: nextProps.isLogin,
                    access: data.access,
                    email: data.id,
                })
        }
    }

   async componentDidMount(){
        const accessString = localStorage.getItem('JWT');
        if(accessString === null) {
            this.setState({
                isLogin: false
            })
        }else{
            const data = parseToken(accessString);
            console.log('token_data: ', data);
            await this.setState({
                access: data.access,
                email: data.id,
                isLogin: true,
                token: accessString
            })
        }
    }

    handleLogout = async (e)=>{
        e.preventDefault();
        this.setState({
            isLogin: false
        })
        console.log("calling logout action...");
        await this.props.logout()
        this.props.history.push("/home")
    }

    render(){
        let loginHome = (
                        <div className="ui inverted segment">
                            <div className="ui inverted secondary menu">
                                <a href="/login" className="item">
                                    Student Login
                                </a>
                                <a href="/companyLogin" className="item">
                                    Employer Login
                                </a>
                                <a href="/companyReg" className="item">
                                    Employer Registration
                                </a>
                                <a href="register" className="item">
                                    Student Registration
                                </a>
                            </div>
                    </div>
             )
             
            let StudentLogin = (
                <div className="ui secondary menu" style={{padding:"10px", marginLeft: "19.5%", marginRight:"20%"}}>
                    <div className="item">
                        <div className="ui action left icon input">
                            <i className="search icon"></i>
                            <input type="text" placeholder="Search" onChange={this.handleChange}/>
                            <button className="ui button" onClick={this.handleSearch}>Search</button>
                        </div>
                    </div>

                    <div className="right menu" >
                        <Link to="/jobBoard" className="item">Jobs </Link>
                        <Link to="/eventBoard" className="item">Events</Link>
                        <Link to={`/chat?name=${this.state.email}`} className="item">Messages</Link>
                        <Link to="/students" name="student" className="item">Students</Link>
                        <Link to="/companies" name="company" className="item">Companis</Link>

                        <div className="ui simple dropdown item">
                                {this.state.email}
                                <i className="dropdown icon"></i>
                                <div className=" menu">
                                    <Link to="/studentAppliedJob" className="item">Applications</Link>
                                    <Link to={`/studentProfile?email=${this.state.email}`} className="item">Profile</Link>
                                    <Link to="/appliedEvents" className="item">Registered Event</Link>
                                    <Link to="/login" className="item" onClick={this.handleLogout}>Logout</Link>
                                </div>
                        </div>
                    </div>
                 </div>
            )

            let newCompanyLogin=(

                <div className="ui secondary menu" style={{padding:"10px", marginLeft: "19.5%", marginRight:"20%"}}>
                <div className="item">
                    <div className="ui action left icon input">
                        <i className="search icon"></i>
                        <input type="text" placeholder="Search" />
                        <button className="ui button">Search</button>
                    </div>
                </div>
                <div className="right menu" >
                    <Link to={`/companyPostedJobCard?email=${this.state.email}`} className="item">Posted Job </Link>
                    <Link to="/companyPostedEventCard" className="item">Posted Events</Link>
                    <Link to={`/chat?name=${this.state.email}`} className="item">Messages</Link>
                    <Link to="/jobAppliedStudent" className="item">Job Applied</Link>
                    <Link to="/eventAppliedStudent" className="item">Event Registered</Link>
                    <Link to="/students" name="student" className="item">Students</Link>
                    <Link to="/companies" name="company" className="item">Companis</Link>
                    <div className="ui simple dropdown item">
                            {this.state.email}
                            <i className="dropdown icon"></i>
                            <div className=" menu">
                            <Link to={`/companyProfile?email=${this.state.email}`} className="item">Profile</Link>
                            <Link to="/jobPost" className="item" >Post New Job</Link>
                            <Link to="/eventPost" className="item" >Post New Event</Link>
                            <Link to="/companyLogin" className="item" onClick={this.handleLogout}>Logout</Link>
                        </div>
                    </div>
                </div>
             </div>

            )

            // let CompanyLogin = (       
            //     <div className="ui blue inverted menu" style={{padding:"10px"}}>
            //         <Link to="/companyPostedJobCard" className="item"> Posted Job </Link>                
            //         <Link to="/companyPostedEventCard" className="item">Event Posted </Link>
            //         <Link to="/jobAppliedStudent" className="item">Job Applied</Link>
            //         <Link to="/eventAppliedStudent" className="item">Event Registered</Link>

            //         <div className="right menu">
            //             <div className="ui simple dropdown item">
            //                     {this.state.email}
            //                     <i className="dropdown icon"></i>
            //                     <div className=" menu">
            //                         <Link to={`/companyProfile?email=${this.state.email}`} className="item">Profile</Link>
            //                         <Link to="/jobPost" className="item" >Post Job</Link>
            //                         <Link to="/eventPost" className="item" >Post Event</Link>
            //                         <Link to="/companyLogin" className="item" onClick={this.handleLogout}>Logout</Link>
            //                     </div>
            //             </div>
            //         </div>
            //  </div>
            // )

       const {isLogin, access} = this.state;    
        
       if(isLogin){
            if(access === "student"){
                return(
                    <div style={{background:"white", borderBottom:"2px solid rgb(220, 220, 220)"}}>
                        {StudentLogin}
                    </div>
                )
            }else{
                return(
                    <div style={{background:"white", borderBottom:"2px solid rgb(220, 220, 220)"}}>
                        {newCompanyLogin}
                    </div>
                )
            }
       }else{
           return(
               <div>
                   {loginHome}
               </div>
           )
       }
    }
}

Header.propTypes = {
    logout: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
    isLogin: PropTypes.bool.isRequired,
    fetchDashboard: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isLogin: state.Handshake_User_Info.isLogin,
    jobDetails: state.Handshake_User_Info.jobDetails

})

export default connect(mapStateToProps, {logout, search, fetchDashboard})(withRouter(Header));