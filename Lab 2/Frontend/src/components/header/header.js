import React, {Component} from 'react';
import { Link , withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout, login} from '../../actions/loginAction';
import PropTypes from 'prop-types';
import {parseToken} from '../auth/parseToken';

class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLogin : false,
            access:"",
            email:"",
            searchText:""
        }
        this.handleLogout = this.handleLogout.bind(this);
    };


    handleChange = (e) =>{
        e.preventDefault()
        this.setState({
            searchText: e.target.value
        })
    }

    handleSearch = () =>{
        console.log("search handling...");
        const accessString = localStorage.getItem('JWT');
        this.props.search(this.state.searchText, accessString);
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
                    email: data.id
                })
        }
    }

   async componentDidMount(){
       console.log("componentDidMount...")
        const accessString = localStorage.getItem('JWT');
        if(accessString === null) {
            this.setState({
                isLogin: false
            })
        }else{
            console.log("executing componentDidMoutn else cond..");
            const data = parseToken(accessString);
            console.log('token_data: ', data);
            await this.setState({
                access: data.access,
                email: data.id,
                isLogin: true
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
        console.log("rendering....");
        console.log("header-isLogin", this.state.isLogin);
        console.log("header-access: ", this.state.access);
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

                    <div className="right menu">
                        <Link to="/jobBoard" className="item">Jobs </Link>
                        <Link to="/eventBoard" className="item">Events</Link>
                        <Link to="/students" className="item">Students</Link>
                        <div className="ui simple dropdown item">
                                {this.state.email}
                                <i className="dropdown icon"></i>
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

            let CompanyLogin = (
                
                <div className="ui blue inverted menu" style={{padding:"10px"}}>
                    <Link to="/companyPostedJobCard" className="item"> Posted Job </Link>                
                    <Link to="/companyPostedEventCard" className="item">Event Posted </Link>
                    <Link to="/jobAppliedStudent" className="item">Job Applied</Link>
                    <Link to="/eventAppliedStudent" className="item">Event Registered</Link>

                    <div className="right menu">
                        <div className="ui simple dropdown item">
                                {this.state.email}
                                <i className="dropdown icon"></i>
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
        
       if(isLogin){
            if(access === "student"){
                return(
                    <div>
                        {StudentLogin}
                    </div>
                )
            }else{
                return(
                    <div>
                        {CompanyLogin}
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
    isLogin: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    isLogin: state.Handshake_User_Info.isLogin
})

export default connect(mapStateToProps, {logout})(withRouter(Header));