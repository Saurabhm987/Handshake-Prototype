import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import {addSkill} from '../../actions/applyActions'
import {fetchSkill} from '../../actions/fetchAction'

class SkillCard extends Component {
    constructor(props){
        super(props);

        this.state ={
            token: "", 
            skills: [],
            skill:""
        }

        this.changeHandler = this.changeHandler.bind(this);
        this.addSkills = this.addSkills.bind(this);
    }

    changeHandler =(e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addSkills = async (e) => {
        e.preventDefault();
        let data = this.state.skill;
        console.log('data', data)
        this.props.addSkill(this.state.token, data)
    }

    componentDidMount(){
        const accessString = localStorage.getItem('JWT');
            if(accessString === null){
                this.setState({
                    isLogin: false
                })
                console.log("token is null!");
            }
            this.setState({
                token: accessString
            })

        // this.props.fetchSkill(accessString)
    }

    render(){

        let skills = this.props.skills
        if(this.props.skills){
            return(
                    <div>
                        <div className='row' style={{margin: "10px 10px 0px 5px"}}>
                            <h3> Skills</h3>
                        </div>
                        <div className="row" style={{margin: "10px 10px 0px 5px"}}>
                            {  skills.map( item => 
                                        <a class="ui label">
                                            {item}
                                            <i class="delete icon"></i>
                                        </a>
                                )
                            }
                        </div>
                        {
                        (this.props.adminView === true)
                            ?<div className="ui action input" style={{margin:"5px"}}>
                                <input type="text" placeholder="Add..."  name="skill" onChange={this.changeHandler}/>
                                        <button class="ui icon button" onClick={this.addSkills}>
                                        <i class="add icon"></i>
                                </button>
                            </div>
                            : null
                        }
                    </div>
            );
        }else{
            console.log('adming view -------------', this.props.adminView)
            if(this.props.adminView){
                return(
                    <div className="ui action input" style={{margin:"5px"}}>
                        <input type="text" placeholder="Add..."  name="skill" onChange={this.changeHandler}/>
                            <button class="ui icon button" onClick={this.addSkills}>
                                <i class="add icon"></i>
                            </button>
                    </div>
                )
            }else{
                return null
            }
        }
    }
}

SkillCard.propTypes = {
    skills: PropTypes.array.isRequired,
    addSkill: PropTypes.func.isRequired,
    fetchSkill: PropTypes.func.isRequired
}

const mapStateToprops = state => ({
    skills : state.Handshake_User_Info.skills
})

export default connect(mapStateToprops, {addSkill, fetchSkill})(SkillCard)
