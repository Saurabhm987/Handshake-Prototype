import React, {Component} from 'react';
import axios from 'axios';
import {API_ENDPOINT} from '../controller/endpoint';


export default class InterestCard extends Component {
    constructor(props){
        super(props);

        this.state ={
            resume: "",
            token: "", 
            file:null
        }

        this.instance = axios.create({
            baseURL: API_ENDPOINT,
            timeout: 1000,
          });

        this.changeHandler = this.changeHandler.bind(this);
        this.addSkills = this.addSkills.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
    }



    handleFileUpload = (event) => {
        this.setState({file: event.target.files[0]});
      }


      handleFormSubmit = (event) => {
        if(this.state.file === null){
            alert("please add file");
        }else{

        this.setState ({
            editMode: !this.state.editMode
        })

        event.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.file);

        this.instance.post("/uploadResume", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `JWT ${this.state.token}`
          }
        }).then(response => {
          console.log("file successfully upladed!");
          this.setState({
              isLogin: true
          })
        }).catch(error => {
          console.log("error in interest CArd: ", error);
        });
    }

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

        await this.instance.post("/uploadResume", {
            headers: {
                Authorization: `JWT ${this.state.token}`
            }
        }) .then((res) => {
            if(res.status === 200){
                console.log("response: ", res);
                console.log("added!");
                alert('Resume Uploaded!');
            }
            console.log("cant upload resume!");
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
    }

    render(){
        return(
                    <div className="ui cards">
                        <div className="card" style={{fontSize:"1.4em"}}>
                            <div className="content">
                                <div className="header">Upload Resume</div>
                                <div className="description" style={{marginBottom: "10px"}}>
                                <div class="ui fluid action input" style={{fontSize:"15px"}}>
                                <form style={{overflow:"hidden"}} onSubmit={this.handleFormSubmit}>
                                    <input type="file" name="demo-file" placeholder="add skills" onChange={this.handleFileUpload}/>
                                    <button class="ui button" type='submit' >Upload</button>
                                </form>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
        );
    }
}


