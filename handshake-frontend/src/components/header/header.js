import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLogin : true
        }
        this.handleLogout = this.handleLogout.bind(this);
    };

    componentDidUpdate(){
    }

    componentDidMount(){
        const accessString = localStorage.getItem('JWT');
        console.log("accessString: ",accessString);
        if(accessString === null) {
            this.setState({
                isLogin: false
            })
        }
    }

    handleLogout = (e)=>{
        e.preventDefault();
        localStorage.removeItem('JWT');
        this.setState({
            isLogin: false
        })
    }

    render(){

       const {isLogin} = this.state;    

        if(isLogin === false){
             return(
                 
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
        }else if(isLogin === true){
        return (
            <div class="ui inverted segment" >
                <div class="ui inverted secondary menu">
                <Link to="/companyPostedJob" className="item">
                    Posted Job 
                </Link>
                 <Link to="/eventBoard" className="item">
                        Event Posted
                    </Link>
                    <div class="ui compact menu inverted segment menu">
                        <div class="ui simple dropdown item">
                            Name
                            <i class="dropdown icon"></i>
                            <div class="ui inverted secondary menu">
                            {/* <div class="item" >Profile</div> */}
                            <Link to="/studentProfile" className="item">Profile</Link>
                            <div class="item">Application</div>
                            <Link to="/home" className="item" onClick={this.handleLogout}>Logout</Link>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        )
     }
    }
}