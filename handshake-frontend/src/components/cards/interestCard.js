import React, {Component} from 'react';
import axios from 'axios';

export default class InterestCard extends Component {
    constructor(props){
        super(props);

        this.state ={
            skills: "",
            token: ""
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
        let data = this.state.skills;
        console.log("data: ", data);

        await axios.post("http://localhost:3001/addSkills", {data : data}, {
            headers: {
                Authorization: `JWT ${this.state.token}`
            }
        }) .then((res) => {
                    console.log("response: ", res);
                    console.log("added!");
            }).catch((err) => {
                console.log("error! ", err);
            });
    }

    async componentDidMount(){
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

        await axios.get("http://localhost:3001/getSkills", {
            headers: {
                Authorization: `JWT ${this.state.token}`
            }
        }).then(res =>{ 
            if(res.status === 200){
                console.log("response", res);
                this.setState({
                    skills: res.data
                })
            }else{
                console.log("error!");
            }
        }).catch( err =>{
            console.log("error! ", err);
        })
    }

    render(){

        let data = this.state.skills;

        return(
                    <div className="ui cards">
                        <div className="card" style={{fontSize:"1.4em"}}>
                            <div className="content">
                                <div className="header">Skillset Information</div>
                                <div className="description" style={{marginBottom: "10px"}}>
                                <div class="ui fluid action input" style={{fontSize:"15px"}}>
                                    <input type="text" name="skills" placeholder="add skills" onChange={this.changeHandler}/>
                                    <div class="ui button" onClick={this.addSkills}>Add</div>
                                </div>
                                </div>
                                {/* <div className ="description">
                                { data.map( item =>
                                    <h4><b>{item}</b></h4>
                                 )}
                                </div> */}
                            </div>
                        </div>
                    </div>
        );
    }
}


