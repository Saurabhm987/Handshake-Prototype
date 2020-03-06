import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
// import profImage from 'homeProf.jpg';

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
            <div class="ui inverted segment" style={{marginBottom: "5%"}}>
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
                <a href="/jobBoard" class="item">
                        Job Posted
                    </a>
                    <a href="/eventBoard" class="item">
                    Event Posted
                    </a>
                    <a href="/" onClick={this.handleLogout} class="item">
                    Logout
                    </a>
                </div>
        </div>
        )
     }
    }
}