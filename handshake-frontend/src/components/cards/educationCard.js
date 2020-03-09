import React, {Component} from 'react';
import axios from 'axios';

export default class EducationCard extends Component {
    constructor(props){
        super(props);

        this.state = {
            token: "", 
            isLogin: true,
            eduInfo: []

        }
    }
    
    componentDidUpdate(){
    }

    componentDidMount(){
        const accessString = localStorage.getItem('JWT');
        if(accessString === null){
            this.setState({
                isLogin: false
            })
            console.log("token is null!....Please Login Again......");
        }

        this.setState({
            token: accessString
        })

        console.log("summary_card_compdidmnt_accessString: ", accessString);

        axios.get("http://localhost:3001/profileStudent/eduInfo", { 
            headers: {
                Authorization: `JWT ${accessString}`
            }
        } ).then(response => {
                if(response.status === 200){
                    this.setState({
                        eduInfo: response.data
                    })
                    // console.log("studentProfile_responseObj: ", response.data);
                    console.log("eudcationCard_res_info: ", this.state.eduInfo);
                }else{
                    console.log("ERROR");
                }
            })
    }



    render(){

        let data = this.state.eduInfo;

        return(
                    <div className="ui cards">

                    { data.map( edu => 
                        <div className="card" style={{width: "55%", fontSize:"1.5em"}}>
                            <div className="content">
                                <div className="header">Education</div>
                                <div className="description">
                                        <h2>{edu.student_college_name}</h2>
                                </div>
                                <div className ="description">
                                {edu.student_college_degree} {edu.student_college_major} 
                                </div>
                                <div className="description">
                                        <h4>{edu.student_college_yop}</h4>
                                </div>
                                <div className="description">
                                       <h4> {edu.student_college_gpa}  </h4>
                                </div>
                            </div>
                            <div class="ui bottom attached large button">
                                <i class="add icon"></i>
                                    Add Education
                            </div>
                        </div>

                        )  }
                    </div>
        );
    }
}


{/* <span style={{color: "blue"}}><p className="card-text">What are you passionate about? What are you looking for on Handshake? What are your experiences or skills?</p></span> */}
